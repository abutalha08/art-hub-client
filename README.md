<div align="center">

  # 🎨 ArtHub – Online Art Marketplace
  
  **A Premium Full-Stack Digital Platform for Art Enthusiasts, Collectors, and Global Artists.**

  [![Vercel Deployment](https://img.shields.io/badge/Deployed%20With-Vercel-black?style=for-the-badge&logo=vercel)](https://your-live-link.vercel.app)
  [![Node.js Version](https://img.shields.io/badge/Node.js->=18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)

  ---
  
  [🌐 Live Production Website](https://art-hub-client-henna.vercel.app) 
</div>

## 📌 Project Overview & Purpose

Traditional art buying is often restricted to physical galleries and local exhibitions, limiting emerging artists from reaching a global audience. **ArtHub** is a sophisticated, decentralized marketplace designed to democratize art commerce. 

Built using modern MERN and Serverless paradigms, it connects collectors with creators under a highly secure ecosystem. Buyers can browse masterpieces, track purchase limits dynamically based on subscription tiers, and execute seamless payments. Artists enjoy absolute autonomy over their portfolio via dedicated CRUD studios, while full platform audits are handled comprehensively by an automated Admin Control Dashboard.

---

## 🛠️ Premium Tech Stack

This project leverages a highly optimized, modern tech stack engineered for scalability, speed, and exceptional user experience:

* **Frontend Architecture:** **Next.js 15 (App Router)** – Utilizing Server Components for fast initial loads and robust hydration safeguards.
* **Styling & UI Components:** **Tailwind CSS** & **HeroUI** – Ensuring a high-contrast, premium dark visual harmony, perfect grid alignments, and a flawless responsive layout.
* **State & Authentication:** **BetterAuth** – Driving enterprise-grade, secure session management for regular and Google OAuth paths.
* **Database Management:** **MongoDB** – A high-performance, non-relational document store mapped for rapid multi-collection queries.
* **Server-Side API Gateway:** **Express.js** – A highly modular runtime router layer processing strict business logics and role validations.
* **Micro-Interactions & Animations:** **Framer Motion** – Creating eye-catching, fluid transitions and premium user engagement across elements.
* **Dynamic Notifications:** **React Hot Toast** – Injecting real-time, lightweight, responsive status alerts for client actions.
* **Asset Visuals:** **React Icons** – Lightweight, pixel-perfect icon metrics maintaining typography structure.

---

## 💎 Role-Based Features & System Architecture

### 🛍️ 1. Buyer (User) Experience & Tier Management
* **Flexible Marketplace Browsing:** Complete freedom to explore global artworks with lightning-fast dynamic searching, category filtering, and structural multi-criteria sorting (Price High-Low, Newest) without requiring initial login.
* **Stripe Gateway Subscriptions:** Seamless checkout infrastructure allowing buyers to instantly scale their account profiles from the **Free Tier** (Max 3 purchases allowed) to **Pro** ($9.99/mo, 9 purchases) or **Premium** ($19.99/mo, Unlimited purchases).
* **Smart Quota Interceptor:** Automated backend validations systematically block new Stripe billing sessions if a client goes beyond their structural tier boundaries.
* **Verified-Buyer Feedback System:** An algorithmic trust gate (`POST /api/artworks/:id/comments`) that explicitly verifies user purchase histories in the database before accepting comments, completely eliminating fraudulent reviews.
* **Comprehensive Collection Hub:** A personal dashboard tracking historical payment invoices, detailed transaction timelines, and a visual collection gallery of all acquired masterpieces.

### 🎨 2. Artist Portfolio Studio & Inventory Controls
* **Absolute CRUD Autonomy:** Dedicated digital workspace allowing verified artists to seamlessly upload masterpieces, modify active pricing structures, update descriptions, or remove listings from the marketplace.
* **Cloud-Optimized Media Pipeline:** Integrated directly with the `imgBB API` to handle heavy image file streams securely, storing high-contrast preview assets on the cloud.
* **Live Commercial Spreadsheets:** Real-time financial ledger tables displaying precise historical buyer identities, individual transaction amounts, exact purchase dates, and automated revenue indicators.
* **Context-Aware Protections:** Intelligent button states automatically prevent or disable purchase actions on artwork detail pages if the logged-in profile belongs to the owning artist themselves.

### 🛡️ 3. Centralized Admin Command Center
* **Operational Analytics Stream:** Rich data summaries mapping total active platform users, registered creative artists, aggregate units sold, and total cumulative revenue metrics.
* **Interactive Dynamic Visualizations:** Rendered beautifully via `Recharts`, providing instantaneous charts on categorical artwork frequency distributions and platform sales trends.
* **User Management Matrices:** High-level access switches to update, mitigate, or revoke client platform permissions instantly (User ⇄ Artist ⇄ Admin).
* **Global Inventory & Audit Control:** Centralized oversight to monitor platform-wide listings with authority to remove standard-breaking artworks, and audit dual transaction types (Subscription Upgrades & Product Purchases).

---

