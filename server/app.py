from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/message', methods=['POST'])
def handle_message():
    data = request.get_json()
    user_message = data.get('message', '').lower()

    # Enhanced responses with more animations
    responses = [
        {
            "reply": "Pi (π) is the ratio of a circle's circumference to its diameter. It's approximately 3.14159 and appears in many mathematical formulas.",
            "katex": "\\pi = \\frac{C}{d} \\approx 3.14159",
            "animation": {
                "type": "draw_circle",
                "params": {
                    "radius": 80,
                    "strokeColor": "#00FFFF",
                    "strokeWidth": 4
                }
            }
        },
        {
            "reply": "The Pythagorean theorem states that in a right triangle: a² + b² = c² where c is the hypotenuse.",
            "katex": "a^2 + b^2 = c^2",
            "animation": {
                "type": "draw_triangle",
                "params": {
                    "strokeColor": "#FF00FF",
                    "strokeWidth": 3
                }
            }
        },
        {
            "reply": "Euler's identity combines five fundamental mathematical constants: e^{iπ} + 1 = 0",
            "katex": "e^{i\\pi} + 1 = 0",
            "animation": {
                "type": "draw_circle",
                "params": {
                    "radius": 70,
                    "strokeColor": "#FF5500",
                    "strokeWidth": 5
                }
            }
        }
    ]

    if any(keyword in user_message for keyword in ['math', 'pi', 'circle', 'triangle', 'pythagoras', 'euler']):
        return jsonify(random.choice(responses))
    
    return jsonify({
        "reply": "I can explain mathematical concepts. Try asking about Pi, triangles, or Euler's identity!",
        "katex": None,
        "animation": None
    })

if __name__ == '__main__':
    app.run(debug=True)