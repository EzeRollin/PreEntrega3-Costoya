let productos = [];
let resultadosVisibles = false; 

class Producto {
  constructor(marca, modelo, precio, cantidad) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    console.log(`Producto creado: ${JSON.stringify(this)}`);
  }

  total() {
    return this.precio * this.cantidad;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Documento cargado y listo.');
  cargarProductos();

  document.getElementById('agregar').addEventListener('click', () => {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    console.log(`Datos capturados: marca: ${marca}, modelo: ${modelo}, Precio: ${precio}, Cantidad: ${cantidad}`);

    if (marca && modelo && precio && cantidad) {
      const producto = new Producto(marca, modelo, precio, cantidad);
      productos.push(producto);
      guardarProductos();
      mostrarProductos();
      limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });

  document.getElementById('filtrar-marca').addEventListener('click', () => {
    const filtromarca = document.getElementById('filtro-marca').value.toLowerCase();
    console.log(`Filtro por marca aplicado: ${filtromarca}`);
    mostrarProductos(filtrarPormarca(filtromarca));
  });

  document.getElementById('filtrar-modelo').addEventListener('click', () => {
    const filtromodelo = document.getElementById('filtro-modelo').value.toLowerCase();
    console.log(`Filtro por modelo aplicado: ${filtromodelo}`);
    mostrarProductos(filtrarPormodelo(filtromodelo));
  });

  document.getElementById('mostrar-todos').addEventListener('click', () => {
    if (resultadosVisibles) {
      ocultarProductos();
    } else {
      mostrarProductos();
    }
  });
});

function cargarProductos() {
  const totalProductos = parseInt(localStorage.getItem('totalProductos')) || 0;
  productos = [];
  for (let i = 0; i < totalProductos; i++) {
    const marca = localStorage.getItem(`producto_${i}_marca`);
    const modelo = localStorage.getItem(`producto_${i}_modelo`);
    const precio = localStorage.getItem(`producto_${i}_precio`);
    const cantidad = localStorage.getItem(`producto_${i}_cantidad`);
    if (marca && modelo && precio && cantidad) {
      productos.push(new Producto(marca, modelo, precio, cantidad));
    }
  }
  console.log('Productos cargados desde localStorage:', productos);
}

function guardarProductos() {
  localStorage.setItem('totalProductos', productos.length);
  productos.forEach((producto, index) => {
    localStorage.setItem(`producto_${index}_marca`, producto.marca);
    localStorage.setItem(`producto_${index}_modelo`, producto.modelo);
    localStorage.setItem(`producto_${index}_precio`, producto.precio);
    localStorage.setItem(`producto_${index}_cantidad`, producto.cantidad);
  });
  console.log('Productos guardados en localStorage:', productos);
}

function mostrarProductos(filtrados = null) {
  const lista = document.getElementById('lista-botines');
  lista.innerHTML = '';
  const productosAMostrar = filtrados || productos;
  let totalCompra = 0;

  productosAMostrar.forEach((producto, index) => {
    const item = document.createElement('lista-botines');
    item.classList.add('product-item');
    item.textContent = `${index + 1}. Álbum: ${producto.marca}, modelo: ${producto.modelo}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}, Total: ${producto.total()} ARS`;
    lista.appendChild(item);
    totalCompra += producto.total();
  });

  document.getElementById('total-compra').textContent = `Total de la compra: ${totalCompra} ARS`;

  resultadosVisibles = true; 
  console.log('Productos mostrados:', productosAMostrar);
  console.log('Total de la compra:', totalCompra);
}

function ocultarProductos() {
  document.getElementById('lista-botines').innerHTML = '';
  document.getElementById('total-compra').textContent = '';
  resultadosVisibles = false;
  console.log('Productos ocultados.');
}

function filtrarPormarca(marca) {
  const resultados = productos.filter(producto => producto.marca.toLowerCase().includes(marca));
  console.log(`Resultados del filtro por marca (${marca}):`, resultados);
  return resultados;
}

function filtrarPormodelo(modelo) {
  const resultados = productos.filter(producto => producto.modelo.toLowerCase().includes(modelo));
  console.log(`Resultados del filtro por modelo (${modelo}):`, resultados);
  return resultados;
}

function limpiarFormulario() {
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('cantidad').value = '';
  console.log('Formulario vacío.');
}