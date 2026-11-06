
// Seleccionar elementos del HTML
const lenguaje = document.getElementById("lenguaje");
const estado = document.getElementById("estado");
const repositorio = document.getElementById("repositorio");

const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const estrellas = document.getElementById("estrellas");
const forks = document.getElementById("forks");
const issues = document.getElementById("issues");

const refrescar = document.getElementById("refrescar");
const reintentar = document.getElementById("reintentar");


// Detectar cuando se selecciona un lenguaje
lenguaje.addEventListener("change", buscarRepositorio);


// Función para buscar repositorios
async function buscarRepositorio() {

    // Obtener el lenguaje seleccionado
    const seleccionado = lenguaje.value;

    // Si no hay lenguaje, mostrar el mensaje inicial
    if (seleccionado === "") {

        estado.textContent = "Selecciona un lenguaje para comenzar.";

        estado.className = "";

        repositorio.classList.add("oculto");
        refrescar.classList.add("oculto");
        reintentar.classList.add("oculto");

        return;
    }

    // Mostrar mensaje de carga
    estado.textContent = "Buscando repositorios...";

    estado.className = "cargando";

    repositorio.classList.add("oculto");
    refrescar.classList.add("oculto");
    reintentar.classList.add("oculto");


    try {

        // Consultar la API de GitHub
        const respuesta = await fetch(
            `https://api.github.com/search/repositories?q=language:${seleccionado}&per_page=100`
        );

        // Comprobar si hubo un error
        if (!respuesta.ok) {
            throw new Error("Error al buscar repositorios");
        }

        // Obtener los datos
        const datos = await respuesta.json();

        // Comprobar si hay resultados
        if (datos.items.length === 0) {

            estado.textContent = "No se encontraron repositorios.";

            estado.className = "";

            return;
        }

        // Elegir un repositorio aleatorio
        const posicion = Math.floor(Math.random() * datos.items.length);

        const repo = datos.items[posicion];


        // Mostrar los datos del repositorio
        nombre.textContent = repo.full_name;

        descripcion.textContent = repo.description || "Sin descripción";

        estrellas.textContent = repo.stargazers_count;

        forks.textContent = repo.forks_count;

        issues.textContent = repo.open_issues_count;


        // Mostrar la tarjeta
        repositorio.classList.remove("oculto");

        estado.className = "oculto";

        // Mostrar botón para buscar otro
        refrescar.classList.remove("oculto");


    } catch (error) {

        // Mostrar mensaje de error
        estado.textContent = "Error al cargar los repositorios. Intenta de nuevo.";

        estado.className = "error";

        // Mostrar botón para reintentar
        reintentar.classList.remove("oculto");

    }

}


// Botón para buscar otro repositorio
refrescar.addEventListener("click", buscarRepositorio);


// Botón para intentar nuevamente
reintentar.addEventListener("click", buscarRepositorio);
