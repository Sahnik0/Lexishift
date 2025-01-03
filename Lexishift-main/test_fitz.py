import fitz  # PyMuPDF

# Create a new PDF file and add a page to it
def create_pdf():
    doc = fitz.open()  # Create a new PDF in memory
    page = doc.new_page()  # Add a new page
    page.insert_text((72, 72), "Hello, PyMuPDF!", fontsize=24)  # Insert text into the page
    doc.save("test.pdf")  # Save the PDF to a file
    doc.close()
    print("PDF created successfully.")

# Open and read the created PDF file
def read_pdf():
    doc = fitz.open("test.pdf")
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text = page.get_text()
        print(f"Page {page_num + 1} content: {text}")
    doc.close()

if __name__ == "__main__":
    create_pdf()
    read_pdf()
