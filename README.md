# CourseFlow

CourseFlow is a full-stack e-learning and course marketplace platform where creators can build, list, and sell courses, and learners can discover, purchase, and manage the courses they care about.

Built with a modern TypeScript stack — Next.js on the frontend, Express.js and MongoDB on the backend — CourseFlow supports secure authentication, course management, wishlists, and Stripe-powered payments.

🔗 **Live Site:** https://courseflow-client.vercel.app/
🖥️ **Server Repository:** https://github.com/Kz-Himel/courseflow-server

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-up/sign-in with [Better Auth](https://www.better-auth.com/), including protected routes on both client and server
- 📚 **Course Management** — Creators can add, edit, and manage their own course listings ("My Listings", "Edit Course")
- 💳 **Payments** — Course purchases powered by [Stripe](https://stripe.com/)
- ❤️ **Wishlist** — Learners can save courses for later
- 🧑‍🏫 **Role-based Access** — Separate flows and permissions for creators and learners
- 🎨 **Consistent Design System** — Clean UI built on a strict violet / orange / neutral-gray color palette, with skeleton loaders and responsive card grids
- ⚡ **Native MongoDB Driver** — No ORM overhead; direct, predictable database access

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [Next.js](https://nextjs.org/) (App Router), TypeScript, [Tailwind CSS](https://tailwindcss.com/) |
| Backend | [Express.js](https://expressjs.com/), TypeScript |
| Database | [MongoDB](https://www.mongodb.com/) (native driver, no Mongoose) |
| Auth | [Better Auth](https://www.better-auth.com/) |
| Payments | [Stripe](https://stripe.com/) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) |

---

## 📁 Project Structure

```
courseflow/
├── client/                 # Next.js frontend (App Router)
│   ├── app/
│   ├── components/
│   └── lib/
└── README.md
```

> Adjust this tree to match your actual folder layout if it differs.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- A [Stripe](https://dashboard.stripe.com/) account (for payment features)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/courseflow.git
cd courseflow
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

```

### 3. Configure environment variables

Create a `.env` file in `client/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:5000
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

```

### 4. Run the development servers

```bash

# In client/ (separate terminal)
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## 🔑 Authentication & Authorization

CourseFlow uses **Better Auth** for session and JWT-based authentication:

- Frontend retrieves the JWT via `authClient.token?.()`
- Backend verifies requests using a `verifyToken` middleware, exposing the user via `req.user?.email`
- Protected routes redirect unauthenticated users away from creator/learner-only pages

---

## 💳 Payments

Course purchases are handled through Stripe Checkout. On successful payment, the backend confirms the transaction and grants the learner access to the purchased course.

---

## 🗺️ Roadmap

- [ ] Course progress tracking
- [ ] Reviews & ratings
- [ ] Instructor analytics dashboard
- [ ] Video hosting/streaming integration
- [ ] Search and filtering improvements

---

## 🤝 Contributing

This is currently a solo/independent project. Contributions, issues, and suggestions are welcome — feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Khayruzzaman Himel**
MERN-Stack Developer, Bangladesh

- Portfolio: https://kzhimel.vercel.app/
