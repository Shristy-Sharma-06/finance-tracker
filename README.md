# 💰 Personal Finance Tracker

A full-stack Personal Finance Tracker application built to help users manage their personal finances efficiently. The application allows users to securely track income and expenses, manage budgets, and view financial reports through an interactive dashboard.

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Secure User Authorization
- Add, Update, Delete & View Transactions
- Income & Expense Management
- Budget Management
- Dashboard with Financial Summary
- Reports & Analytics
- Input Validation & Exception Handling
- Responsive User Interface

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven

### Frontend
- React.js
- HTML5
- CSS3
- Bootstrap
- JavaScript
- Axios

### Database
- MySQL

## 📂 Project Structure

```
finance-tracker/
├── screenshots
├── backend/
│   ├── .mvn/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── finance/
│   │   │   │           └── finance_tracker/
│   │   │   │               ├── config/
│   │   │   │               ├── controller/
│   │   │   │               ├── dto/
│   │   │   │               ├── entity/
│   │   │   │               ├── enums/
│   │   │   │               ├── exception/
│   │   │   │               ├── repository/
│   │   │   │               ├── response/
│   │   │   │               ├── security/
│   │   │   │               ├── service/
│   │   │   │               │   └── impl/
│   │   │   │               └── util/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## ⚙️ Installation

### Backend

```bash
git clone <repository-url>
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** for secure authentication and authorization. Users must log in to access protected APIs.

## 📌 Main Modules

- Authentication
- Dashboard
- Transactions
- Budget
- Reports

## 📖 API Modules

- Authentication APIs
- Transaction APIs
- Budget APIs
- Dashboard APIs
- Report APIs


# 📖 API Endpoints

## 🔐 Authentication APIs

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register a new user. | ❌ No |
| POST | `/api/auth/login` | Login user and return JWT token. | ❌ No |
| GET | `/api/auth/me` | Get the currently authenticated user. | ✅ Yes |

---

## 💰 Transaction APIs

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/transactions` | Add a new transaction. | ✅ Yes |
| GET | `/api/transactions` | Retrieve all transactions. | ✅ Yes |
| GET | `/api/transactions/{id}` | Retrieve a transaction by ID. | ✅ Yes |
| PUT | `/api/transactions/{id}` | Update an existing transaction. | ✅ Yes |
| DELETE | `/api/transactions/{id}` | Delete a transaction. | ✅ Yes |

---

## 💵 Budget APIs

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/budgets` | Create a new budget. | ✅ Yes |
| GET | `/api/budgets` | Retrieve all budgets. | ✅ Yes |
| GET | `/api/budgets/{id}` | Retrieve a budget by ID. | ✅ Yes |
| PUT | `/api/budgets/{id}` | Update an existing budget. | ✅ Yes |
| DELETE | `/api/budgets/{id}` | Delete a budget. | ✅ Yes |

---

## 📊 Dashboard APIs

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/dashboard` | Retrieve dashboard summary including income, expenses and balance. | ✅ Yes |
| GET | `/api/dashboard/monthly-trends` | Retrieve monthly income and expense trends. | ✅ Yes |
| GET | `/api/dashboard/category-expense` | Retrieve category-wise expense data. | ✅ Yes |

---

## 📈 Report APIs

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/reports/monthly` | Generate monthly financial report. | ✅ Yes |
| GET | `/api/reports/annual` | Generate annual financial report. | ✅ Yes |
| GET | `/api/reports/category-wise` | Retrieve category-wise expense report. | ✅ Yes |
| GET | `/api/reports/export/pdf` | Export monthly report as PDF. | ✅ Yes |
| GET | `/api/reports/export/csv` | Export monthly report as CSV. | ✅ Yes |

---

## 🔒 Authentication Header

All protected APIs require a valid JWT token.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 📌 HTTP Status Codes

| Status Code | Description |
|------------|-------------|
| 200 OK | Request completed successfully |
| 201 Created | Resource created successfully |
| 400 Bad Request | Invalid request data |
| 401 Unauthorized | Authentication required or invalid token |
| 403 Forbidden | Access denied |
| 404 Not Found | Requested resource not found |
| 500 Internal Server Error | Unexpected server error |


## 🔮 Future Enhancements

- Email Notifications
- Export Reports (PDF/Excel)
- Multi-Currency Support
- Dark Mode
- Mobile Responsive Improvements

## 👩‍💻 Author

**Shristy Sharma**

---
This project was developed as a full-stack application using **Spring Boot**, **React.js**, and **MySQL** to simplify personal finance management.