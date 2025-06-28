from flask import Flask, request, jsonify
from chatbot import get_response, get_questions, get_test_messages
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    user_id = data.get("user_id", "000")
    lower_msg = message.lower()

    if "exit" in lower_msg or "quit" in lower_msg:
        return jsonify({"response": "Goodbye! Stay safe."})
    
    # Otherwise, get AI response
    reply = get_response(message, id=user_id)
    return jsonify({"response": reply})

@app.route("/questions/<title>", methods=["GET"])
def questions(title):
    return jsonify(get_questions(title))



if __name__ == "__main__":
    app.run(debug=True, port=5005)
