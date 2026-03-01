# 📚 Library Management System

A full-stack Library Management System developed as part of the Software Engineering Internship assignment for **Expernetic LLC**. This system is built using a modern tech stack consisting of **ASP.NET Core (.NET 10)** and **React (TypeScript)**.

---

## 📄 Documentation
### [Click here to view the Technical Report (PDF)](./Technical_Report_RavinduChamikaBulathsinhala.pdf)
*The report provides an in-depth summary of the development process, technical architecture, and the challenges faced while transitioning from a Java background to the .NET ecosystem.*

---

## 🚀 Key Features
* **Full CRUD Operations**: Create, Read, Update, and Delete book records seamlessly.
* **User Authentication**: Secure Registration and Login system for library management.
* **Real-time Search**: Efficiently filter the book collection by Title or Author.
* **Robust Validation**: Implemented dual-layer validation using .NET Data Annotations (Backend) and React Hot Toast (Frontend).
* **Responsive UI**: A modern and aesthetically pleasing interface built with Tailwind CSS.

---

## 🛠️ Tech Stack
* **Backend**: C# .NET 10 Web API
* **Database**: SQLite with Entity Framework Core
* **Frontend**: React (Vite), TypeScript, Tailwind CSS
* **Notifications**: React Hot Toast

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally:

### 1. Prerequisites
* .NET 10 SDK
* Node.js (v18 or higher)
* Git

### 2. Backend Setup
Open your terminal in the root directory and run:
```bash
cd LibraryManagementSystemBackend
# Apply migrations to create the SQLite database
dotnet ef database update
# Start the API server
dotnet run
```
The Backend API will be running at: http://localhost:5089

### 3. Frontend Setup
Open a new terminal window and run:

```bash
cd LibraryManagementSystemFrontend
# Install project dependencies
npm install
# Start the React development server
npm run dev
```
The Frontend application will be accessible at: http://localhost:5173

👨‍💻 Developed By
Ravindu Chamika Bulathsinhala

Software Engineering Undergraduate
