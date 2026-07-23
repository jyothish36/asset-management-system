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
Screenshots of the Admin Dashboard, Employee Dashboard, Asset Management, Inventory Management, and Repair Ticket features will be added here.

login page
<img width="1906" height="859" alt="Screenshot 2026-07-03 032717" src="https://github.com/user-attachments/assets/2f5de94c-cb35-4acb-9339-3d4ebfe2f000" /> 

Admin Dashboard
<img width="1903" height="847" alt="Screenshot 2026-07-03 032751" src="https://github.com/user-attachments/assets/d0821f3a-08a8-4c18-979a-f46c717166e1" />

Employee Dashboard<img width="1907" height="852" alt="Screenshot 2026-07-03 033057" src="https://github.com/user-attachments/assets/ad299c7b-a44d-4d33-850a-47e0057eb867" />

<img width="1907" height="855" alt="Screenshot 2026-07-03 033142" src="https://github.com/user-attachments/assets/fd6599a9-2cf5-472e-90c0-ed845b0b08cb" />

 <img width="1907" height="852" alt="Screenshot 2026-07-03 033057" src="https://github.com/user-attachments/assets/e82f28d2-37bf-413b-a5d7-79cf0e9164e2" />


## 🔮 Future Enhancements<img width="1907" height="855" alt="Screenshot 2026-07-03 033142" src="https://github.com/user-attachments/assets/a5d1a969-8cef-4e7d-950a-daa47201337a" />


- Email notifications
- Advanced asset reports and analytics
- PDF/Excel report export
- Search and filtering enhancements
- Production database migration to PostgreSQL

## 👨‍💻 Author

**Jyothish P A**

GitHub: https://github.com/jyothish36
