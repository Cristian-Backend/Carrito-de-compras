const carritoCompras = document.querySelector("#carrito")
const listaCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarritobtn = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")

let productosCarrito = [];

CargarAddEventListener();
function CargarAddEventListener() {  // funcion echa para todas las veces que agregemos al carrito.
listaCursos.addEventListener("click", agregarCarrito)

carritoCompras.addEventListener("click", eliminarCursos)


// vaciar carrito
vaciarCarritobtn.addEventListener("click", ()=>{
    productosCarrito = []; // reseteamos el arreglo
    carritoHTML();

})

}


function agregarCarrito(e){
    //verificamos las clases que tiene el boton.
e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
      const cursoSeleccionado = e.target.parentElement.parentElement; // buscamos el elemento padre.
      leerDatosDelCurso(cursoSeleccionado)
    }
}

// Lee el contenido del HTML al que le dimos click


function eliminarCursos(e){ 

if(e.target.classList.contains("borrar-curso")){
    const cursoId = e.target.getAttribute(`data-id`)
    // elimina del arreglo productosCarrito por el data-id
    productosCarrito = productosCarrito.filter(curso => curso.id !== cursoId)
    carritoHTML();
}
}




function leerDatosDelCurso(curso){


// creamos un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1

}








// revisa el elemento si ya existe en el carrito
const existe = productosCarrito.some(curso => curso.id === infoCurso.id);
if(existe){
    // actualizamos la cantidad
    const cursos = productosCarrito.map(curso =>{
        if (curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; // retorna el objeto actualizado
           
        } else {
            return curso; // retorna los objetos que no son los duplicados.
        }
    })
} else {
    productosCarrito = [...productosCarrito, infoCurso]
}



// Agregamos elementos al carrito , tambien se puede hacer con el push.

console.log(productosCarrito)

carritoHTML();

}

// mostrar el carrito de compras en el HTML

function carritoHTML(){
    eliminarCarrito();
    productosCarrito.forEach((curso)=>{
        const row = document.createElement("tr")
        row.innerHTML=`
        
        <td> <img src="${curso.imagen}"></td>
        <td> ${curso.titulo} </td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;

        listaCarrito.appendChild(row)

    })
}

function eliminarCarrito(){
    // forma lenta
   // listaCarrito.innerHTML = "";


    // forma rapida
    while(listaCarrito.firstChild)
    listaCarrito.removeChild(listaCarrito.firstChild)
}
