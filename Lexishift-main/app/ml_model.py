import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def load_user_data():
    data = pd.read_csv('user_feedback.csv')
    return data

def train_model():
    data = load_user_data()
   
    # Separate features and labels
    X = data[['font_name', 'font_size', 'line_spacing', 'letter_spacing', 'text_color']]
    y = data['feedback']
   
    # Create a preprocessing pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', ['font_size', 'line_spacing', 'letter_spacing']),
            ('cat', OneHotEncoder(handle_unknown='ignore'), ['font_name', 'text_color'])
        ])
   
    # Create a pipeline with preprocessing and KMeans
    model = Pipeline([
        ('preprocessor', preprocessor),
        ('kmeans', KMeans(n_clusters=2))  # Adjust as needed
    ])
   
    model.fit(X)
    return model

def predict_formatting(user_preferences, model):
    prediction = model.predict(user_preferences)
    if prediction[0] == 1:
        return {
            'font_name': 'OpenDyslexic',
            'font_size': 14,
            'line_spacing': 16,
            'letter_spacing': 0.2,
            'text_color': '#000000'
        }
    else:
        return {}  # Return empty dict to use user's original preferences
