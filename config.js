document.addEventListener("DOMContentLoaded", function () {
    // Mostrar hora
    function actualizarHora() {
        const ahora = new Date();
        const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fecha = ahora.toLocaleDateString('es-CL', opcionesFecha);
        const hora = ahora.toLocaleTimeString('es-CL');
        const contenedor = document.getElementById('reloj');
        if (contenedor) {
            contenedor.textContent = `${fecha} - ${hora}`;
        }
    }

    setInterval(actualizarHora, 1000);
    actualizarHora();

    // Detectar la sección actual
    const ruta = window.location.pathname.toLowerCase();
    let seccionActual = "";
    if (ruta.includes("deportes")) {
        seccionActual = "deportes";
    } else if (ruta.includes("mundial")) {
        seccionActual = "mundial";
    } else if (ruta.includes("finanzas")) {
        seccionActual = "finanzas";
    }

    // Mostrar artículos guardados según la sección
    const contenedor = document.querySelector(".content-principal");
    const articulos = JSON.parse(localStorage.getItem("articulos")) || [];

    articulos.forEach(art => {
        if (art.seccion === seccionActual) {
            const nuevo = document.createElement("article");

            const h1 = document.createElement("h1");
            h1.textContent = art.titulo;

            const p = document.createElement("p");
            p.textContent = art.contenido;

            nuevo.appendChild(h1);
            nuevo.appendChild(p);

            contenedor.appendChild(nuevo);
        }
    });

    // Actualizar contador
    const cantidadArticulos = document.querySelectorAll("article").length;
    const contador = document.createElement("div");
    contador.textContent = `📰 ${cantidadArticulos} artículo${cantidadArticulos !== 1 ? 's' : ''}`;
    contador.classList.add("contador-articulos");

    const wrapper = document.querySelector(".contador-articulos-wrapper");
    if (wrapper) {
        wrapper.innerHTML = "";
        wrapper.appendChild(contador);
    }

    // Manejar envío del formulario de artículos
    const btnAgregar = document.getElementById("btn-agregar");
    if (btnAgregar) {
        btnAgregar.addEventListener("click", function () {
            const titulo = document.getElementById("titulo-nuevo").value.trim();
            const contenido = document.getElementById("contenido-nuevo").value.trim();
            const seccion = document.getElementById("seccion-articulo").value;

            if (titulo && contenido) {
                const nuevoArticulo = {
                    titulo,
                    contenido,
                    seccion,
                    fecha: new Date().toISOString()
                };

                const articulos = JSON.parse(localStorage.getItem("articulos")) || [];
                articulos.push(nuevoArticulo);
                localStorage.setItem("articulos", JSON.stringify(articulos));

                // Limpiar
                document.getElementById("titulo-nuevo").value = "";
                document.getElementById("contenido-nuevo").value = "";

                alert("Artículo agregado correctamente. Ve a la sección seleccionada para verlo.");
            } else {
                alert("Por favor completa todos los campos.");
            }
        });
    }

    // Manejar envío del formulario de contacto
    const btnContacto = document.getElementById("btn-enviar-contacto");
    if (btnContacto) {
        btnContacto.addEventListener("click", function () {
            const nombre = document.getElementById("nombre-contacto").value.trim();
            const mensaje = document.getElementById("mensaje-contacto").value.trim();

            if (nombre && mensaje) {
                alert(`Gracias por tu mensaje, ${nombre}. ¡Nos pondremos en contacto pronto!`);
                document.getElementById("nombre-contacto").value = "";
                document.getElementById("mensaje-contacto").value = "";
            } else {
                alert("Por favor completa ambos campos.");
            }
        });
    }
});
