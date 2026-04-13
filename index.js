const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const pool = mysql.createPool({
    host: 'localhost', user: 'user99', password: 'user99', database: 'comp7780'
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/assets';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 路由
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "comp7780_home.html")));
app.get('/product', (req, res) => res.sendFile(path.join(__dirname, "comp7780_product.html")));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, "admin.html")));

// API: 获取商品
app.get('/api/products', (req, res) => {
    pool.query('SELECT * FROM products', (err, results) => res.json(results));
});

// API: 添加商品 (后台)
app.post('/api/products', upload.single('productImage'), (req, res) => {
    const { name, price, description, stock } = req.body;
    const img = req.file ? `/assets/${req.file.filename}` : '/assets/default.avif';
    pool.query('INSERT INTO products (name, price, description, image_url, stock) VALUES (?,?,?,?,?)', 
    [name, price, description, img, stock], () => res.json({ success: true }));
});

// API: 删除商品 (后台)
app.delete('/api/products/:id', (req, res) => {
    pool.query('DELETE FROM products WHERE id = ?', [req.params.id], () => res.json({ success: true }));
});

// API: 获取订单 (后台)
app.get('/api/admin/orders', (req, res) => {
    pool.query('SELECT * FROM orders ORDER BY created_at DESC', (err, reslt) => res.json(reslt));
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running at http://localhost:3000');
});