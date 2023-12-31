let cantidadDeGoles = 0;
let cantidadDeAtajadas = 0;
let penalesTirados = 0;
const maxPenales = 5;

/* var arrayMessi = new Array();
var arrayArquero = new Array(); */

const arrayMessi = [];
const arrayArquero = [];

class Persona {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    presentacion() {
        return `Hoy veremos en la final del mundial a: ${this.nombre} ${this.apellido}`;
    }
    presentacion2() {
        return `vs el gran arquero: ${this.nombre} ${this.apellido}`;
    }
}

const persona1 = new Persona("Lionel", "Messi");
const persona2 = new Persona("Emiliano", "Martinez");

const resultadoMessi = persona1.presentacion();
const resultadoDibu = persona2.presentacion2();

const resultadoMessiElement = document.getElementById('resultadoMessi');
const resultadoDibuElement = document.getElementById('resultadoDibu');

resultadoMessiElement.textContent = resultadoMessi;
resultadoDibuElement.textContent = resultadoDibu;

const penalesForm = document.getElementById('penalesForm');
const resultadosDiv = document.getElementById('resultados');
const agregarPenalBoton = document.getElementById('agregarPenal');

if (localStorage.getItem('arrayMessi') && localStorage.getItem('arrayArquero')) {
    const storedMessi = JSON.parse(localStorage.getItem('arrayMessi'));
    const storedArquero = JSON.parse(localStorage.getItem('arrayArquero'));
    arrayMessi.push(...storedMessi);
    arrayArquero.push(...storedArquero);
}

agregarPenalBoton.addEventListener('click', function () {
    if (penalesTirados < maxPenales) {
        const ladoMessi = parseInt(document.getElementById('ladoMessi').value);
        const ladoArquero = parseInt(document.getElementById('ladoArquero').value);
        const potenciaMessi = parseInt(document.getElementById('potenciaMessi').value);
        const potenciaArquero = parseInt(document.getElementById('potenciaArquero').value);

        const penal = {
            nombre: "Messi",
            potencia: potenciaMessi,
            lado: ladoMessi
        };

        const arquero = {
            nombre: "Arquero",
            potencia: potenciaArquero,
            lado: ladoArquero
        };

        arrayMessi.push(penal);
        arrayArquero.push(arquero);

        mostrarResultado(`Penal: ${arrayMessi.length}, Resultado: ${calcularResultado(penal, arquero)}<br>`);

        document.getElementById('ladoMessi').value = '';
        document.getElementById('ladoArquero').value = '';
        document.getElementById('potenciaMessi').value = '';
        document.getElementById('potenciaArquero').value = '';

        penalesTirados++;

        if (penalesTirados === maxPenales) {
            agregarPenalBoton.disabled = true;
            mostrarResultado("<strong>Final de la tanda</strong><br>");
        }
    }
});

function calcularResultado(penal, arquero) {
    if (penal.lado == 7) {
        cantidadDeAtajadas += 1;
        return `Messi la tiro afuera :C <br><img src='./assets/atajada.jpg' class="atajada">`;
    } else if (penal.lado != arquero.lado) {
        cantidadDeGoles += 1;
        return `GOOOL DE MESSI <br><img src='./assets/golMessi.jpg' class="gol">`;
    } else if (penal.lado == arquero.lado) {
        if (penal.potencia > arquero.potencia) {
            cantidadDeGoles += 1;
            return `GOOOL DE MESSI - Messi: ${penal.potencia}, Arquero: ${arquero.potencia}<br><img src='./assets/golMessi.jpg' class="gol">`;
        } else {
            cantidadDeAtajadas += 1;
            return `LA ATAJO EL ARQUERO - Messi: ${penal.potencia}, Arquero: ${arquero.potencia}<br><img src='./assets/atajada.jpg' class="atajada">`;
        }
    }
}

function mostrarResultado(texto) {
    resultadosDiv.innerHTML += texto;
}

function guardarEnLocalStorage() {
    localStorage.setItem('arrayMessi', JSON.stringify(arrayMessi));
    localStorage.setItem('arrayArquero', JSON.stringify(arrayArquero));
}

const btn = document.querySelector('#myBtn')
btn.addEventListener('click', async () => {
    try {
        const response = await fetch('datos.json');
        if (response.ok) {
            const data = await response.json();
            mostrarDatosJSON(data);
        } else {
            console.error('Error al obtener datos JSON');
        }
    } catch (error) {
        console.error('Error en la solicitud: ', error);
    }

    Swal.fire({
        title: 'Comenzemos!',
        text: 'Dale campeón, Dale campeón',
        imageUrl: 'https://www.baenegocios.com/__export/1676737918154/sites/cronica/img/2023/02/15/messi_copa_del_mundo.jpg_1300447691.jpg',
        
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonText: ' Vamos Selección! '
    })
})

function mostrarDatosJSON(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '<h2>Datos JSON:</h2>';
    for (const item of data) {
        resultadosDiv.innerHTML += `<p>Nombre: ${item.nombre}, Potencia: ${item.potencia}, Lado: ${item.lado}</p>`;
    }
}

const btn2 = document.querySelector('#agregarPenal')
btn2.addEventListener('click', () => {

    Swal.fire({
        icon: 'success',
        title: 'Penal agregado!',
        showConfirmButton: false,
        timer: 1500
    })
    
})



const DateTime = luxon.DateTime

const diaHorario = DateTime.fromObject(
    {day: 18, hour: 14, month: 12, year: 2022},
    {zone: 'America/buenos_Aires', numberingSystem:'beng'})
    /* console.log(diaHorario.toString()) */

const resultadoDiv = document.getElementById('horario');
const resultadoText = document.createTextNode(diaHorario.toString());
resultadoDiv.appendChild(resultadoText);
