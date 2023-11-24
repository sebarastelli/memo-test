let turnos = 0;
let primerCarta = null;
const tablero = document.querySelector("#tablero");
const cuadros = tablero.querySelectorAll(".cuadroJuego");
const final = document.querySelector("#mensajeFinal")
const anana = ["./img/anana.jpg", "anana"];
const banana = ["./img/banana.jpg", "banana"];
const cereza = ["./img/cereza.jpg", "cereza"];
const kiwi = ["./img/kiwi.jpg", "kiwi"];
const manzana = ["./img/manzana.jpg", "manzana"];
const uva = ["./img/uva.jpg", "uva"];



function configurarJuego(){
    const imagenesBase = [anana, banana, cereza, kiwi, manzana, uva];
    const frutas = imagenesBase.concat(imagenesBase);
    configurarCuadros(cuadros, frutas);
    manejarEvento(tablero);
}

function manejarEvento(tablero){
    tablero.addEventListener('click', (e) => {
        const seleccion = e.target.closest(".cuadroJuego");
        if (seleccion) {
            manejarClick(seleccion);
        }
    });
}

function configurarCuadros(cuadros, frutas){
    
    const random = frutas.sort(function(){
        return 0.5 - Math.random();
    })
    
    cuadros.forEach(function (cuadro, i) {
        let crearImg = document.createElement("img");
        crearImg.setAttribute("src", random[i][0]);
        cuadro.appendChild(crearImg);
        
    });
    console.log(cuadros)
    }

    function manejarClick(seleccion){
        mostrarCuadro(seleccion);

        if (primerCarta === null) {
            primerCarta = seleccion;
        } else {
            if (cuadrosIguales(primerCarta, seleccion)) {
                eliminarCuadro(primerCarta);
                eliminarCuadro(seleccion);
            } else {
                borrarCuadro(primerCarta);
                borrarCuadro(seleccion);
            }
    
            primerCarta = null;
        }

        turnos++
    }

    function borrarCuadro(cuadroABorrar){
        const imagen = cuadroABorrar.querySelector("img");
        setTimeout(function(){
            imagen.style.opacity = 0
        }, 500);
        
    }

    function eliminarCuadro(cuadroAEliminar){
        const imagen = cuadroAEliminar.querySelector("img");
        setTimeout(function(){
            cuadroAEliminar.parentElement.classList.add("completo")
            imagen.remove();
            validarJuego();
        }, 1000);
        
    }

    function cuadrosIguales(cuadro1, cuadro2){
        const imagen1 = cuadro1.querySelector("img");
        const imagen2 = cuadro2.querySelector("img");
        if(imagen1.getAttribute("src") === imagen2.getAttribute("src")){
            console.log("true")
            return true

        }
        else{
            console.log("false")
            return false
        }
    }

    function mostrarCuadro(seleccion){
        const imagen = seleccion.querySelector("img");
        imagen.style.opacity = 1;
    }

    function validarJuego(){
        const cuadrosCompletos = document.querySelectorAll('.completo');
        if (cuadrosCompletos.length === cuadros.length) {
            final.style.display = "block";
            final.innerText = `Juego terminado, te llevo ${turnos/2} rondas completarlo 👏`
        }
    }

configurarJuego();