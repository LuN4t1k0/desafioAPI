let opt = document.querySelector("#valores");
let txt = document.querySelector("#txtIngreso");
let result = document.querySelector("#resultado");
let btn = document.querySelector("#btn");

const urlAPI = "https://mindicador.cl/api";
const arr = [];
let arr2 = [];
let filtroDelFiltro = [];

/**
 * Obtiene los datos de la API, los convierte a JSON y devuelve los datos
 * @returns the monedas variable.
 */
const getMonedas = async () => {
  try {
    const res = await fetch(urlAPI);
    const monedas = await res.json();
    return monedas;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Obtiene datos de la API mindicador.cl y luego registra los datos en la consola
 * @param indicador - El nombre del indicador para el que desea obtener datos.
 */
const getMonedasParaGrafico = async (indicador) => {
  try {
    const res = await fetch(`https://mindicador.cl/api/${indicador}`);
    const monedasGrafico = await res.json();
    console.log(monedasGrafico);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Toma un objeto moneda como argumento y devuelve una cadena de HTML que contiene un elemento de
 * opción con el valor y contenido de texto del objeto moneda
 * @param moneda - Este es el objeto que contiene los datos que queremos usar en la plantilla.
 * @returns Se devuelve la función de plantilla.
 */
const template = (moneda) => {
  return (html = /*html*/ `
  <option value=${moneda.valor}>${moneda.codigo}</option>
  `);
};

/**
 * Filtra los datos de la API y devuelve una matriz de objetos con los datos filtrados.
 * @returns Una matriz de objetos.
 */
const filtrarDato = async () => {
  try {
    const monedas = await getMonedas();

    for (let moneda in monedas) {
      arr.push({
        codigo: monedas[moneda].codigo,
        nombre: monedas[moneda].nombre,
        unidad_medida: monedas[moneda].unidad_medida,
        fecha: monedas[moneda].fecha,
        valor: monedas[moneda].valor,
      });
    }
    arr2 = arr.filter((x) => x.codigo != undefined);
    filtroDelFiltro = arr2.filter((x) => x.unidad_medida != "Porcentaje");
    
    return filtroDelFiltro;
  
  } catch (error) {
    console.log(error);
  }
};

/**
 * Toma los datos de la API, los filtra y luego los presenta al DOM
 */
const renderMonedas = async () => {
  try {
    let filtro = await filtrarDato();
    console.log(filtro);
    let html = "";
    filtro.forEach((f) => {
      html += template(f);
    });
    opt.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
};


/**
 * Toma el valor de la opción seleccionada en el menú desplegable, lo multiplica por el valor del campo
 * de entrada y muestra el resultado en el elemento de párrafo
 */
const calcular = () => {
  let unidad = opt.value;
  let monedaLocal = txt.value;
  let resultado = monedaLocal * unidad;
  result.innerHTML = Math.round(resultado);
};


const graficar = async() => {

}

const calculdarValor = async () => {
  try {

    let txtResultado = opt.options[opt.selectedIndex].text;

    let consultaApi = await getMonedasParaGrafico(txtResultado);

    return consultaApi;
  } catch (error) {
    console.log(error);
  }
};



renderMonedas();

btn.addEventListener("click", calcular);
