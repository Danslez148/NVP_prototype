# AfriMarket Prototype

An innovative market search and trading platform designed for African commerce. AfriMarket enables users to discover, connect, and conduct business across African markets with an intuitive dashboard interface.

## Features

- **Landing Page** - Initial entry point with authentication
- **Dashboard** - Personalized user dashboard for market overview
- **Market Search** - Advanced search functionality to discover products and services
- **User Authentication** - Secure user login and session management

## Tech Stack

- **Frontend Framework:** React 19.2.4
- **Build Tool:** Vite 8.0.4
- **Code Quality:** ESLint 9.39.4
- **Styling:** CSS (see `src/index.css`)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NVP_prototype
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Server
Start the local development server with hot module replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production
Create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

### Lint Code
Check code quality with ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── App.jsx              # Main application component with routing logic
├── main.jsx             # Application entry point
├── index.css            # Global styles
├── pages/
│   ├── Landing.jsx      # Landing/authentication page
│   ├── Dashboard.jsx    # User dashboard
│   └── MarketSearch.jsx # Market search interface
└── assets/              # Static assets and images
```

## Usage

1. **Start Development Server:** Run `npm run dev`
2. **Access the Application:** Open http://localhost:5173 in your browser
3. **Login:** Use the landing page to authenticate
4. **Explore:** Navigate between the dashboard and market search features

## Development

- ESLint configuration is available in `eslint.config.js`
- Vite configuration is in `vite.config.js`
- Hot Module Replacement (HMR) is enabled for fast development

## License

This is a research and innovation project for CSC4019Z at University of Cape Town.

## Support

For issues or questions, please contact the development team.
