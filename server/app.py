from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_cpp import Llama

app = Flask(__name__)
CORS(app)

# point to wherever you put your model:
MODEL_PATH = "./models/llama-2-7b-chat.Q4_K_M.gguf"

# load the model (slow on first call)
llm = Llama(model_path=MODEL_PATH)

SYSTEM_PROMPT = """
You are a friendly Math Tutor.  Always respond with JSON exactly in the form:
{
  "reply": "...explanation text...",
  "katex": "...LaTeX string if there is a formula, otherwise null...",
  "animation": { "type":"draw_circle", "params":{...} } or null
}
Do NOT output anything else.
"""

@app.route("/api/message", methods=["POST"])
def chat():
    data = request.get_json()
    user = data.get("message", "")
    full_prompt = f"{SYSTEM_PROMPT}\nUser: {user}\nAssistant:"
    
    # generate
    resp = llm(
      prompt=full_prompt,
      max_tokens=256,
      temperature=0.7,
    )
    text = resp["choices"][0]["text"].strip()

    # parse JSON out of the beginning of the response
    try:
        # sometimes model spills text after JSON—strip it
        import json, re
        match = re.search(r"^\s*(\{.*?\})", text, re.S)
        payload = json.loads(match.group(1)) if match else {}
    except Exception as e:
        print("JSON parse error:", e, "raw:", text)
        payload = {
          "reply": "Sorry, I couldn't format my answer properly.",
          "katex": None,
          "animation": None
        }

    return jsonify(payload)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
