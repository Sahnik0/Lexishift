import io
import os
import logging
import json
import pdfplumber
from flask import Blueprint, render_template, request, send_file, jsonify, url_for, send_from_directory
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from PIL import Image as PILImage
from reportlab.lib.utils import ImageReader
import pandas as pd
from .ml_model import train_model, predict_formatting

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
main = Blueprint('main', __name__)



with open('data/books.json') as f:
    books = json.load(f)


@main.route('/')
def index():
    return render_template('index.html')

@main.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(main.static_folder, filename)
    
    
@main.route('/contact')
def contact():
    return render_template('contact.html')

@main.route('/privacy')
def privacy():
    return render_template('privacy.html')

@main.route('/terms')
def terms():
    return render_template('terms.html')

@main.route('/learn_more')
def learn_more():
    return render_template('learn_more.html')


@main.route('/api/books')
def get_books():
    search_query = request.args.get('q', '').lower()
    if search_query:
        filtered_books = [book for book in books if search_query in book['title'].lower()]
    else:
        filtered_books = books
    return jsonify(filtered_books)


@main.route('/ai_recommendations', methods=['POST'])
def ai_recommendations():
    form_data = request.form

    # Extract relevant data from form_data
    font_size = int(form_data.get('font_size', 12))
    line_spacing = int(form_data.get('line_spacing', 1))
    font_family = form_data.get('font_family', 'Arial')

    # Simple heuristic for generating recommendations
    recommendations = []

    if font_size < 14:
        recommendations.append("Consider using a larger font size for better readability.")
    if line_spacing < 1.5:
        recommendations.append("Increase the line spacing to at least 1.5 for improved readability.")
    

    if not recommendations:
        recommendations.append("Your document settings are optimal!")

    return jsonify({"recommendations": recommendations})

def convert_text(text):
    return text.upper()

def wrap_text(text, max_width, c, font_name, font_size):
    words = text.split()
    lines = []
    line = []
    line_width = 0
    min_words_per_line = 4  # Minimum words per line constraint
    for word in words:
        word_width = c.stringWidth(word, font_name, font_size)
        if line_width + word_width <= max_width and len(line) < min_words_per_line:
            line.append(word)
            line_width += word_width + c.stringWidth(' ', font_name, font_size)
        else:
            if len(line) < min_words_per_line:
                while len(line) < min_words_per_line and len(words) > 0:
                    line.append(words.pop(0))
            lines.append(' '.join(line))
            line = [word]
            line_width = word_width + c.stringWidth(' ', font_name, font_size)
    if len(line) > 0:
        lines.append(' '.join(line))
    return lines

def check_overlap(x, y, text_width, text_height, images, height):
    for img in images:
        if (x < img['x1'] and x + text_width > img['x0'] and 
            y > height - img['bottom'] and y < height - img['top']):
            return True
    return False

