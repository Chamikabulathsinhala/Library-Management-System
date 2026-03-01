# Library-Management-System
A full-stack Library Management System built with ASP.NET Core ( .NET 10) and React (TypeScript). This application allows librarians to manage a book catalog with ease, featuring secure authentication and robust data validation.

📄 Documentation
[Click here to view the Technical Report (PDF)](./Technical_Report_RavinduChamikaBulathsinhala.pdf)
The report contains a detailed breakdown of the architecture, challenges faced, and the learning curve of transitioning from Java to .NET.

🚀 Key Features
Full CRUD Operations: Create, Read, Update, and Delete book records.
User Authentication: Secure Login and Registration system.
Real-time Search: Instant filtering of books by Title or Author.
Dual-Layer Validation: Strict server-side checks using .NET Data Annotations and user-friendly frontend feedback via React Hot Toast.
Responsive Design: Fully functional on both desktop and mobile devices.

🛠️ Tech Stack
Backend: C# .NET 10 Web API, Entity Framework Core
Database: SQLite (managed via EF Core)
Frontend: React (Vite), TypeScript, Tailwind CSS
Notifications: React Hot Toast

⚙️ Setup & Installation
1. Prerequisites
.NET 10 SDK
Node.js (v18+)
Git

2. Backend Setup
cd LibraryManagementSystemBackend

# Update the database
dotnet ef database update

# Run the API
dotnet run
API running at: http://localhost:5089

3. Frontend Setup
cd LibraryManagementSystemFrontend

# Install dependencies
npm install

# Run the development server
npm run dev
Frontend running at: http://localhost:5173

👨‍💻 Developed By
Ravindu Chamika Bulathsinhala

Software Engineering Undergraduate
