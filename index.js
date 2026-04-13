var express = require('express');
var path = require('path');
var app = express();

// 核心：托管 public 文件夹下的静态资源 (CSS, 图像等)
app.use(express.static('public'));

// 路由：访问根目录 '/' 时，返回主页 HTML
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "comp7780_home.html"));
});

// 路由：访问 '/product' 时，返回产品页 HTML
app.get('/product', function(req, res) {
    res.sendFile(path.join(__dirname, "comp7780_product.html"));
});

// 为 Cycle 3 预留的接口
app.get('/cart', function(req, res) {
    res.send("Add Cart - Next step: Need MySQL integration!");
});

app.get('/check_out', function(req, res) {
    res.send("Check Out - Next step: Need MySQL integration!");
});

// 监听端口 (根据老师文档，端口用 3000 或默认的 80)
const PORT = 3000;
app.listen(PORT, function() {
    console.log(`NexusSix Web Server listening on http://localhost:${PORT}/`);
});

console.log('Server is running...');
