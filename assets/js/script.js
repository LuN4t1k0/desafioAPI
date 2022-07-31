let opt = document.querySelector("#valores");
let h1 = document.querySelector("#prueba");
inputValor = document.querySelector("#txtIngreso");
const urlAPI = "https://mindicador.cl/api";
const arr = [];
let arr2 = [];
let filtroDelFiltro = []

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
    filtroDelFiltro = arr2.filter(x => x.unidad_medida != "Porcentaje")
    return filtroDelFiltro
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
    h1.innerHTML = "HOla mundo";
  } catch (error) {
    console.log(error);
  }
};

renderMonedas();
