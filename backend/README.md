# Multilingual FAQ Management System

A robust FAQ management system built with Node.js and Express, featuring multilingual support, WYSIWYG editing, and efficient caching mechanisms.

## 🚀 Features

- Multilingual FAQ management with automatic translation
- WYSIWYG editor integration for rich text content
- Redis-based caching for optimal performance
- RESTful API with language selection support
- Admin panel for content management
- Docker support for easy deployment
- AWS Translate integration for automatic translations

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Caching**: Redis
- **Translation**: AWS Translate
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Redis (v6 or higher)
- AWS Account with Translate API access
- Docker 

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```plaintext
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/faq_system

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379

# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=region


## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/HIMANSHU00KUMAR/Multilang_FAQ_system.git
cd Multilang_FAQ_system
```

2. Install dependencies:
```bash
npm install
```

3. Start Redis server:
```bash
redis-server
```

4. Run the application:
```bash

# Production
npm start
```

## 🐳 Docker Setup

1. Build the image:
```bash
docker-compose build
```

2. Run the containers:
```bash
docker-compose up
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/faqs
```

### Endpoints

#### FAQ Management

```plaintext
GET    http://localhost:3000/api/faqs/            - List all FAQs
GET    http://localhost:3000/api/faqs?lang=hi       - Get specific language FAQ
POST   http://localhost:3000/api/faqs/             - Create new FAQ

```

#### Language Support

- Add `?lang=` query parameter to specify response language
- Supported languages: en (English), hi (Hindi),bn (Bengali), etc.
- Example: `/api/faqs?lang=es`

### Request Examples

#### Create FAQ
```bash
POST /api/faqs/
Content-Type: application/json

{
  "question": "How do I reset my password?",
  "answer": "Follow the instructions sent to your email",
}
```

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## 📁 Project Structure

```plaintext
.
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── cache.js          # Cache
│   └── translator.js     # Translator
└── app.js            # Main application file
├── tests/               # Test files
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'feat: Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request


## 🆘 Support

For support, email himanshugupta25128@gmail.com or open an issue in the repository.