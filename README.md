# 🪐 Jupiter — Handmade Arts & Gifts

Jupiter is a premium, handcrafted arts and gifts e-commerce platform built for a "WhatsApp-first" commerce model. It features a bespoke, high-contrast minimalist storefront and a secure, fully featured admin dashboard for managing products, categories, reviews, and custom orders.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** PostgreSQL via [Supabase](https://supabase.com)
- **Authentication:** [Clerk](https://clerk.com) (Admin-only Email/Password)
- **Storage:** [Cloudinary](https://cloudinary.com)
- **Deployment:** Vercel

---

## ✨ Key Features

- **WhatsApp-First Commerce:** No traditional payment gateways. Orders and custom requests generate pre-filled WhatsApp messages to facilitate direct communication with the artisan.
- **Secure Admin Dashboard:** A protected `/admin` route featuring comprehensive CRUD operations for products, categories, reviews, and site settings.
- **Double-Layer Security:** Clerk handles the session, while a strict server-side check verifies the user against a whitelisted `ADMIN_EMAIL` environment variable.
- **Dynamic Content:** Masonry product grids, infinite scrolling, real-time search, and local-storage based wishlists.

---

## 🚀 Getting Started

### 1. Prerequisites
You will need accounts for the following services to run this project locally:
- [Supabase](https://supabase.com) (Database)
- [Clerk](https://clerk.com) (Authentication)
- [Cloudinary](https://cloudinary.com) (Image & Video Storage)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Copy the example environment file and fill in your keys:
```bash
cp .env.example .env.local
```
*Note: Make sure to set `ADMIN_EMAIL` to your exact Clerk email address, or you will be locked out of the admin dashboard.*

### 4. Database Setup
Ensure you have the Supabase CLI installed, link your project, and push the database schema:
```bash
supabase link --project-ref your_project_ref
supabase db push
```

### 5. Run the Development Server
Start the local server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the storefront, and `http://localhost:3000/admin` to access the dashboard.

---

## 🔐 Authentication & Security

The admin dashboard uses a strict, double-layer security model:
1. **Clerk Middleware:** Forces unauthenticated users to the `/admin/sign-in` page.
2. **Layout Validation:** The `src/app/(admin)/layout.tsx` file verifies that the authenticated user's email exactly matches the `ADMIN_EMAIL` in your `.env.local` file. If a user logs in with a different email, they are shown an "Access Denied" screen and cannot view the dashboard.
3. **Server Actions:** All database mutations are protected by a `requireAdmin()` helper to ensure no unauthorized backend modifications can occur.

To log in, ensure your Clerk dashboard has **Google Auth disabled** and **Email/Password enabled**.

---

## 📚 Comprehensive Documentation

For a deep dive into the project's architecture, database schema, design philosophy, and component hierarchy, please refer to the primary project blueprint:

👉 **[View Full Project Specification (about.md)](./about.md)**

---

*Handcrafted in Nepal 🇳🇵*
