# Suz Frontend

React frontend for the Suz property management system.

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Build

```bash
npm run build
```

## Testing

### Unit/Component Tests (Vitest + React Testing Library)

Run all tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

#### Test Files

- `src/pages/Login.test.jsx` - Tests for login form (success and failure cases)
- `src/components/ProtectedRoute.test.jsx` - Tests for route protection (redirects for unauthenticated and wrong-role users)
- `src/pages/customers/CustomerList.test.jsx` - Tests for customer list/search component (renders results, handles empty state)

### End-to-End Tests (Playwright)

**Note:** E2E tests require a running backend instance at the URL specified in `VITE_API_URL`.

Install Playwright browsers (first time only):
```bash
npx playwright install
```

Run E2E tests:
```bash
npm run test:e2e
```

Run E2E tests in headed mode (with browser window):
```bash
npm run test:e2e:headed
```

View E2E test report:
```bash
npm run test:e2e:report
```

#### E2E Test Coverage

- `e2e/reservation-flow.spec.js` - Complete flow test:
  - Login as sales_employee
  - Add a customer
  - Search for a house
  - Complete a reservation
  - Login with invalid credentials (error handling)

## Linting

```bash
npm run lint
```

## Formatting

```bash
npm run format
```

## Project Structure

```
src/
├── api/           # Axios client and API configuration
├── components/    # Reusable components (LoadingSpinner, ErrorMessage, ConfirmDialog, ProtectedRoute)
├── layouts/       # Layout components (MainLayout)
├── pages/         # Page components
│   ├── customers/ # Customer management
│   ├── homeowners/# Homeowner management
│   ├── houses/    # House management
│   ├── reservations/# Reservation management
│   ├── finance/   # Financial entries and reports
│   ├── Help.jsx   # Help documentation
│   ├── Login.jsx  # Login page
│   └── ...
├── store/         # Zustand state management (authStore)
├── test/          # Test setup files
└── ...
```

## Features

- **Authentication:** JWT-based login with role-based access control
- **Role-Based Access:** Different permissions for sales_employee, rental_employee, manager, secretary
- **Customer Management:** Add, view, edit, and delete customers
- **Homeowner Management:** Add, view, and delete homeowners
- **House Management:** Add, view, edit, and delete houses with filters
- **Reservations:** Search and reserve houses, view reservation history
- **Finance:** Add financial entries (secretary), view reports (manager)
- **Responsive Design:** Works on desktop and tablet screens

## Tech Stack

- React 18
- Vite
- React Router DOM
- Axios
- React Query (TanStack Query)
- Zustand
- Vitest
- React Testing Library
- Playwright
- ESLint
- Prettier
