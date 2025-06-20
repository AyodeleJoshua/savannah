# Savannah Tech Assessment

A full-stack application with React frontend and Express backend in a monorepo structure.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Install Dependencies
```bash
npm run install:all
```

### Development
```bash
# Start both frontend and backend concurrently
npm run dev

# Start only frontend
npm run dev:client

# Start only backend
npm run dev:server
```

### Production Build
```bash
# Build both packages
npm run build

# Build specific package
npm run build:client
npm run build:server
```

### Start Production Server
```bash
npm run start:server
```

## 📁 Packages

### Client (`client/`)
- React 19 with TypeScript
- Vite for fast development
- React Router for navigation
- Tailwind CSS for styling
- Runs on port 3000

### Server (`server/`)
- Express.js with TypeScript
- JSON Server for mock data
- JWT authentication
- CORS enabled
- Runs on port 3001

## 🔧 Available Scripts

### Root Level Commands
```bash
npm run dev                    # Start both frontend and backend
npm run dev:client            # Start only frontend
npm run dev:server            # Start only backend
npm run build                 # Build both packages
npm run build:client          # Build frontend only
npm run build:server          # Build backend only
npm run start:server          # Start production server
npm run lint                  # Lint all packages
npm run test                  # Run tests for all packages
npm run clean                 # Clean build artifacts
npm run install:all           # Install dependencies for all packages
```

### Client-Specific Commands
```bash
npm run dev                              # Start frontend development server
npm run build --workspace=client         # Build frontend
npm run preview --workspace=client       # Preview production build
npm run test:client                      # Run frontend tests
npm run test:client:watch                # Run tests in watch mode
npm run test:client:coverage             # Run tests with coverage
```

## 🌐 Application URLs

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🔌 API Endpoints

### Authentication
```typescript
POST /login
Body: { username: string, password: string }
Response: { token: string }
```

### Recommendations
```typescript
GET /recommendations
Headers: { Authorization: 'Bearer <token>' } // Optional
Query Parameters:
  cursor?: string        // Pagination cursor
  limit?: number        // Items per page (default: 100)
  search?: string       // Search term
  tags?: string        // Comma-separated tags

Response: {
  data: Recommendation[];
  pagination: {
    cursor: { next: string | null };
    totalItems: number;
  };
  availableTags: {
    frameworks: string[];
    reasons: string[];
    providers: string[];
    classes: string[];
  };
}
```

### Archived Recommendations
```typescript
GET /recommendations/archive
// Same parameters and response format as /recommendations
```

### Archive/Unarchive Actions
```typescript
POST /recommendations/{id}/archive
POST /recommendations/{id}/unarchive
Headers: { Authorization: 'Bearer <token>' } // Optional
Response: { success: boolean }
```

## 📝 Features

### Core Functionality
- **Infinite Scrolling**: Efficiently load large datasets with cursor-based pagination
- **Advanced Search**: Debounced search across title, description, reasons, and frameworks
- **Multi-Filter System**: Filter by frameworks, cloud providers, risk classes, and reasons
- **Real-time Updates**: Instant feedback for archive/unarchive actions
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route guards for authenticated users
- **Session Management**: Persistent authentication state
- **CORS Support**: Cross-origin request handling

### User Experience
- **Toast Notifications**: Success/error feedback with React Hot Toast
- **Loading States**: Loading indicators for loading state
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Keyboard Navigation**: Full keyboard accessibility

### Performance Optimizations
- **Code Splitting**: Lazy-loaded components and routes
- **React Query**: Intelligent caching and background updates
- **Memoization**: Optimized re-renders with React.memo
- **Bundle Optimization**: Vite-based fast builds

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Component and utility function testing
- **End-to-End Tests**: Full application testing with Cypress

### Running Tests
```bash
# Run all tests
npm run test

# Run frontend tests
npm run test:client

# Run backend tests
npm run test --workspace=server

# Run tests with coverage
npm run test:client:coverage
npm run test:coverage --workspace=server

# Run tests in watch mode
npm run test:client:watch
npm run test:watch --workspace=server
```

### End-to-End Testing with Cypress

The application includes comprehensive end-to-end tests using Cypress that cover:

- **Authentication Flow**: Login, logout, and session management
- **Dashboard Navigation**: Page routing and access control
- **Archive Functionality**: Archiving and unarchiving recommendations
- **Accessibility**: ARIA labels, keyboard navigation, and focus management
- **Modal Interactions**: Opening, closing, and content verification
- **Error Handling**: Network errors and edge cases

#### Running E2E Tests
To run the end-to-end test, you need to start the server on a seperate terminal.
- In the root folder of the project, run ``cd server``
- ``npm install``
- ``npm run dev``
- On a seperate terminal, go to the root folder of the project and run ``npm run test:e2e:ci``


## 🔧 Configuration

### Environment Variables
1. Copy `.env.example` to `.env` in both client and server directories
2. Configure your environment variables
3. From the root directory, run ``npm run instal:all``
4. Run ``npm run dev``

### TypeScript Configuration
- **Strict Mode**: Enabled for type safety
- **No Implicit Any**: Prevents accidental `any` types
- **Path Mapping**: Configured for clean imports
- **ESLint Integration**: Type-aware linting rules

### Build Configuration
- **Vite**: Fast development and optimized production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **TypeScript**: Compilation with strict type checking

## 🚀 Deployment

### Production Build
```bash
# Build both applications
npm run build

# Start production server
npm run start:server
```

### Development Guidelines
- Follow TypeScript strict mode conventions
- Use functional components with hooks
- Implement proper error handling
- Write unit tests for new features
- Follow the established naming conventions
- Use Tailwind CSS for styling

## 📄 License

This project is private and confidential.

## 🔗 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TanStack Query Documentation](https://tanstack.com/query)
