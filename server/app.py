from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = Flask(__name__)

# Load your model
MODEL_PATH = "./fine-tuned-model"
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model     = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH)

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    # Tokenize & generate
    inputs = tokenizer(user_msg, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=128)
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"response": reply})

if __name__ == "__main__":
    app.run(debug=True)
