# Creative Asset Automation Platform

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?logoon-3.13io/badge/TopCoder for automating creative asset adaptation across multiple platforms using AI*

</div>

***

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

***

## 🎯 Overview

The Creative Asset Automation Platform is a comprehensive solution that streamlines the process of adapting creative assets for different social media platforms and formats. Built for the TopCoder Challenge, this application demonstrates modern full-stack development practices with React.js frontend and Flask backend.

### Problem Solved
Marketing teams spend significant time manually adapting creative assets to different channels (Instagram, LinkedIn, YouTube) and formats (Story, Feed, Carousel). This platform automates the entire workflow from upload to download.

***

## ✨ Features

- 🔐 **Authentication & Authorization** - Role-based access control (Admin/User)
- 📤 **Asset Upload** - Drag & drop interface with validation (PNG/JPEG, 50MB limit)
- ✏️ **Manual Editing** - Canvas-based editor with text overlay and logo placement
- 🤖 **AI Integration** - Multiple AI provider selection (OpenAI, Midjourney, Stable Diffusion)
- 📱 **Multi-Platform Support** - Instagram, LinkedIn, YouTube format adaptation
- ⚡ **Batch Processing** - Generate multiple variants simultaneously
- 📊 **Progress Tracking** - Real-time job monitoring with status updates
- 💾 **Download Management** - Individual and bulk ZIP downloads
- 👨‍💼 **Admin Panel** - System management and AI provider configuration

***

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Component-based UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Lucide React** - Modern icon library
- **React Dropzone** - File upload interface
- **Fabric.js** - Canvas manipulation
- **React Toastify** - Notifications

### Backend
- **Flask 2.3.3** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Python 3.13** - Server-side logic

### Development
- **Create React App** - React development environment
- **ESLint & Prettier** - Code formatting and linting
- **Git** - Version control

***

## 🚀 Installation

### Prerequisites
- **Node.js** >= 16.0.0
- **Python** >= 3.8
- **npm** or **yarn**
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/Samy-rgb/topcoder.git
cd topcoder
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend will start on `http://localhost:8000`

### 3. Frontend Setup
```bash
# Return to root directory
cd ..

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
echo "REACT_APP_ENVIRONMENT=development" >> .env

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

***

## 📖 Usage

### Test Credentials
| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| Admin | `admin` | `admin123` | Full system access |
| User | `user` | `user123` | Standard user features |

### Basic Workflow
1. **Login** - Use test credentials to access the system
2. **Upload Assets** - Drag and drop high-resolution images
3. **Select Formats** - Choose target platforms and formats
4. **Edit Manually** (Optional) - Add text overlays or logos
5. **Choose AI Provider** - Select from available AI services
6. **Generate Variants** - Start batch processing
7. **Monitor Progress** - Track generation in real-time
8. **Download Results** - Get individual files or bulk ZIP

***

## 📚 API Documentation

### Authentication
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Asset Management
```http
POST /api/assets/upload
Content-Type: multipart/form-data

# Upload file with metadata
```

### AI Generation
```http
GET /api/generation/providers
# Returns available AI providers

POST /api/generation/generate
Content-Type: application/json

{
  "assetIds": ["asset-id-1"],
  "formatIds": ["format-id-1"],
  "providerId": "openai"
}
```

***

## 📁 Project Structure

```
topcoder/
├── 📄 README.md
├── 📄 .env
├── 📄 .gitignore
├── 📄 package.json
├── 📁 public/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 auth/
│   │   ├── 📁 common/
│   │   ├── 📁 upload/
│   │   ├── 📁 editor/
│   │   ├── 📁 generation/
│   │   └── 📁 download/
│   ├── 📁 pages/
│   │   ├── 📄 Login.js
│   │   ├── 📄 Dashboard.js
│   │   ├── 📄 AdminDashboard.js
│   │   ├── 📄 Upload.js
│   │   ├── 📄 Generation.js
│   │   └── 📄 Downloads.js
│   ├── 📁 services/
│   │   ├── 📄 api.js
│   │   ├── 📄 auth.js
│   │   └── 📄 generation.js
│   └── 📁 styles/
└── 📁 backend/
    ├── 📄 app.py
    ├── 📄 requirements.txt
    └── 📄 README.md
```

***

## 🖼️ Screenshots

### User Dashboard
![Dashboard Interface showing asset management and generation options]

### AI Provider Selection
![Dropdown interface for selecting AI providers before generation]

### Admin Panel
![System management interface for administrators]

***

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the build/ directory
```

### Backend Deployment (Heroku/Railway)
```bash
# Create Procfile
echo "web: python app.py" > Procfile

# Deploy with requirements.txt
```

### Environment Variables
```bash
# Production environment
REACT_APP_API_URL=https://your-backend-url/api
REACT_APP_ENVIRONMENT=production
```

***

## 🏆 TopCoder Challenge Compliance

### ✅ Requirements Checklist
- [x] React.js frontend for user panel
- [x] User authentication with role-based routing
- [x] High-resolution asset upload with validation
- [x] Platform and format selection interface
- [x] Manual editing capabilities with metadata saving
- [x] **AI Provider dropdown before "Generate With AI" button**
- [x] Batch asset generation workflow
- [x] Individual and bulk download functionality
- [x] Real-time job progress tracking
- [x] Complete backend API integration
- [x] Admin panel for system management

### 🎨 Marvel Prototype Compliance
- [x] All specified UI screens implemented
- [x] User workflow matches design specifications
- [x] AI Provider selector positioned as required
- [x] Complete user journey from upload to download

***

## 🤝 Contributing

This project was created for the TopCoder Creative Asset Automation Challenge. 

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing code formatting
- Use meaningful commit messages
- Add comments for complex logic
- Test changes before submitting

***

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**
```bash
# Ensure Flask-CORS is installed
pip install flask-cors
```

**Port Conflicts**
```bash
# Change backend port
python app.py --port 8001

# Update .env file
REACT_APP_API_URL=http://localhost:8001/api
```

**Missing Dependencies**
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

***

## 📞 Support

For questions or issues:
- 📧 Create an issue in this repository
- 📖 Check the documentation
- 🔍 Review existing issues

***

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

***

## 👨‍💻 Author

**Samy-rgb**
- GitHub: [@Samy-rgb](https://github.com/Samy-rgb)
- Repository: [topcoder](https://github.com/Samy-rgb/topcoder)

***

## 🎯 Project Status

![Status](https://img.shields.io/io/badge/TopCoderopCoder evaluation.**

***

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>Built with ❤️ for TopCoder Creative Asset Automation Challenge</p>
</div>
