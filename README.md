# Item Tracker Demo

A lightweight, zero-dependency web application built to demonstrate fundamental full-stack architecture.

## 📂 Project Structure

```text
├── index.html       # The frontend and UI
└── server.js        # JS backend
```

Getting Started
Prerequisites
Node.js installed on your machine.

1. Setup the Backend
Clone the repository and navigate into the project directory.

Start the backend server:

Bash
```text
node server.js
```
The server will run on http://localhost:3000.

2. Setup the Frontend
Because the frontend uses ES Modules (<script type="module">), it must be served over HTTP, not via the local file:/// protocol.

You can serve it using any simple static server. For example, open a second terminal in the project directory and run:

Bash
```text
npx serve -l 5000
```
Then, open your browser and navigate to http://localhost:5000.