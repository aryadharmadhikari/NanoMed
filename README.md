# NANOMED
> **"Where Quality Meets Care"**

## 🚀 Project Overview

**NANOMED** is a high-performance Direct-to-Consumer (D2C) platform designed to transition the brand from marketplace dependency (Amazon/Flipkart) to **digital asset ownership**.

This platform is engineered for **Zero-Latency Speed** and **SEO Dominance**, targeting the elderly demographic with instant-loading mobile experiences while maintaining a **Zero Fixed Cost** infrastructure model.

### 🎯 Core Business Objectives
* **SEO Dominance:** Ranking #1 for "Walkers" & "Commode Chairs" via Incremental Static Regeneration (ISR).
* **Zero-Latency:** Sub-second page loads to prevent customer drop-off.
* **Financial Efficiency:** Architecture designed to run on **₹0/month** fixed costs using developer free tiers.

---

## 🛠️ The Architecture

This project uses a modern, enterprise-grade stack optimized for performance and scalability.

| Component | Technology | Role & Justification |
| :--- | :--- | :--- |
| **Frontend Engine** | **Next.js (App Router)** | Server-Side Rendering (SSR) & ISR for maximum SEO and speed. |
| **Styling** | **Tailwind CSS** | Rapid UI development with a mobile-first approach. |
| **Database** | **Firebase (Cloud Firestore)** | NoSQL document database, zero downtime/inactivity pause, generous free tier. |
| **Storage** | **Firebase Storage** | Fast and secure cloud image asset hosting. |
| **Payments** | **WhatsApp Direct / (Phase 2 Razorpay)** | Frictionless order placement with zero transaction fees. |
| **Deployment** | **Vercel** | Edge network deployment for instant global access. |

---

## 🗺️ Execution Roadmap

The project is executed in two strategic phases to prioritize lead generation before transactional complexity.

### ✅ Phase 1: The "Digital Catalog" (Current Sprint)
*Focus: Lead Generation & Brand Authority*
- [x] **Next.js Setup:** Hero Section & Navigation Bar.
- [x] **Product Catalog:** Dynamic product listing pages using ISR.
- [x] **Product Details:** Dedicated SEO-optimized pages for each SKU.
- [x] **Enquiry System:** "Chat on WhatsApp" integration for direct leads.
- [x] **Search & Filter:** Instant search functionality for products.
- [x] **Backend & Database:** Firebase Cloud Firestore & Storage integration.

### 🔜 Phase 2: The "E-commerce Upgrade" (Future)
*Focus: Direct Sales & Transactions*
- [ ] **User Identity:** Authentication integration (Login/Sign Up).
- [ ] **Checkout:** Razorpay Payment Gateway integration (branch `feat/razorpay-payments` ready).
- [ ] **Order Management:** Relational database schema for Orders & Invoicing.

---

## 💻 Local Development Setup

Follow these steps to get the project running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/aryadharmadhikari/NanoMed.git
cd nanomed
