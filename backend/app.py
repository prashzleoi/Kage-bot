from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# 🔑 PUT YOUR REAL API KEY HERE
genai.configure(api_key="AIzaSyD4IVupV7eFuUe83NWucJQAKuL91YskXas")

# ✅ USE UPDATED MODEL
model = genai.GenerativeModel("gemini-2.5-flash-lite")

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    try:
        response = model.generate_content(
            f"You are Sora, a friendly AI assistant. Reply clearly and briefly.\nUser: {message}"
        )

        reply = response.text

    except Exception as e:
        # 🔍 SHOW REAL ERROR IN TERMINAL
        print("❌ GEMINI ERROR:", e)
        reply = "Sora AI error. Check backend terminal."

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
