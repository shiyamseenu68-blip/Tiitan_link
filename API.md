# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

### Devices

#### Get User Devices
```http
GET /devices
Authorization: Bearer <token>
```

#### Get Device Details
```http
GET /devices/:deviceId
Authorization: Bearer <token>
```

#### Generate Pairing Code
```http
POST /device/pair/generate
Authorization: Bearer <device-token>
Content-Type: application/json

{
  "deviceName": "Pixel 7 Pro",
  "deviceModel": "Pixel 7 Pro",
  "manufacturer": "Google",
  "androidVersion": "14",
  "apiLevel": 34
}
```

#### Pair Device
```http
POST /device/pair
Authorization: Bearer <token>
Content-Type: application/json

{
  "pairingCode": "ABC123"
}
```

#### Delete Device
```http
DELETE /devices/:deviceId
Authorization: Bearer <token>
```

### Files

#### List Files
```http
GET /files/:deviceId
Authorization: Bearer <token>
```

#### Upload File
```http
POST /files/:deviceId/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
```

#### Download File
```http
GET /files/:deviceId/download/:fileId
Authorization: Bearer <token>
```

#### Delete File
```http
DELETE /files/:deviceId/:fileId
Authorization: Bearer <token>
```

### Notifications

#### Get Notifications
```http
GET /notifications
Authorization: Bearer <token>
```

#### Get Device Notifications
```http
GET /notifications/device/:deviceId
Authorization: Bearer <token>
```

#### Mark as Read
```http
PATCH /notifications/:notificationId/read
Authorization: Bearer <token>
```

#### Mark All as Read
```http
PATCH /notifications/read-all
Authorization: Bearer <token>
```

### AI Assistant

#### Process Command
```http
POST /ai/command
Authorization: Bearer <token>
Content-Type: application/json

{
  "command": "Ring my phone",
  "deviceId": "device-id"
}
```

#### Get Command History
```http
GET /ai/history
Authorization: Bearer <token>
```

### Admin

#### Get All Users
```http
GET /admin/users
Authorization: Bearer <admin-token>
```

#### Get User Details
```http
GET /admin/users/:userId
Authorization: Bearer <admin-token>
```

#### Get All Devices
```http
GET /admin/devices
Authorization: Bearer <admin-token>
```

#### Get Activity Logs
```http
GET /admin/logs?page=1&limit=50
Authorization: Bearer <admin-token>
```

#### Get System Stats
```http
GET /admin/stats
Authorization: Bearer <admin-token>
```

## WebSocket

### Connection

Connect to WebSocket server:

```javascript
const socket = io('http://localhost:5001', {
  auth: {
    token: 'your-jwt-token'
  }
})
```

### Events

#### From Server to Client

- `device_online`: Device came online
- `device_offline`: Device went offline
- `notification`: New notification from device
- `battery_update`: Battery level changed
- `location_update`: Location changed

#### From Client to Server

- `device_command`: Send command to device
- `subscribe_device`: Subscribe to device updates
- `unsubscribe_device`: Unsubscribe from device updates

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `423` - Locked
- `500` - Internal Server Error

## Rate Limiting

- General endpoints: 100 requests per 15 minutes
- Authentication endpoints: 5 requests per 15 minutes
- Pairing endpoints: 10 requests per 15 minutes

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```
