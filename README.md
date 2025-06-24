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

> **💡 Sidenote**: You can run all server-side tests (both unit tests and e2e tests) at once by running `npm run test:all` from the root directory.

### End-to-End Testing with Cypress

The application includes comprehensive end-to-end tests using Cypress that cover:

#### 🔐 Authentication & Session Management
- **Login Form Display**: Verifies all login form elements are visible
- **Form Validation**: Tests required field validation for empty submissions
- **Invalid Credentials**: Displays error messages for incorrect login attempts
- **Successful Login**: Validates successful authentication and redirect to recommendations
- **Loading States**: Shows loading indicator during authentication process
- **Auto-redirect**: Redirects authenticated users away from login page
- **Keyboard Navigation**: Supports form submission with Enter key
- **Logout Functionality**: Properly logs out users and clears authentication state
- **Session Protection**: Prevents access to protected routes after logout

#### 📊 Dashboard & Navigation
- **Dashboard Access**: Verifies dashboard content is displayed correctly
- **Route Protection**: Ensures dashboard is only accessible when authenticated
- **Logout Flow**: Tests complete logout process and redirect to login
- **Session Persistence**: Validates authentication state management

#### 📋 Recommendations Management
- **Page Rendering**: Verifies recommendations page loads with all UI elements
- **Data Loading**: Tests that recommendation cards are properly displayed
- **Modal Interactions**: 
  - Opens recommendation details modal on card click
  - Closes modal via close button
  - Closes modal by clicking outside overlay
- **Search Functionality**: Tests search input and empty state display
- **Navigation**: Validates archive page navigation

#### 📁 Archive Functionality
- **Archive Page Display**: Verifies archive page loads with proper breadcrumbs
- **Breadcrumb Navigation**: Tests breadcrumb structure and navigation
- **Archived Data**: Confirms archived recommendations are displayed
- **Modal Access**: Tests modal functionality for archived items
- **Empty States**: Validates empty state for no archived recommendations
- **Navigation Flow**: Tests breadcrumb navigation back to main recommendations

#### ♿ Accessibility & UX
- **ARIA Labels**: Verifies proper accessibility attributes on interactive elements
- **Keyboard Navigation**: Tests full keyboard accessibility across the application
- **Focus Management**: Validates proper focus handling, especially in modals
- **Color Contrast**: Ensures visual accessibility standards are met
- **Screen Reader Support**: Tests ARIA roles and labels for assistive technologies

#### 🔄 User Interactions
- **Form Submissions**: Tests both button clicks and keyboard submissions
- **Modal Management**: Comprehensive modal open/close testing
- **State Transitions**: Validates UI state changes during loading and data updates
- **Error Handling**: Tests error states and user feedback
- **Responsive Behavior**: Ensures proper functionality across different screen sizes

#### Running E2E Tests
To run the end-to-end tests, you need to start the server on a separate terminal:
- In the root folder of the project, run `cd server`
- `npm install`
- `npm run dev`
- On a separate terminal, go to the root folder of the project and run `npm run test:e2e`

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

## 🔐 Demo Credentials

For testing the application, use these credentials:

**Username:** `admin`  
**Password:** `password`

These credentials are used in the end-to-end tests and provide access to all application features.
