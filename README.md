# Asset Management System

A full-stack **Asset Management System** built with React.js and Django REST Framework. The application provides role-based portals for administrators and employees to manage organizational assets, inventory, assignments, and repair tickets.

## 🌐 Live Demo

**Live Application:** https://asset-management-system-two-green.vercel.app

> The frontend is deployed on Vercel and the Django REST API backend is hosted on PythonAnywhere.

## ✨ Features

### Admin
- Dashboard with asset and inventory statistics
- Add, update, and manage assets
- Inventory management
- Assign assets to employees
- Repair ticket management
- Role-based access control

### Employee
- Dedicated employee dashboard
- View assigned assets
- View and manage profile
- Submit repair tickets
- Track asset-related information

## 🛠️ Tech Stack

**Frontend**
- React.js
- Axios
- CSS

**Backend**
- Python
- Django
- Django REST Framework

**Authentication**
- JWT Authentication
- Protected Routes
- Role-Based Authorization

**Database**
- SQLite

**DevOps & Deployment**
- Docker
- Docker Compose
- Git & GitHub
- Vercel — Frontend
- PythonAnywhere — Backend

## 📁 Project Structure

    asset-management-system/
    │
    ├── backend/
    │   ├── asset_management/
    │   ├── Dockerfile
    │   └── requirements.txt
    │
    ├── frontend/
    │   └── asset-management-ui/
    │
    ├── docker-compose.yml
    └── README.md

## 🚀 Running Locally

### Backend

    cd backend/asset_management
    pip install -r ../requirements.txt
    python manage.py migrate
    python manage.py runserver

### Frontend

    cd frontend/asset-management-ui
    npm install
    npm start

## 🐳 Docker

The project includes Docker configuration for containerized development and deployment.

    docker compose up --build

## 📸 Screenshots
Screenshots of the Admin Dashboard, Employee Dashboard ,login page will be added here.

login page
<img width="1906" height="859" alt="Screenshot 2026-07-03 032717" src="https://github.com/user-attachments/assets/342a738f-af98-41b4-8076-d6611fc528d7" />
Admin Dashboard
<img width="1903" height="847" alt="Screenshot 2026-07-03 032751" src="https://github.com/user-attachments/assets/4336f820-b046-4ea8-806f-2e07a7a6ce20" />
<img width="1904" height="859" alt="Screenshot 2026-07-03 032825" src="https://github.com/user-attachments/assets/a77e2d58-f281-4c37-8401-bee6bb3df6c7" />
Employee Dashboard
<img width="1907" height="855" alt="Screenshot 2026-07-03 033142" src="https://github.com/user-attachments/assets/d495cb32-e721-4351-a146-ab2c0f1aa128" />


## 🔮 Future Enhancements

- Email notifications
- Advanced asset reports and analytics
- PDF/Excel report export
- Search and filtering enhancements
- Production database migration to PostgreSQL

## 👨‍💻 Author

**Jyothish P A**

GitHub: https://github.com/jyothish36
