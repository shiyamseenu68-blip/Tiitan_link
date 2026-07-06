# TitanLink

**Tagline:** Control Your Phone Anywhere, Securely.

## Overview

TitanLink is a production-ready Progressive Web App that allows users to securely manage and access THEIR OWN Android devices remotely after explicit pairing and permission approval. The system NEVER bypasses Android security or user consent.

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- TanStack Query
- Socket.IO Client
- PWA with Dark/Light Theme

### Backend
- Node.js
- Express
- MongoDB
- Redis
- Socket.IO
- JWT Authentication
- Firebase Cloud Messaging
- Cloudinary
- Rate Limiting
- Helmet
- Compression
- Validation

### Android App
- Kotlin
- Jetpack Compose
- Foreground Service
- WorkManager
- MediaProjection
- Accessibility Service (with user consent)
- Notification Listener
- Device Admin APIs (where available)

## Features

### Authentication
- Email Login
- Google Login
- OTP Login
- JWT with Refresh Tokens
- Multi Device Login
- Remember Device
- Session Management
- 2FA

### Device Pairing
- Secure pairing code generation
- Explicit user approval on device
- Device information display
- Encrypted WebSocket connection

### Web Dashboard
- Professional sidebar layout
- Dashboard, Devices, Files, Camera, Notifications, SMS, Contacts, Calls, Location, Storage, Settings, AI Assistant, User Profile, Premium, Analytics, Activity Logs

### Device Management
- Live Device Status (Battery, Charging, Temperature, CPU, RAM, Storage)
- Android Version, Model, Manufacturer
- WiFi, Signal, Bluetooth status
- Last Seen, Online Status

### Remote Features
- Ring Phone
- Flashlight
- Clipboard Sync
- Notification Mirror
- Contacts & Call Logs
- SMS (with permissions)
- File Upload/Download/Delete
- Gallery & Storage Explorer
- Camera Capture (with permission)
- Microphone Recording (with permission)
- Screen Sharing (with user consent)
- Push Notifications
- Device Analytics

### Real-time Communication
- Socket.IO for instant updates
- Presence detection
- Auto-reconnect
- Offline queue
- Heartbeat monitoring

### AI Assistant
- Natural language commands
- Examples: "Ring my phone", "Show battery", "Locate my device", "Open downloads", "Find latest screenshots"

### Security
- HTTPS
- AES Encryption
- JWT & Refresh Tokens
- Rate Limiting
- CSRF Protection
- Helmet
- Input Validation
- Sanitize Requests
- Secure Cookies
- Device Trust
- Session Expiry
- Audit Logs
- Permission Checks

## Project Structure

```
titanlink/
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # Configuration files
│   │   ├── types/          # TypeScript types
│   │   └── websocket/      # Socket.IO handlers
│   ├── tests/              # Backend tests
│   └── package.json
├── frontend/               # React PWA
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript types
│   │   ├── contexts/       # React contexts
│   │   ├── assets/         # Static assets
│   │   └── styles/         # Global styles
│   ├── public/             # Public assets
│   └── package.json
├── android/                # Android Kotlin app
│   └── app/
│       └── src/main/
│           ├── java/com/titanlink/
│           │   ├── ui/     # UI components
│           │   ├── services/ # Android services
│           │   ├── network/  # Network layer
│           │   ├── utils/    # Utilities
│           │   └── models/   # Data models
│           └── res/         # Android resources
├── shared/                 # Shared types and utilities
│   └── types/
├── docs/                   # Documentation
├── deployment/             # Deployment configs
│   ├── docker/
│   ├── k8s/
│   └── nginx/
├── scripts/                # Utility scripts
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 6+
- Redis 7+
- Android Studio (for Android app)
- Docker (optional)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure .env with your settings
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Configure .env with your settings
npm run dev
```

### Android Setup
1. Open `android` folder in Android Studio
2. Configure `local.properties` with your SDK path
3. Update `app/build.gradle` with your API keys
4. Build and run on device/emulator

### Docker Setup
```bash
docker-compose up -d
```

## Security Notes

This application is designed to work within Android's security framework:
- All features require explicit user permission
- No bypass of Android security mechanisms
- User must approve each pairing request
- Sensitive features (camera, mic, screen) require explicit consent
- Works on standard, non-rooted Android devices

## License

Proprietary - All rights reserved

## Support

For support, contact support@titanlink.com
