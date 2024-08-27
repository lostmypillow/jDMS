import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib
import argparse
import os
import json
dir_path = os.path.dirname(os.path.realpath(__file__))
pk_dir_path = dir_path + '/news_categorizer.pkl'



# Train the model
def train_model():
    
    with open('/home/johnny/Documents/GitHub/jDMS/server/routes/data.json', 'r') as file:
        data = json.load(file)
    df = pd.DataFrame(data)
    X = df['headline']
    y = df['category']
    model = make_pipeline(TfidfVectorizer(), MultinomialNB())
    model.fit(X, y)
    joblib.dump(model, pk_dir_path)
    print(f"Model trained with {len(data)} samples and saved as 'news_categorizer.pkl'.")

# Load or initialize the model
def load_model():
    try:
        return joblib.load(pk_dir_path)
    except FileNotFoundError:
        print("Model not found. Please train the model first.")
        return None

# Command line argument parsing
parser = argparse.ArgumentParser(description='News Categorization Script')

parser.add_argument('--categorize', '-c', type=str, help='headline to categorize')
parser.add_argument('-t', action='store_true',  help='Train pr not')

args = parser.parse_args()

# Categorize or train
if args.t:
    train_model()
elif args.categorize:
    model = load_model()
    if model:
        # Predict category and get probability
        predicted_category = model.predict([args.categorize])[0]
        predicted_proba = model.predict_proba([args.categorize])[0]
        max_proba = max(predicted_proba)
        category_index = model.classes_.tolist().index(predicted_category)
        
        # Confidence threshold
        confidence_threshold = 0.2

        if max_proba < confidence_threshold:
            print(f"Headline: {args.categorize}")
            print(f"Predicted Category: Not confident in prediction")
            print(f"Probability: {max_proba:.2f} (below confidence threshold of {confidence_threshold})")
        else:
            print(f"Headline: {args.categorize}")
            print(f"Predicted Category: {predicted_category}")
            print(f"Probability: {max_proba:.2f}")
    else:
        print("Please train the model first.")

else:
    print("Invalid command. Use --get-cat to categorize or --train and --cat to train the model.")

print(pk_dir_path)
