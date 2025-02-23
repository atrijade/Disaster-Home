# 🌍 Disaster Visa Management System

A web-based application for managing disaster-related visa applications with user authentication using Firebase, Node.js, and Express.js. This project allows users to register, log in, and access a protected dashboard.

---

## 🚀 **Project Structure**
```
Distsater_Visa/
├─ node_modules/ # Dependencies
├─ public/ # Static files
│ ├─ css/ # Stylesheets
│ │ ├─ login.css # Login & Signup styling
│ │ └─ style.css # Homepage styling
│ └─ images/ # Image assets
│ ├─ dis.jpeg
│ └─ login.jpeg
├─ views/ # EJS templates
│ ├─ index.ejs # Homepage (protected)
│ └─ login.ejs # Login & Signup page
├─ loginejs.js # Firebase authentication logic
├─ my-profile-firestore-firebase-adminsdk.json # Firebase Admin SDK
├─ package.json # Project dependencies
├─ server.js # Main Express server
└─ README.md # Project documentation
```
---

## 📦 **Installation & Setup**

1. **Clone the Repository:**

```bash
git clone https://github.com/yourusername/disaster-visa.git
cd Distsater_Visa
npm install
```
2. **Firebase Setup:**

Go to Firebase Console.
Create a new project.
Enable Firestore and Authentication (Email/Password).
Download the Admin SDK JSON and place it as my-profile-firestore-firebase-adminsdk.json.
Environment Setup:

Ensure your server.js has this Firebase initialization:

```
const serviceAccount = require('./my-profile-firestore-firebase-adminsdk.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
```

## 🌐 Running the Application
Start the Server:

```
node server.js
```
Access the App:
Visit: 👉 http://localhost:3000

## 🔑 Features
**User Authentication:**
Login using email and password.
Register new users securely.

**Protected Routes:**
Only logged-in users can access the homepage.
Session Management:

**Users stay logged in until they log out.**
## 🚀 Usage

This Disaster Visa Management System allows users to:

1. **User Authentication:**  
   - Register and log in securely using Firebase authentication.  
   - Access protected pages only after successful login.  

2. **Disaster Alerts:**  
   - Get or give real-time alerts about disasters happening in your area.  
   - View the type of disaster, its severity, and safety instructions.  

3. **Information Management:**  
   - Easily manage and access disaster-related information.  
   - Ensure quick action and better preparedness during emergencies.



