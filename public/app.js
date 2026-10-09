# Network Marketing System Starter

A lightweight starter codebase for a network marketing / MLM platform with:

- distributor registration
- sponsor referral tracking
- product catalog
- order placements
- commission earnings
- dashboard analytics
- admin-friendly API structure

## Tech stack

- Node.js
- Express
- Vanilla JavaScript frontend
- In-memory mock data for quick setup

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm start
   ```

3. Open the frontend in a browser:
   ```text
   http://localhost:5000
   ```

## API endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/dashboard`
- `GET /api/distributors`
- `GET /api/distributors/:id`
- `GET /api/distributors/:id/tree`
- `GET /api/distributors/:id/commissions`
- `POST /api/register`
- `POST /api/orders`

## Notes

This project is intentionally a starter implementation. It uses in-memory data so you can extend it with:

- PostgreSQL or MySQL persistence
- real authentication
- payout approval workflow
- richer genealogy tree
- team rank logic
- Stripe or Flutterwave integration
- admin dashboard and reporting

## Suggested next steps

- add authentication and role-based access
- connect a real database
- build a proper distributor tree view
- add bonus rules by rank and depth
- create a production-ready admin panel

## Compliance reminder

Keep all compensation logic transparent and compliant with regional direct-selling regulations. Product-first selling and clear earnings disclosures should be part of the business rules.


