opt = document.querySelector("#valores");
inputValor = document.querySelector("#txtIngreso");
const urlAPI = "https://mindicador.cl/api";
const arr = [];
let arr2 = []

const getMonedas = async () => {
  try {
    const res = await fetch(urlAPI);
    const monedas = await res.json();
    console.log("monedas desde getMonedas");
    console.log(monedas);
    return monedas;
  } catch (error) {
    console.log(error);
  }
};

const template = () => {};

const filtrarDato = async () => {
  try {
    const monedas = await getMonedas();
    console.log("monedas desde filtroDatos");
    console.log(monedas);
    for (let moneda in monedas) {
      arr.push({
        codigo: monedas[moneda].codigo,
        nombre: monedas[moneda].nombre,
        unidad_medida: monedas[moneda].unidad_medida,
        fecha: monedas[moneda].fecha,
        valor: monedas[moneda].valor,
      });
    }
    arr2 = arr.filter(x => x.codigo != undefined)

    console.log("arr desde FiltrarDatos");
    console.log(arr2);
  } catch (error) {
    console.log(error);
  }
};

const renderMonedas = () => {};

getMonedas();
filtrarDato();
console.log("arr desde Fuera de todo");
console.log(arr);
console.log("arr2 desde Fuera de todo");
console.log(arr2);

