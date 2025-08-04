
# Bynry Case Studies

This repository contains my solutions for the Bynry Backend Engineering Internship Case Studies. The case studies are divided into three parts and showcase backend development skills using Node.js, Express, mongodb and flask.

---

## 🧩 Folder Structure

```
BynryCaseStudies/
├── Part1/                 # Debugged Python code
│   └── DebuggedCode.py
├── Part2ANDpart3/         # Node.js backend app with Mongoose models
│   ├── Models/
│   │   ├── Company.js
│   │   ├── InventoryChanges.js
│   │   ├── Product.js
│   │   ├── PurchaseHistory.js
│   │   ├── Supplier.js
│   │   ├── SupplierProduct.js
│   │   ├── Warehouse.js
│   │   ├── WarehouseInventory.js
│   ├── config.env
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

---

## 📌 Part 1 – Python Debugging

- debugged and fixed a route that create product

---

## 📌 Part 2 – Database Modeling (MongoDB with Mongoose)

- Created Mongoose schemas for:
  - Companies
  - Warehouses
  - Products
  - Suppliers
  - Inventory Changes
  - Purchase History
- Used proper relationships and references to maintain data integrity.
- Created schmas to fullfill requirements

---

## 📌 Part 3 – RESTful API Design

- Built an Express.js server with multiple API endpoints.
- created an api endpoint that uses dynamic routing and gives the product inventory data.
- Applied `.env` configuration and modular structure.

---

## 💻 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Environment Variables:** `dotenv`
- **Version Control:** Git & GitHub

---

## 🚀 How to Run

```bash
cd Part2ANDpart3
npm install
node server.js
```

Make sure to set your `config.env` file with your PORT no.

---

## 📬 Contact

Feel free to reach out for suggestions or collaboration opportunities!

**Aakash Rane**  
Email: aakashrane15@gmail.com  
GitHub: [TheDevMonarch](https://github.com/TheDevMonarch)
