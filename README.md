# FineAnswer Ireland

A full-stack web platform for study-abroad consulting services focused on Ireland. Students can explore programs, track visa/application progress, manage documents, book counseling sessions, and make payments. Admins manage content, students, and analytics from a dedicated dashboard.

**Live URLs:**
- Frontend: https://fine-answer-ireland-plhp.vercel.app
- Backend API: https://fine-answer-ireland.vercel.app

---

## Tech Stack

**Frontend**
- React 19 + Vite 7
- React Router DOM 7
- Tailwind CSS 3
- GSAP + Framer Motion (animations)
- Firebase 12 (auth — email/password + Google OAuth)
- Recharts (admin analytics)
- Axios

**Backend**
- Node.js + Express 5
- MongoDB Atlas
- JWT authentication (30-day tokens)
- bcryptjs (password hashing)
- Nodemailer (OTP/email)
- Google Sheets API (program data CMS)
- SSLCommerz (payment gateway)

**Deployment**
- Frontend → Vercel
- Backend → Vercel Serverless Functions
- Database → MongoDB Atlas

---

## Project Structure

```
FineAnswer-Ireland/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/
│   │   │   ├── admin/       # Admin dashboard pages
│   │   │   └── Provider/    # Auth context
│   │   ├── Firebase/        # Firebase config
│   │   ├── services/        # API service modules
│   │   └── utils/
│   └── public/
└── server/                  # Express backend
    ├── routes/              # API route handlers
    ├── services/            # Google Sheets integration
    ├── middleware/          # JWT auth middleware
    └── config/              # MongoDB connection
```

---

## Features

### Public
- Landing page with program showcase, partner logos, FAQ, success stories
- Real-time program search by university, level, campus, and category (data from Google Sheets)
- Blog listing and detail pages
- Career/job listings with detail pages
- Interactive brochure flipbook
- Country-specific pages (Ireland; AU/UK redirect to home)

### User Dashboard (authenticated)
- Progress tracker — visual visa/application step-by-step tracker
- Document checklist — upload and verify required documents
- Counseling sessions — view booked one-on-one sessions
- Profile management — edit personal info and photo
- In-app messaging
- Payment via SSLCommerz
- English proficiency tracker (IELTS/TOEFL scores)

### Admin Dashboard (role-protected)
- Analytics with charts (Recharts)
- Blog, career, and success story CRUD
- Session scheduling and management
- Student records and progress tracker updates
- Document submission monitoring

---

## Authentication

- Email/password registration with bcrypt hashing
- Google OAuth via Firebase
- JWT tokens (30-day expiration) stored on the client
- Admin access gated by `ADMIN_EMAIL` environment variable
- OTP-based password reset via email (Nodemailer)

---

## API Routes

| Prefix | Description |
|---|---|
| `/api/auth` | Register, login, OTP, password reset |
| `/api/users` | User profile, admin user listing |
| `/api/programs` | Program search (Google Sheets) |
| `/api/blogs` | Blog CRUD |
| `/api/jobs` | Job listings CRUD |
| `/api/career` | Career applications |
| `/api/documents` | Document tracking |
| `/api/success-stories` | Student testimonials |
| `/api/admin` | Admin-only operations |
| `/api/create-payment` | SSLCommerz payment initiation |
| `/api/send-message` | Messaging |
| `/api/health` | Health check |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster
- Firebase project (Auth enabled)
- Google Cloud service account with Sheets API access
- SSLCommerz merchant account

### 1. Clone the repo

```bash
git clone <repo-url>
cd FineAnswer-Ireland
```

### 2. Server setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/FineAnswerIreland
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
GOOGLE_SPREADSHEET_ID=your_google_sheet_id
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWD=your_store_password
SSLCOMMERZ_MODE=sandbox
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Place your Google service account JSON key in `server/` and reference it in the Sheets service config.

```bash
npm run dev     # Start with nodemon on port 5000
```

### 3. Client setup

```bash
cd client
npm install
```

Create `client/.env.local`:

```env
VITE_API_URL=http://localhost:5000
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your-project.firebaseapp.com
VITE_PROJECTID=your-project-id
VITE_STORAGEBUCKET=your-project.firebasestorage.app
VITE_MESSAGINGSENDERID=your_sender_id
VITE_APPID=your_app_id
VITE_MEASUREMENTID=G-XXXXXXXXXX
```

```bash
npm run dev     # Start Vite dev server on port 5173
```

---

## Scripts

**Client** (run from `/client`):

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

**Server** (run from `/server`):

```bash
npm run dev       # Nodemon (auto-restart)
npm run start     # Production start
```

---

## Database Collections (MongoDB)

| Collection | Contents |
|---|---|
| `usersCollection` | User accounts and profiles |
| `blog` | Blog posts |
| `session` | Counseling sessions |
| `events` | Events and webinars |
| `careerCollection` | Job postings |
| `careerApplications` | Student job applications |
| `documentsCollection` | Document submissions |
| `successStory` | Student testimonials |
| `paymentCollection` | Payment transactions |

---

## Third-Party Integrations

| Service | Purpose |
|---|---|
| Firebase | User auth (email + Google OAuth) |
| Google Sheets API | Program data (CMS replacement, 5-min cache) |
| Cloudinary | Media/image hosting |
| SSLCommerz | Payment processing |
| Nodemailer | OTP and email notifications |

---

## Deployment

Both client and server deploy to Vercel automatically on push.

**Backend** — `server/vercel.json` maps all routes to the Express handler exported from `index.js`.

**Frontend** — Standard Vite build; set all `VITE_*` environment variables in the Vercel dashboard.
