# ResoLink

ResoLink is a robust platform designed to bridge the gap between users and organizations, facilitating efficient issue reporting, tracking, and resolution. Levering the power of AI (Google Gemini), ResoLink helps in categorizing and prioritizing issues to streamline the workflow for organizations.

## Key Features

- **Dual-Role Architecture**: Distinct interfaces and functionalities for **Users** (Citizens/Reporters) and **Organizations** (Service Providers/Authorities).
- **AI-Powered Insights**: Utilizes Google Gemini to automatically analyze reported issues, generating categories, urgency levels, summaries, and sentiment scores.
- **Secure Authentication**: JWT-based authentication and authorization for both users and organizations.
- **Interactive Dashboards**:
  - **User Dashboard**: View reported issues, profile status, and reporting history.
  - **Organisation Dashboard**: Visual statistics, issue management feed, and profile controls.
- **Modern UI/UX**: Built with React, Tailwind CSS, and Shadcn UI (Radix Primitives) for a responsive, accessible, and visually appealing experience.
- **Animations**: Enhanced interactivity with GSAP animations.

## Technology Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), Shadcn UI
- **Animations**: [GSAP](https://gsap.com/)
- **State Management**: React Context / Hooks
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose 9)
- **Authentication**: JSON Web Tokens (JWT), BCryptJS
- **AI Integration**: @google/genai

## Project Structure

The project was built as a monorepo-style structure:

```
ResoLink/
├── backend/            # Express.js API Server
│   ├── controllers/    # Request handlers
│   ├── db/             # Database connection logic
│   ├── middlewares/    # Auth and other middlewares
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Routes
│   ├── utils/          # Helper functions (Gemini AI, etc.)
│   ├── app.js          # App setup
│   └── server.js       # Entry point
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── context/    # Auth Contexts
│   │   ├── layouts/    # Page Layouts
│   │   ├── pages/      # Application Pages (Auth, Landing, User, Org)
│   │   ├── services/   # API calls
│   │   └── Main.jsx    # Entry point
│   ├── index.html
│   └── package.json
│
└── README.md
```

## Installation & Setup

Follow these steps to get the project running locally.

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB installed locally or a MongoDB Atlas connection string.
- Google Gemini API Key.

### 1. Clone the Repository

```bash
git clone https://github.com/shlokarth911/resolink.git
cd ResoLink
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
# Note: The variable name for Mongo URI currently has a typo in the codebase
MONOGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or the port shown in your terminal).

## API Endpoints

### Authentication

- `POST /api/auth/register` - User Registration
- `POST /api/auth/login` - User Login
- `GET /api/auth/logout` - User Logout
- `POST /api/organisation/register` - Organisation Registration
- `POST /api/organisation/login` - Organisation Login

### Issues

- `POST /api/issues` - Create a new issue
- `GET /api/issues` - Get issues (with optional filters)
- `GET /api/issues/org-issues` - Get issues specific to an organization

### User & Organisation

- `GET /api/user/profile` - Get User Profile
- `GET /api/organisation/profile` - Get Organisation Profile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the [ISC License](LICENSE).
