# Testing Guide

## Backend Testing

### Running Tests

```bash
cd backend
npm test
```

### Running Tests with Coverage

```bash
npm test -- --coverage
```

### Test Structure

```
backend/src/
├── __tests__/
│   ├── controllers/
│   │   ├── auth.test.ts
│   │   └── device.test.ts
│   ├── middleware/
│   │   ├── auth.test.ts
│   │   └── validation.test.ts
│   ├── models/
│   │   ├── User.test.ts
│   │   └── Device.test.ts
│   └── services/
│       └── email.test.ts
```

### Example Test

```typescript
import { describe, it, expect, beforeEach } from '@jest/globals'
import User from '../models/User'

describe('User Model', () => {
  it('should hash password before saving', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    })
    await user.save()
    
    expect(user.password).not.toBe('password123')
  })
})
```

## Frontend Testing

### Running Tests

```bash
cd frontend
npm test
```

### Running Tests with Coverage

```bash
npm test -- --coverage
```

### Test Structure

```
frontend/src/
├── __tests__/
│   ├── components/
│   │   ├── Sidebar.test.tsx
│   │   └── DeviceCard.test.tsx
│   ├── pages/
│   │   ├── LoginPage.test.tsx
│   │   └── DashboardPage.test.tsx
│   ├── contexts/
│   │   ├── AuthContext.test.tsx
│   │   └── ThemeContext.test.tsx
│   └── hooks/
│       ├── useDevices.test.ts
│       └── useNotifications.test.ts
```

### Example Test

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../contexts/ThemeContext'
import Sidebar from '../components/dashboard/Sidebar'

describe('Sidebar', () => {
  it('renders navigation items', () => {
    render(
      <ThemeProvider>
        <Sidebar />
      </ThemeProvider>
    )
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Devices')).toBeInTheDocument()
  })
})
```

## Android Testing

### Running Tests

```bash
cd android
./gradlew test
```

### Running Instrumented Tests

```bash
./gradlew connectedAndroidTest
```

### Test Structure

```
android/app/src/
├── test/
│   └── java/com/titanlink/
│       ├── SocketManagerTest.kt
│       └── DeviceRepositoryTest.kt
└── androidTest/
    └── java/com/titanlink/
        ├── MainActivityTest.kt
        └── ServiceTest.kt
```

### Example Test

```kotlin
import org.junit.Test
import org.junit.Assert.*
import kotlinx.coroutines.test.runTest

class DeviceRepositoryTest {
    @Test
    fun saveAndRetrieveDeviceToken() = runTest {
        val repository = DeviceRepository(context)
        repository.saveDeviceToken("test-token")
        
        val token = repository.getDeviceToken()
        assertEquals("test-token", token)
    }
}
```

## E2E Testing

### Setup

Install Playwright:

```bash
npm install -D @playwright/test
```

### Running E2E Tests

```bash
npx playwright test
```

### Example E2E Test

```typescript
import { test, expect } from '@playwright/test'

test('user can login', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL('http://localhost:3000/')
})
```

## Integration Testing

### API Integration Tests

```typescript
import request from 'supertest'
import app from '../src/index'

describe('API Integration Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })
    
    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
  })
})
```

## Performance Testing

### Load Testing with k6

```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export default function () {
  const res = http.get('http://localhost:5000/api/devices')
  check(res, { 'status was 200': (r) => r.status == 200 })
  sleep(1)
}
```

Run:

```bash
k6 run load-test.js
```

## Continuous Testing

### Pre-commit Hooks

Install husky:

```bash
npm install -D husky lint-staged
npx husky install
```

Add to `.husky/pre-commit`:

```bash
npm run lint
npm test
```

## Test Coverage Goals

- Backend: 80%+
- Frontend: 80%+
- Android: 70%+

## Troubleshooting

### Tests Timing Out

- Increase timeout in jest config: `testTimeout: 10000`
- Check for infinite loops in async code

### Flaky Tests

- Use proper cleanup in `afterEach`
- Avoid relying on timing
- Mock external dependencies

### Memory Leaks in Tests

- Close database connections after tests
- Clear mocks between tests
- Use `--runInBand` for Jest to run tests sequentially
