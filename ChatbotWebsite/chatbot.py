import json
import os
import random
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from autocorrect import Speller
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import Adam
from keras.models import load_model

nltk.download("punkt")
nltk.download("wordnet")
nltk.download("omw-1.4")
nltk.download('punkt_tab')

lemmatizer = WordNetLemmatizer()

# Load intents
with open("static/data/intents.json") as file:
    intents = json.load(file)

with open("static/data/tests.json") as file:
    tests = json.load(file)

# Check if preprocessed data exists
if os.path.exists("static/data/preprocessed_data.json"):
    print("[INFO] Loading preprocessed data from JSON...")
    with open("static/data/preprocessed_data.json", "r") as f:
        data = json.load(f)
        words = data["words"]
        labels = data["labels"]
        training = np.array(data["training"])
        output = np.array(data["output"])
else:
    print("[INFO] Preprocessed data not found. Creating new data...")

    words = []
    labels = []
    docs_x = []
    docs_y = []

    for intent in intents["intents"]:
        for pattern in intent["patterns"]:
            word_list = nltk.word_tokenize(pattern)
            words.extend(word_list)
            docs_x.append(word_list)
            docs_y.append(intent["tag"])

        if intent["tag"] not in labels:
            labels.append(intent["tag"])

    words = [lemmatizer.lemmatize(w.lower()) for w in words if w.isalnum()]
    words = sorted(list(set(words)))
    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []
        wrds = [lemmatizer.lemmatize(w.lower()) for w in doc if w.isalnum()]

        for w in words:
            bag.append(1 if w in wrds else 0)

        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)

    training = np.array(training)
    output = np.array(output)

    # Save preprocessed data to JSON
    with open("static/data/preprocessed_data.json", "w") as f:
        json.dump({
            "words": words,
            "labels": labels,
            "training": training.tolist(),
            "output": output.tolist()
        }, f)

# Load or create model
if os.path.exists("chatbot-model.h5"):
    model = load_model("chatbot-model.h5")
else:
    print("[INFO] Training new model...")
    model = Sequential()
    model.add(Dense(256, input_shape=(len(training[0]),), activation="relu"))
    model.add(Dropout(0.4))
    model.add(Dense(128, activation="relu"))
    model.add(Dropout(0.4))
    model.add(Dense(64, activation="relu"))
    model.add(Dropout(0.4))
    model.add(Dense(len(output[0]), activation="softmax"))
    adam = Adam(learning_rate=0.001)
    model.compile(loss="categorical_crossentropy", optimizer=adam, metrics=["accuracy"])
    model.fit(training, output, epochs=300, batch_size=10, verbose=1)
    model.save("chatbot-model.h5")
    print("Done training and saved model.")

# Helper functions
def clean_up_message(message):
    message_word_list = nltk.word_tokenize(message)
    message_word_list = [lemmatizer.lemmatize(word.lower()) for word in message_word_list]
    return message_word_list

def bag_of_words(message, words):
    message_word = clean_up_message(message)
    bag = [0] * len(words)
    for w in message_word:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

# Context tracking
context = {}

def predict_class(message, ERROR_THRESHOLD=0.25):
    bow = bag_of_words(message, words)
    res = model.predict(np.array([bow]))[0]
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = [(labels[r[0]], r[1]) for r in results]
    return return_list

def get_response(message, id="000"):
    spell = Speller()
    corrected_message = spell(message)
    results = predict_class(corrected_message)
    if results:
        while results:
            for intent in intents["intents"]:
                if intent["tag"] == results[0][0]:
                    if intent["tag"].lower() == "reiterate":
                        if context:
                            for tg in intents["intents"]:
                                if "context_set" in tg and tg["context_set"] == context[id]:
                                    return random.choice(tg["responses"])
                        else:
                            return random.choice(intent["responses"])
                    if "context_set" in intent and intent["context_set"] != "":
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

        if "depression test" in user_input.lower():
            print(run_test("Depression Test"))
        elif "anxiety test" in user_input.lower():
            print(run_test("Anxiety Test"))
        elif "take a test"|"test" in user_input.lower():
            print("Would you like to take the 'Depression Test' or 'Anxiety Test'?")
        elif "exit"|"quit" in user_input.lower():
            print("Goodbye!")
            break
        else:
            print("I'm here to assist you. You can take a depression or anxiety test.")

if __name__ == "__main__":
    print("Start talking with the chatbot (type 'quit' to stop)!")
    chatbot()