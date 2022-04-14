const express = require('express');
const ProductosApi = require('./api/productos');
const app = express();

app.set('views', 'pug/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productosApi = new ProductosApi();

app.get('/', (req, res) => {
  res.render('layouts/main');
});

app.get('/productos', async (req, res) => {
  const productos = await productosApi.listarAll();
  console.log(`Listando Productos: `);
  console.log(productos);
  res.render('layouts/productos', {
    productos: productos,
    layout: 'productos',
  });
});

app.post('/productos', async (req, res) => {
  const producto = await productosApi.guardar(req.body);
  res.redirect('/');
});

const server = app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
server.on('error', (err) => {
  console.log(err);
});
