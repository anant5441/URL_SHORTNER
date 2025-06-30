# 🔗 URL Shortener with User Authentication

A full-stack URL shortener built with Node.js, Express, MongoDB, EJS, and JWT-based user authentication using cookies.
- ✅ URL shortening
- 👤 User signup & login
- 🍪 Cookie-based session management
- 📊 Click analytics per user

---

## 🚀 Features
🔐 User signup & login with JWT stored in HTTP-only cookies

✂️ URL shortening with unique short IDs

📊 Track analytics (click history with timestamps)

🧠 Middleware for authentication and session checking

🖼 EJS templates for frontend pages (login, signup, home)

💾 MongoDB database integration

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Database:** MongoDB with Mongoose
- **Authentication:** Cookies (no external login provider)
- **Others:** shortid for generating unique short links

---

🔐 Authentication Details (JWT + Cookies)
Authentication Type: Email/password based login and signup system.

Session Management:

On successful login/signup, a JWT (JSON Web Token) is generated using the user's _id and email.

This token is stored in a cookie named uid.

JWTs are verified and decoded using a secret key (mysecretkey).

Middleware functions read and decode the token to authorize or enrich requests.

---

🔍 URL Analytics
Each short URL tracks:

Number of clicks

Visit timestamps

This is stored in the visitHistory array in each URL document.

---

📄 License:-
This project is open-source and free to use for learning or commercial projects.


🙋‍♂️ Author
Built by 💙 by Anant Bhardwaj

