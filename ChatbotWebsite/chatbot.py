import json
import os
import random
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from autocorrect import Speller
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout, BatchNormalization
from keras.optimizers import Adam
from keras.callbacks import EarlyStopping, ReduceLROnPlateau
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from keras.regularizers import l2
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import Counter
import pickle

nltk.download("punkt")
nltk.download("wordnet")
nltk.download("omw-1.4")
nltk.download('punkt_tab')
nltk.download('stopwords')

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))

# Load intents
with open("static/data/intents.json") as file:
    intents = json.load(file)


# Check if preprocessed data exists
if os.path.exists("static/data/preprocessed_data.json"):
    print("[INFO] Loading preprocessed data from JSON...")
    with open("static/data/preprocessed_data.json", "r", encoding='utf-8') as f:
        data = json.load(f)
        labels = data["labels"]
        X = np.array(data["X"])
        y = np.array(data["y"])
        with open("vectorizer.pkl", "rb") as vfile:
            vectorizer = pickle.load(vfile)
else:
    print("[INFO] Preprocessed data not found. Creating new data...")

    labels = []
    docs_x = []
    docs_y = []
    MIN_PATTERNS = 30

    for intent in intents["intents"]:
        current_patterns = intent["patterns"]
        count = len(current_patterns)
        if count < MIN_PATTERNS:
            current_patterns *= (MIN_PATTERNS // count + 1)
            current_patterns = current_patterns[:MIN_PATTERNS]

        for pattern in current_patterns:
            word_list = nltk.word_tokenize(pattern)
            docs_x.append(word_list)
            docs_y.append(intent["tag"])

        if intent["tag"] not in labels:
            labels.append(intent["tag"])

    texts = [" ".join([lemmatizer.lemmatize(w.lower()) for w in doc if w.isalnum() and w.lower() not in stop_words]) for doc in docs_x]
    vectorizer = TfidfVectorizer(max_features=3000, ngram_range=(1, 2), sublinear_tf=True, stop_words='english')
    X = vectorizer.fit_transform(texts).toarray()

    label_index = {label: idx for idx, label in enumerate(labels)}
    y = np.array([label_index[label] for label in docs_y])

    with open("static/data/preprocessed_data.json", "w", encoding='utf-8') as f:
        json.dump({
            "labels": labels,
            "X": X.tolist(),
            "y": y.tolist()
        }, f)

    with open("vectorizer.pkl", "wb") as vfile:
        pickle.dump(vectorizer, vfile)
        
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Load or create model
if os.path.exists("chatbot-model.h5"):
    model = load_model("chatbot-model.h5")
else:
    print("[INFO] Training new model...")
    model = Sequential()
    model.add(Dense(512, input_shape=(X.shape[1],), activation="relu", kernel_regularizer=l2(0.01)))
    model.add(BatchNormalization())
    model.add(Dropout(0.4))
    model.add(Dense(256, activation="relu"))
    model.add(Dropout(0.2))
    model.add(Dense(len(labels), activation="softmax"))

    model.compile(loss="sparse_categorical_crossentropy", optimizer=Adam(learning_rate=0.001), metrics=["accuracy"])
    early_stopping = EarlyStopping(monitor="val_loss", patience=30, restore_best_weights=True)
    lr_reducer = ReduceLROnPlateau(monitor="val_loss", factor=0.5, patience=10, min_lr=1e-6)

    model.fit(X_train, y_train, epochs=500, batch_size=8, validation_data=(X_test, y_test),
              callbacks=[early_stopping, lr_reducer], verbose=1)
    model.save("chatbot-model.h5")
    print("Done training and saved model.")
loss, accuracy = model.evaluate(X_test, y_test)
print(f"\n✅ Model Test Accuracy: {accuracy * 100:.2f}%")
# Evaluate
y_pred = model.predict(X_test)
y_pred_labels = np.argmax(y_pred, axis=1)

spell = Speller()
context = {}
# Helper functions
def clean_up_message(message):
    return [lemmatizer.lemmatize(w.lower()) for w in nltk.word_tokenize(message) if w.isalnum() and w.lower() not in stop_words]

def bag_of_words(message):
    message_text = " ".join(clean_up_message(message))
    return vectorizer.transform([message_text]).toarray()[0]

def predict_class(message, ERROR_THRESHOLD=0.25):
    bow = bag_of_words(message)
    res = model.predict(np.array([bow]))[0]
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return [(labels[r[0]], r[1]) for r in results]

def get_response(message, id="000"):
    corrected_message = spell(message)
    results = predict_class(corrected_message)
    if results:
        while results:
            for intent in intents["intents"]:
                if intent["tag"] == results[0][0]:
                    if intent["tag"].lower() == "reiterate" and context.get(id):
                        for tg in intents["intents"]:
                            if "context_set" in tg and tg["context_set"] == context[id]:
                                return random.choice(tg["responses"])
                    if "context_set" in intent:
                        context[id] = intent["context_set"]
                    return random.choice(intent["responses"])
            results.pop(0)
    return ("I apologize if my response wasn't what you were looking for. "
            "As an AI language model, my knowledge is limited by the data I was trained on. "
            "Please let me know if there's anything else I can help you with.")
    
def get_questions(title):
    for test in tests["tests"]:
        if test["title"] == title:
            return test["questions"]
    return "Test not found"

# Get test score message based on title and score
def get_test_messages(title, score):
    score = int(score)
    message = ""
    if title.lower() == "depression test":  # depression test
        if score > 20:
            message = "Depression Test: Severe Depression"
        elif score > 15:
            message = "Depression Test: Moderately Severe Depression"
        elif score > 10:
            message = "Depression Test: Moderate Depression"
        elif score > 5:
            message = "Depression Test: Mild Depression"
        else:
            message = "Depression Test: No Depression"
        message += (
            " - Score: "
            + str(score)
            + "/27 (Your responses indicate that you may be at risk of harming yourself. If you need immediate help, you can reach the mental health service by clicking the SOS button on top right!)"
        )
    elif title.lower() == "anxiety test":  # anxiety test
        if score > 15:
            message = "Anxiety Test: Severe Anxiety"
        elif score > 10:
            message = "Anxiety Test: Moderate Anxiety"
        elif score > 5:
            message = "Anxiety Test: Mild Anxiety"
        else:
            message = "Anxiety Test: No Anxiety"
        message += " - Score: " + str(score) + "/21"
    else:
        message = "Test Title not found"
    message += ". These results are not meant to be a diagnosis. You can meet with a doctor or therapist to get a diagnosis and/or access therapy or medications. Sharing these results with someone you trust can be a great place to start."
    return message

def get_user_response(question, options):
    print(question)
    for idx, option in enumerate(options):
        print(f"{idx+1}. {option['text']}")
    user_input = int(input("Choose the option (1-4): "))
    return options[user_input - 1]['points']

# Function to run the depression or anxiety test
def run_test(test_title):
    questions = get_questions(test_title)
    if questions == "Test not found":
        return "Test not found."

    score = 0
    for question in questions:
        score += get_user_response(question["question"], question["options"])

    return get_test_messages(test_title, score)

def chatbot():
    while True:
        user_input = input("How can I assist you today? ")

        
        if "exit"|"quit" in user_input.lower():
            print("Goodbye!")
            break
        else:
            print("I'm here to assist you. You can take a depression or anxiety test.")

if __name__ == "__main__":
    print("Start talking with the chatbot (type 'quit' to stop)!")
    chatbot()