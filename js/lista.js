let peliculas = [];
          
          window.onload = function() {
              fetch('https://japceibal.github.io/japflix_api/movies-data.json')
                  .then(response => response.json())
                  .then(data => {
                      peliculas = data;
                  });
          }

document.getElementById('btnBuscar').addEventListener('click', function() {
    const terminoBusqueda = document.getElementById('inputBuscar').value.toLowerCase();
    if(terminoBusqueda == ""){
        alert("Ingrese un valor");
    } else{
    const resultados = peliculas.filter(pelicula => {
        return pelicula.title.toLowerCase().includes(terminoBusqueda) ||
            pelicula.genres.some(genre => genre.name.toLowerCase().includes(terminoBusqueda)) ||
            pelicula.tagline.toLowerCase().includes(terminoBusqueda) ||
            pelicula.overview.toLowerCase().includes(terminoBusqueda);
    });

    mostrarResultados(resultados);
    }
});

function mostrarResultados(resultados) {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; 
    resultados.forEach(pelicula => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <strong>${pelicula.title}</strong>
            <p>${pelicula.tagline}</p>
            <p>Rating: ${generateStars(pelicula.vote_average)}</p>
        `;
        lista.appendChild(item);
    });
}

// Creamos la función que detecta el número de estrelas y las muestra en pantalla
  function generateStars(score) {
    let stars = '';
    for(let i = 1; i <= 10; i++) {
        if(i <= score) {
            stars += '<span class="fa fa-star checked"></span>';
        } else {
            stars += '<span class="fa fa-star"></span>';
        }
    }
    return stars;
}

//Creamos la función que devuelve información de la película para el contenedor superior
function obtenerInformacion(pelicula) {
    const titulo = pelicula.title;
    const generos = pelicula.genres.map(genre => genre.name).join(', ');
    const descripcion = pelicula.overview;

    // Obtén el elemento del offcanvas por su ID
    let offcanvas = document.getElementById("offcanvas");

    let fechaEstreno = pelicula.release_date;
    let fecha = new Date(fechaEstreno);
    let anio = fecha.getFullYear();
    console.log(anio);

    // Configura el contenido del offcanvas
    offcanvas.innerHTML = `
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">${titulo}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <div class="offcanvas-body">
            <p> ${descripcion}</p>
            <hr>
            <p> ${generos}</p>
           
        <div class="dropdown-center">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            More
        </button>
        <ul class="dropdown-menu">
            <li class="dropdown-item">Year: ${anio}</li>
            <li class="dropdown-item">Runtime: ${pelicula.runtime} mins</li>
            <li class="dropdown-item"> Budget: $ ${pelicula.budget}</li>
            <li class="dropdown-item">Revenue: $ ${pelicula.revenue}</li>
        </ul>
        </div>
        </div>
    `;

        //Muestra el offcanvas
        let myOffcanvas = new bootstrap.Offcanvas(offcanvas);
        myOffcanvas.show();
        
}


    const lista = document.getElementById('lista');
    
    lista.addEventListener("click", function(event) {
        // Verificar que el clic ocurrió en un elemento de la lista
        if (event.target.tagName === 'LI') {
            const tituloPelicula = event.target.querySelector('strong').textContent;
            const peliculaSeleccionada = peliculas.find(pelicula => pelicula.title === tituloPelicula);
            if (peliculaSeleccionada) {
                obtenerInformacion(peliculaSeleccionada);
            }
        }
    });