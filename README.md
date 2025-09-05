# 🤖 Cognita - AI Assistant

A modern, full-stack AI chat application built with React and Flask, powered by the Qwen2-0.5B language model.

![Cognita Logo](frontend/cognita-frontend/src/assets/logo_2.png)

## Features

- **Intelligent Conversations**: Powered by Qwen2-0.5B Instruct model
- **Modern UI**: Beautiful, responsive design with smooth animations with inspiration from ChatGPT and Grok
- **Real-time Chat**: Instant AI responses
- **Mobile-First**: Optimized for all device sizes
- **Fast & Lightweight**: Efficient model inference with CPU optimization
- **Production Ready**: Deployed on Hugging Face Spaces + Vercel

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://cognita-three.vercel.app/)
- **Backend API**: [Deployed on Hugging Face Spaces](https://richmond050-cognita.hf.space)

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend│────│  Flask Backend   │────│  Qwen2-0.5B     │
│   (Vercel)      │    │  (HF Spaces)     │    │  Language Model │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations

### Backend
- **Flask** - Lightweight Python web framework
- **Transformers** - Hugging Face ML library
- **PyTorch** - Deep learning framework
- **Qwen2-0.5B-Instruct** - Large language model

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Python 3.12+
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cognita.git
   cd cognita
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the backend**
   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend/cognita-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   echo "VITE_API_URL=http://localhost:5000" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🚀 Deployment

### Backend (Hugging Face Spaces)

1. **Create a new Space** on [Hugging Face Spaces](https://huggingface.co/spaces)
2. **Upload backend files** to the Space
3. **Configure Docker** with the provided Dockerfile
4. **Deploy** - Your API will be available at `https://your-username-cognita.hf.space`

### Frontend (Vercel)

1. **Push code to GitHub**
2. **Connect repository** to [Vercel](https://vercel.com)
3. **Add environment variable**:
   - `VITE_API_URL` = `https://your-username-cognita.hf.space`
4. **Deploy** - Your app will be live!

## 📡 API Endpoints

### POST `/api/chat`

Send a message to the AI assistant.

**Request:**
```json
{
  "message": "Hello, how are you?"
}
```

**Response:**
```json
{
  "response": "Hello! I'm doing well, thank you for asking. How can I help you today?"
}
```

## ⚙️ Configuration

### Environment Variables

**Frontend (.env):**
```
VITE_API_URL=https://your-backend-url.hf.space
```

**Backend:**
- `PORT` - Server port (default: 5000)
- `MODEL_NAME` - Hugging Face model name (default: Qwen/Qwen2-0.5B-Instruct)

## 🎨 Customization

### Changing the AI Model

Edit `backend/app.py`:
```python
MODEL_NAME = "your-preferred-model"  # e.g., "microsoft/DialoGPT-medium"
```

### Styling

The frontend uses Tailwind CSS. Customize styles in:
- `frontend/cognita-frontend/src/App.css`
- `frontend/cognita-frontend/src/index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co) for the Transformers library and model hosting
- [Qwen Team](https://github.com/QwenLM/Qwen) for the Qwen2 language model
- [Vercel](https://vercel.com) for frontend hosting
- [Tailwind CSS](https://tailwindcss.com) for the styling framework


---
