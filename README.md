# Frontend - Student Career Path Finder

React.js web application for the Student Career Path Finder platform.

## Technology Stack

- **React 18** - UI Framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## Project Structure

```
src/
├── components/
│   └── 3DBackgrounds.js         # Gradient background components
├── pages/
│   ├── LandingPage.js
│   ├── LoginPage.js
│   ├── SignupPage.js
│   ├── ProfileSetup.js
│   ├── Questionnaire.js
│   ├── CareerRecommendations.js
│   ├── CareerDetails.js
│   ├── Dashboard.js
│   └── ProgressTracker.js
├── services/
│   └── api.js                   # API client configuration
├── styles/
│   └── [page-specific CSS files]
├── App.js                       # Main app component with routing
└── index.js                     # React entry point
```

## Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Development server runs on `http://localhost:3000`

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_API_TIMEOUT=30000
```

## API Integration

The frontend connects to the backend REST API at `http://localhost:8080`.

### Key Endpoints

**Authentication**
- `POST /api/students/register` - Register new student
- `POST /api/students/login` - Login student

**Career Data**
- `GET /api/careers` - Get all careers
- `GET /api/careers/{id}` - Get career details
- `GET /api/careers/recommend/{studentId}` - Get recommendations

**Progress & Achievements**
- `GET /api/progress/{studentId}` - Get student progress
- `POST /api/progress` - Update progress
- `GET /api/achievements/{studentId}` - Get achievements

## Authentication Flow

1. User registers or logs in
2. Student ID is stored in localStorage
3. Protected routes require authentication
4. API requests include student ID for personalization

## Styling

Uses a consistent color scheme across all pages:
- **Primary Blue**: #6366f1
- **Secondary Purple**: #8b5cf6
- **Accent Cyan**: #06b6d4

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm start
```

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### API connection issues
- Ensure backend is running on port 8080
- Check `REACT_APP_API_URL` in `.env` file
- Verify CORS is enabled in backend

## Author

Created: December 2025

## License

MIT License