def create_dyslexia_friendly_pdf(input_pdf, font_name='OpenDyslexic', font_size=12, line_spacing=14, letter_spacing=0.1, text_color='black'):
    logger.debug("Starting PDF conversion")
    output = io.BytesIO()
    input_pdf.seek(0)

    pdfmetrics.registerFont(TTFont('OpenDyslexic', os.path.join(os.path.dirname(__file__), 'static', 'OpenDyslexic.ttf')))

    c = canvas.Canvas(output, pagesize=letter)
    width, height = letter
    margin = 50

    with pdfplumber.open(input_pdf) as pdf:
        for page_num, page in enumerate(pdf.pages):
            logger.debug(f"Processing page {page_num}")
            c.setFont(font_name, font_size)
            c.setFillColor(HexColor(text_color))

            images = page.images
            words = page.extract_words()

            for image in images:
                img_bbox = [image['x0'], image['top'], image['x1'], image['bottom']]
                img_bbox[0] = max(img_bbox[0], page.bbox[0])
                img_bbox[1] = max(img_bbox[1], page.bbox[1])
                img_bbox[2] = min(img_bbox[2], page.bbox[2])
                img_bbox[3] = min(img_bbox[3], page.bbox[3])

                img = page.within_bbox(img_bbox).to_image()
                img_data = io.BytesIO()
                img.save(img_data, format='PNG')
                img_data.seek(0)
                pil_img = PILImage.open(img_data)
                c.drawImage(ImageReader(pil_img), img_bbox[0], height - img_bbox[1] - (img_bbox[3] - img_bbox[1]), 
                            img_bbox[2] - img_bbox[0], img_bbox[3] - img_bbox[1])

            line_y = height - margin
            x = margin
            max_width = width - 2 * margin

            for word in words:
                text = convert_text(word['text'])
                wrapped_lines = wrap_text(text, max_width, c, font_name, font_size)

                for line in wrapped_lines:
                    text_width = c.stringWidth(line, font_name, font_size)
                    text_height = font_size

                    while check_overlap(x, line_y, text_width, text_height, images, height):
                        line_y -= line_spacing
                        if line_y < margin:
                            c.showPage()
                            c.setFont(font_name, font_size)
                            c.setFillColor(HexColor(text_color))
                            line_y = height - margin
                            x = margin

                    c.drawString(x, line_y, line, charSpace=letter_spacing)
                    line_y -= line_spacing

                    if line_y < margin:
                        c.showPage()
                        c.setFont(font_name, font_size)
                        c.setFillColor(HexColor(text_color))
                        line_y = height - margin
                        x = margin

            c.showPage()

    c.save()
    output.seek(0)
    logger.debug("PDF conversion completed")
    return output

@main.route('/', methods=['POST'])
def upload():
    if request.method == 'POST':
        pdf_file = request.files['file']
        font_name = request.form.get('font_name', 'OpenDyslexic')
        font_size = int(request.form.get('font_size', 12))
        line_spacing = int(request.form.get('line_spacing', 14))
        letter_spacing = float(request.form.get('letter_spacing', 0.1))
        text_color = request.form.get('text_color', 'black')
        
        model = train_model()
        features = pd.DataFrame([[font_name, font_size, line_spacing, letter_spacing, text_color]], 
                                columns=['font_name', 'font_size', 'line_spacing', 'letter_spacing', 'text_color'])
        suggestion = predict_formatting(features, model)
        
        font_name = suggestion.get('font_name', font_name)
        font_size = suggestion.get('font_size', font_size)
        line_spacing = suggestion.get('line_spacing', line_spacing)
        letter_spacing = suggestion.get('letter_spacing', letter_spacing)
        text_color = suggestion.get('text_color', text_color)
        
        dyslexia_friendly_pdf = create_dyslexia_friendly_pdf(pdf_file, font_name, font_size, line_spacing, letter_spacing, text_color)
        return send_file(dyslexia_friendly_pdf, as_attachment=True, download_name='dyslexia_friendly.pdf', mimetype='application/pdf')

@main.route('/feedback', methods=['POST'])
def feedback():
    feedback_data = request.json
    save_user_feedback(
        feedback_data['feedback'],
        feedback_data['font_name'],
        feedback_data['font_size'],
        feedback_data['line_spacing'],
        feedback_data['letter_spacing'],
        feedback_data['text_color']
    )
    return jsonify({"status": "success"})

@main.route('/suggest_formatting', methods=['POST'])
def suggest_formatting():
    user_prefs = request.json
    model = train_model()
    features = pd.DataFrame([[
        user_prefs['font_name'],
        user_prefs['font_size'],
        user_prefs['line_spacing'],
        user_prefs['letter_spacing'],
        user_prefs['text_color']
    ]], columns=['font_name', 'font_size', 'line_spacing', 'letter_spacing', 'text_color'])
    prediction = predict_formatting(features, model)
    return jsonify({"suggestion": prediction})

def save_user_feedback(feedback, font_name, font_size, line_spacing, letter_spacing, text_color):
    feedback_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'user_feedback.csv')
    with open(feedback_file, 'a') as f:
        f.write(f"{feedback},{font_name},{font_size},{line_spacing},{letter_spacing},{text_color}\n")
