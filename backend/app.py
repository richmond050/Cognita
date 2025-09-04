from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load model and processor (done once on startup)
MODEL_NAME = "Qwen/Qwen2-0.5B-Instruct"
print(f"Loading model {MODEL_NAME}... This may take a minute.")
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype=torch.float32,  # Use float32 for CPU
    device_map="cpu"            # Force CPU usage
)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
print("Model loaded successfully.")

def generate_response(message):
    # Format as chat (Qwen supports this)
    messages = [{"role": "user", "content": message}]
    text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    
    # Tokenize the input
    inputs = tokenizer(text, return_tensors="pt").to(model.device)
    
    # Generate
    with torch.inference_mode():
        output_ids = model.generate(
            **inputs,
            max_new_tokens=512,  # Limit length
            do_sample=False,     # Greedy for consistency (or True for creativity)
            temperature=0.7      # If sampling
        )
    # Decode response, remove prompt
    response = tokenizer.decode(output_ids[0][inputs["input_ids"].shape[1]:], skip_special_tokens=True)
    return response

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        response = generate_response(message)
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Model generation failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)