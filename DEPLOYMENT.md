# Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)
- MongoDB and Redis (or use Docker Compose)
- Android Studio (for Android app development)

## Environment Variables

Create a `.env` file in the root directory:

```env
# Backend
MONGODB_URI=mongodb://admin:password@localhost:27017/titanlink?authSource=admin
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-jwt-secret-here
REFRESH_TOKEN_SECRET=your-refresh-secret-here
FRONTEND_URL=http://localhost

# Frontend
VITE_API_URL=http://localhost:5000
VITE_WS_URL=http://localhost:5001

# Firebase (for Android app)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_SERVER_KEY=your-server-key

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@titanlink.com

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Android App

```bash
cd android
./gradlew assembleDebug
```

## Docker Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Individual Services

#### Backend

```bash
cd backend
docker build -t titanlink-backend .
docker run -p 5000:5000 --env-file .env titanlink-backend
```

#### Frontend

```bash
cd frontend
docker build -t titanlink-frontend .
docker run -p 80:80 titanlink-frontend
```

## Production Deployment

### Server Setup

1. Install Docker and Docker Compose on your server
2. Clone the repository
3. Copy `.env.example` to `.env` and fill in production values
4. Run `docker-compose up -d`

### CI/CD

The project includes GitHub Actions workflows for:

- **CI**: Runs tests and linting on every push
- **Deploy**: Builds and pushes Docker images, deploys to server on main branch

To enable:

1. Add secrets to GitHub repository:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `SERVER_HOST`
   - `SERVER_USER`
   - `SSH_PRIVATE_KEY`

2. Push to main branch to trigger deployment

### SSL/HTTPS

For production, use a reverse proxy with SSL:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Monitoring

### Logs

```bash
# View backend logs
docker-compose logs -f backend

# View frontend logs
docker-compose logs -f frontend

# View MongoDB logs
docker-compose logs -f mongodb
```

### Health Checks

- Backend: `http://your-domain.com/api/health`
- Frontend: `http://your-domain.com`

## Scaling

For high-traffic deployments:

1. Use a managed MongoDB service (MongoDB Atlas)
2. Use a managed Redis service (Redis Cloud)
3. Add load balancer for multiple backend instances
4. Use CDN for static assets
5. Enable Redis clustering for WebSocket scaling

## Backup

### MongoDB Backup

```bash
docker exec titanlink-mongodb mongodump --archive=/backup/mongodb-$(date +%Y%m%d).archive
docker cp titanlink-mongodb:/backup/mongodb-$(date +%Y%m%d).archive ./backups/
```

### Restore

```bash
docker cp ./backups/mongodb-YYYYMMDD.archive titanlink-mongodb:/backup/
docker exec titanlink-mongodb mongorestore --archive=/backup/mongodb-YYYYMMDD.archive
```
