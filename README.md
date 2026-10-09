# 🛒 বাজার দর / BazarDor

A Bengali market price tracking web application where users can view current market prices of essential commodities, track price changes, browse products by category, and manage their profile.

## 📖 Description

বাজার দর (BazarDor) is a fully responsive Next.js web application built for tracking daily market prices in Bengali language. It provides real-time price information with increase/decrease indicators, category-wise product browsing, and user authentication. The app displays all prices in Bengali numerals (০-৯) and uses Bengali date format.

## 🛠️ Technologies Used

- **Next.js** (App Router) — UI framework and page navigation
- **Tailwind CSS + DaisyUI** — Styling and responsive design
- **TypeScript** — Type-safe code
- **BetterAuth** — Authentication (email/password + Google + GitHub)
- **react-hot-toast** — Toast notifications
- **Vercel** — Deployment platform

## ✨ Key Features

1. **Bengali Language Market Price Display** — Full Bengali UI with Bengali numerals (১২৩), Bengali date format, and all text in Bengali language for easy understanding by local users.
2. **Category-Wise Product Browsing** — Browse products by category (চাল, ডাল, সবজি, মাছ, etc.) with dynamic category pages fetched from API.
3. **Price Change Tracking** — Real-time price increase (▲ green) and decrease (▼ red) indicators with percentage change badges on every product card.
4. **Authentication System** — Email/password login, Google/GitHub social login, protected routes, sign in/sign up with toast notifications.
5. **Fully Responsive Design** — Works seamlessly on mobile, tablet, and desktop with collapsible navbar, responsive grid, stacked hero, and adaptive layouts.
6. **Live Price Ticker (Marquee)** — Infinite scrolling price ticker below navbar showing emoji + product name + price + change percentage.
7. **Sort & Search** — Sort products by price (low to high / high to low) with correct Bengali numeral handling.
8. **Product Detail Pages** — Protected product pages with min/max/average prices, market-wise pricing, and category tags.
9. **Profile Management** — User profile page with update information feature following BetterAuth documentation.
10. **404 & Loading States** — Custom 404 page, skeleton loaders, and smooth user experience throughout.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
bazar-dor/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Home skeleton loader
│   ├── not-found.tsx       # 404 page
│   ├── signin/page.tsx     # Sign in
│   ├── signup/page.tsx     # Sign up
│   ├── product/[slug]/     # Product detail (protected)
│   ├── category/[slug]/    # Category page
│   ├── profile/page.tsx    # Profile (protected)
│   └── update-info/page.tsx # Update info (protected)
├── components/
│   ├── Navbar.tsx           # Navbar with auth
│   ├── PriceTicker.tsx     # Marquee ticker
│   ├── Hero.tsx             # Hero/Banner
│   ├── ProductCard.tsx     # Product card
│   ├── ProductGrid.tsx     # Grid layout
│   ├── Footer.tsx          # Footer
│   ├── SortDropdown.tsx    # Sort control
│   └── Skeleton.tsx         # Loading skeleton
├── lib/
│   ├── auth.ts              # Auth config
│   ├── api.ts               # API functions
│   └── bengali.ts           # Bengali helpers
├── public/
├── README.md
└── package.json
```

## 🌐 API Endpoints

| Endpoint | Description |
|---|---|
| `/products` | Get all products |
| `/products?category=chal` | Filter by category |
| `/products/1` | Get single product |
| `/categories` | Get all categories |
| `/categories/chal` | Get single category |

## 📱 Responsive Breakpoints

- **Mobile:** 1 column grid, hamburger menu, stacked hero
- **Tablet:** 2 column grid, full navbar
- **Desktop:** 3-4 column grid, full features

## 🔗 Links

- **Live Link:** [Add your Vercel deployment URL here]
- **GitHub Repository:** [Add your GitHub repo URL here]

## 📄 License

This project is created as part of an academic assignment.

© 2026 বাজার দর / BazarDor. All rights reserved.
