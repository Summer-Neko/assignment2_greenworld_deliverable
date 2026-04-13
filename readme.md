
# Green World - Sustainable E-Shop 

A dynamic e-commerce platform built for COMP 7780. It features a user-facing product catalog with a local-storage shopping cart and an admin dashboard for inventory management.

## 🛠 Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Docker](https://www.docker.com/) (Optional, for database containerization)

## Quick Start

**1. Database Setup (Choose A or B)**
* **Option A: Using Docker**
    Spin up the pre-configured MySQL container:
    ```bash
    docker-compose up -d
    ```
* **Option B: Using Local MySQL**
    If you prefer to use your own local MySQL installation, please ensure it is running on port `3306` and create the following credentials before proceeding:
    * Database: `comp7780`
    * User: `user99`
    * Password: `user99`

**2. Install Dependencies**
Install the required Node packages (Express, MySQL2, Multer):
```bash
npm install express mysql2 multer
```

**3. Initialize Database**
Create the necessary tables (`products`, `orders`) and seed the initial inventory:
```bash
node seed.js
```

**4. Run the Server**
Start the backend web server:
```bash
node index.js
```
The application will be running at `http://localhost:3000`.
If you want to borwse the Admin page, use `http://localhost:3000/admin`

## Project Structure
- `/public`: Contains static assets (CSS, images). Uploaded product images are saved to `/public/assets`.
- `comp7780_home.html`: Landing page.
- `comp7780_product.html`: Dynamic product catalog and interactive cart.
- `admin.html`: Dashboard for adding/deleting inventory and viewing orders.
- `index.js`: Main Express application and API routes.
- `connect.js`: Test SQL connection
