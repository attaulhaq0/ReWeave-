# ReWeave — MVP Product Requirements Document

**Version:** 1.0 | 2025 | Months 1–3
**Status:** DRAFT — In Review

## 1. Executive Summary
ReWeave is an AI-powered two-sided marketplace that connects Pakistan’s textile factories with recyclers — turning post-industrial fabric waste into predictable, classified, and tradeable feedstock. 

### 1.1 MVP Goal
Validate that:
- Textile suppliers will list waste digitally when the process is fast enough (under 5 minutes per listing)
- AI classification reduces friction enough that suppliers don’t need manual tagging
- Buyers will transact on the platform rather than through brokers when pricing is transparent
- The end-to-end marketplace loop (list → bid → pay → pickup) functions reliably

### 1.2 What the MVP Is NOT
- Supply forecasting dashboard (Phase 2)
- Price analytics & trend charts (Phase 2)
- 3PL API integration — logistics will be manually coordinated in MVP
- Subscription / premium tiers (Phase 2)
- WhatsApp bot for listing management (Phase 2)
- Mobile app — responsive PWA only
- Quality certification module (Phase 3)
- ERP integration API (Phase 3)
- Multi-country / multi-currency support (Phase 4)

## 2. Problem Statement
**The Core Problem:**
- 65%+ of post-industrial textile waste goes to landfill.
- No digital catalog of available waste — all via brokers & WhatsApp.
- Manual waste classification is inconsistent.
- Recyclers cannot reliably forecast incoming supply volume.
- Logistics are uncoordinated.
- No escrow or payment trust layer between strangers.

## 3. Target Users
1. **Supplier (Farhan):** Production Manager at a mid-size garment factory. Wants to list waste in minutes and get predictable revenue.
2. **Buyer (Sadia):** Procurement Head at a Fiber Recycling Plant. Wants consistent feedstock, transparent pricing, and quality assurance.
3. **Admin (Hamid):** Platform Operations. Reviews KYB, moderates listings, handles disputes.

## 4. User Stories

### 4.1 Authentication & Onboarding
- **US-01: Supplier Registration** (Email, Phone OTP)
- **US-02: KYB Verification** (Upload NTN, CNIC, Business Reg. Admin approves/rejects)
- **US-03: Buyer Registration** (Basic verification, set material preferences)

### 4.2 Waste Listing (Supplier)
- **US-04: Create Waste Listing with AI Classification** (Upload images, AI auto-fills material, color, grade, weight, recyclability score)
- **US-05: Publish Listing** (Sets to ACTIVE, 7-day auction default)
- **US-06: Manage Listings** (Dashboard with Active, Draft, Sold, Expired, Cancelled tabs. Can cancel active listings)

### 4.3 Marketplace Discovery (Buyer)
- **US-07: Browse Waste Catalog** (Grid view, filters for material, grade, weight, price, search)
- **US-08: View Listing Detail** (Image carousel, AI report, specs, bid history, countdown timer)

### 4.4 Bidding
- **US-09: Place a Bid** (Minimum increment PKR 500, real-time updates, outbid notifications)
- **US-10: Auto-Bid** (Set max ceiling, system auto-bids incrementally)
- **US-11: Instant Buy** (Fixed price purchase, closes auction immediately)

### 4.5 Payments & Escrow
- **US-12: Payment on Winning Bid** (Stripe/JazzCash/EasyPaisa, funds held in escrow)
- **US-13: Escrow Release** (Buyer confirms delivery -> funds released to supplier minus 3% commission)

### 4.6 Notifications
- **US-14: Key Event Notifications** (Outbid, Won auction, Payment reminder, Delivery confirmed)

### 4.7 Admin
- **US-15: Admin Dashboard** (KYB Queue, User Management, Listings Management, Orders Management, Metrics)

## 5. Feature Requirements (MVP - Months 1-3)
- JWT Auth, KYB Upload & Review
- AI Classification (EfficientNet-B4)
- Waste Listing CRUD
- Marketplace Catalog & Search (Meilisearch)
- Real-time bidding (Socket.IO) & Auto-bid engine
- Stripe & JazzCash/EasyPaisa integration
- Escrow hold & release
- Admin Panel
