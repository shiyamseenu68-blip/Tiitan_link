# Contributing to TitanLink

Thank you for your interest in contributing to TitanLink!

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/titanlink.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit: `git commit -m 'Add some feature'`
6. Push: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Code Style

### Backend (Node.js/TypeScript)

- Use TypeScript for all new code
- Follow the existing code structure
- Use async/await for asynchronous operations
- Add JSDoc comments for complex functions
- Run `npm run lint` before committing

### Frontend (React/TypeScript)

- Use functional components with hooks
- Follow the existing component structure
- Use Tailwind CSS for styling
- Add comments for complex logic
- Run `npm run lint` before committing

### Android (Kotlin)

- Follow Kotlin coding conventions
- Use coroutines for asynchronous operations
- Add KDoc comments for public functions
- Run `./gradlew lint` before committing

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Android Tests

```bash
cd android
./gradlew test
```

## Commit Messages

Follow the Conventional Commits specification:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example: `feat: add device pairing with QR code`

## Pull Request Guidelines

1. Describe what your PR does
2. Link to related issues
3. Add screenshots for UI changes
4. Ensure all tests pass
5. Update documentation if needed
6. Request review from maintainers

## Reporting Issues

When reporting issues, please include:

- Description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, browser, Android version)
- Screenshots if applicable

## Security

If you find a security vulnerability, please email security@titanlink.com instead of opening an issue.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
