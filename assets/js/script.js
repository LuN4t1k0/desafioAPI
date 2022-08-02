let opt = document.querySelector("#valores");
let txt = document.querySelector("#txtIngreso");
let result = document.querySelector("#resultado");
let btn = document.querySelector("#btn");

const urlAPI = "https://mindicador.cl/api";
const arr = [];
let arr2 = [];
let filtroDelFiltro = [];

const getMonedas = async () => {
  try {
    const res = await fetch(urlAPI);
    const monedas = await res.json();
    return monedas;
  } catch (error) {
    console.log(error);
  }
};

const template = (moneda) => {
  return (html = /*html*/ `
  <option value=${moneda.valor}>${moneda.codigo}</option>
  `);
};

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

const getMonedasParaGrafico = async (indicador) => {
  try {
    const res = await fetch(`https://mindicador.cl/api/${indicador}`);
    const monedasGrafico = await res.json();
    console.log(monedasGrafico);
  } catch (error) {
    console.log(error);
  }
};

// const calcular = () => {
//   let unidad = opt.value;
//   let monedaLocal = txt.value;
//   let resultado = monedaLocal * unidad;
//   result.innerHTML = Math.round(resultado);
// };

const calculdarValor = async () => {
  try {
    let unidad = opt.value;
    let monedaLocal = txt.value;
    let resultado = monedaLocal * unidad;
    result.innerHTML = Math.round(resultado);
    let txtResultado = opt.options[opt.selectedIndex].text;

    let consultaApi = await getMonedasParaGrafico(txtResultado);

    return consultaApi;
  } catch (error) {
    console.log(error);
  }
};

// const prueba = async () => {
//   let graficar = await getMonedasParaGrafico();
//   console.log(graficar);
// };

renderMonedas();

btn.addEventListener("click", calculdarValor);
