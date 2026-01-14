# Simple E-commerce API

A logic-heavy RESTful API that simulates the core backend of an e-commerce platform, including authentication, shopping carts, orders, and payment intent handling.

This project focuses on **data modeling, multi-table transactions, and real-world backend flow**, purely backend.

---

## Features

- Authentication (register & login)
- Product listing and management
- Shopping cart system per user
- Add/update/remove items in cart
- Order creation from cart
- Order and payment status tracking
- PostgreSQL relational data modeling

---

## How It Works

### Authentication
1. User registers with email and password
2. Passwords are securely hashed
3. Token-based authentication is used for protected routes

### Product Flow
- Products store pricing and stock information
- Products can be referenced by carts and orders

### Cart Flow
1. Each user has **one active cart**
2. Products are added via a `CartItem` join table
3. Quantities are tracked per product
4. Cart remains active until checkout

### Order Flow
1. User checks out the active cart
2. An order is created from cart contents
3. OrderItems store:
   - Product reference
   - Quantity
   - Price at time of purchase
4. Total cost is calculated server-side
5. A payment intent is created and returned to the client

---

## Database Structure

- **User**
- **Product**
- **Cart**
- **CartItem** (Cart ↔ Product)
- **Order**
- **OrderItem** (Order ↔ Product)


## What I Learned / Key Takeaways

### Database Relationships
- Designing many-to-many schemas using join tables

### E-commerce Flow
- Separating cart logic from order logic
- Placing business logic in services instead of controllers
