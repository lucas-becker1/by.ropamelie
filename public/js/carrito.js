let myModalEl = document.getElementById('exampleModal');
let deleteCart = document.getElementById("delete-cart");
let totaldiv = document.getElementById("total");
const deleteAllItems = () => {
  localStorage.clear();
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  showITems(productos);
  document.getElementById("cart-btn").innerHTML = `
          CARRITO (${productos.length}) <i class="fas fa-shopping-cart"></i>
        `;
}



const showITems = (productos) => {
  let html = "";
  let total = 0;

  productos.forEach((producto, index) => {
    total += producto.precio;
    html += `
      <div class="row text-center" id="carritoCompra${index}">
        <div class="col-3">
          ${producto.nombre}
        </div>
        <div class="col-3">
          $${producto.precio}
        </div>
        <div class="col-3">
          ${index + 1}
        </div>
        <div class="col-3">
          <button class="btn" id="button${index}"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
      
    `;
  });

  totaldiv.innerHTML = `$${total}`;
  document.getElementById('show-cart').innerHTML = html;

  //Borrar Items
  productos.forEach((producto, index) => {
    document.getElementById(`button${index}`).addEventListener('click', function () {
      document.getElementById(`carritoCompra${index}`).remove()
      document.getElementById("total").innerHTML = `$${total - producto.precio}`;
        productos.splice(index, 1)
        localStorage.removeItem('productos');
        localStorage.setItem("productos", JSON.stringify(productos));
        document.getElementById("cart-btn").innerHTML = `
          CARRITO (${productos.length}) <i class="fas fa-shopping-cart"></i>
        `;
      showITems(productos)
      if(productos.length === 0){
        deleteAllItems();
      }
    })
  })
}
// Vaciar el carrito
myModalEl.addEventListener('show.bs.modal', function () {
  deleteCart.addEventListener("click", deleteAllItems);
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  showITems(productos);
});

myModalEl.addEventListener('hidden.bs.modal', function () {
  deleteCart.removeEventListener("click", deleteAllItems);
});

//modal Close
$(() => {
  $('#exampleModal').modal({
    backdrop: 'static',
    keyboard: false
  }),
    $('#modal__close').click(function () {
      $('#exampleModal').modal('hide');
    })

  $('#modal-2').click(function () {
    if (localStorage.getItem("productos") === null || localStorage.setItem("productos", JSON.stringify([]))) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay datos para mostrar',
        footer: ''
      })
    }
    else {
      $('#exampleModal').modal('hide');

      Swal.fire(
        'Se realizo la compra con exito!',
        'Pronto nos comunicaremos con usted',
        'success'
      )
      deleteAllItems();
    }
  })
})