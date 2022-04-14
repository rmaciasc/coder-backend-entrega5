const express = require('express');
const app = express();
const ProductosApi = require('../api/productos');

app.set('views', 'ejsEngine/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productosApi = new ProductosApi();

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/productos', async (req, res) => {
  const productos = await productosApi.listarAll();
  console.log(`Listando Productos: `);
  console.log(productos);
  res.render('pages/productos', { productos });
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
