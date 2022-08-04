/* Declaración de variables. */
let opt = document.querySelector("#monedas");
let txt = document.querySelector("#txtMonedaLocal");
let result = document.querySelector("#txtResult");
let btn = document.querySelector("#calcular");
const ctx = document.getElementById("myChart");
let myChart 
const urlApi = "https://mindicador.cl/api";
const arr = [];
let filterArr = [];

/**
 * Obtiene datos de la API y los devuelve en formato JSON
 * @returns el objeto de las monedas.
 */
const fetchData = async () => {
  try {
    const res = await fetch(urlApi);
    const coins = await res.json();
    return coins;
  } catch (error) {
    console.err(error);
  }
};

/**
 * Obtiene datos de una API, los filtra y devuelve los datos filtrados
 * @returns Una matriz de objetos.
 */
const filterData = async () => {
  try {
    const coins = await fetchData();
    for (const coin in coins) {
      arr.push(coins[coin]);
    }
    filterArr = arr.filter(
      (x) => x.codigo != undefined && x.unidad_medida != "Porcentaje"
    );
    return filterArr;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Toma un objeto como argumento y devuelve una cadena de HTML
 * @param coins - El objeto que contiene los datos que se usarán para llenar la plantilla.
 * @returns Se devuelve la función de plantilla.
 */
const template = (coins) => {
  return /*html*/ `
  <option value=${coins.valor}>${coins.codigo}</option>`;
};

/**
 * Toma los datos de la API, los filtra y luego los presenta al DOM
 */
const coinsRender = async () => {
  try {
    let filter = await filterData();
    let html = "";
    filter.forEach((x) => {
      html += template(x);
    });
    opt.innerHTML = html;
    // console.log(filter);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Toma el valor de la moneda seleccionada en el menú desplegable, lo multiplica por el valor del campo
 * de entrada y luego muestra el resultado en el resultado div
 */
const convertCurrencies = () => {
  let currency = opt.value;
  let localCurrency = txt.value;
  let total = localCurrency * currency;
  let clp = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  }).format(total);
  result.innerHTML = `CLP ${clp}`;
  // console.log(clp);
};

/**
 * Obtiene datos de la API y los devuelve en formato JSON
 * @param indicator - El indicador para el que desea obtener datos.
 * @returns los datos de la API.
 */
const fetchDataForGraphic = async (indicator) => {
  try {
    const res = await fetch(`${urlApi}/${indicator}`);
    const currecie = await res.json();
    // console.log(currecie);
    return currecie;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Toma un objeto de moneda y devuelve un objeto de configuración para un gráfico
 * @param currencie - El objeto que contiene los datos que se van a mostrar.
 * @returns un objeto con las propiedades type, responsive, data y datasets.
 */
const prepareDataAndConfigurations = (currencie) => {
  const type = "line";
  const title = currencie.nombre;
  const border = "rgba(255, 99, 132, 1)";
  const date = currencie.serie.map((x) => x.fecha.slice(0, 10));
  const data = currencie.serie.map((x) => x.valor);

  const config = {
    type: type,
    responsive: true,
    data: {
      labels: date.reverse(),
      datasets: [
        {
          label: `Historico Mensual ${title}`,
          borderColor: border,
          backgroundColor: border,
          data: data.reverse(),
        },
      ],
    },
  };
  return config;
};


/**
 * Obtiene los datos de la API, prepara los datos y las configuraciones para el gráfico y luego
 * representa el gráfico
 */
const graphicRender = async () => {
  
  const parameter2 = opt.options[opt.selectedIndex].text; 
  const indicador = await fetchDataForGraphic(parameter2);
  console.log(indicador);
  const config = prepareDataAndConfigurations(indicador)
  console.log(config);
  
  if(myChart){
    myChart.destroy()
  }
  myChart = new Chart(ctx, config);
  
}

coinsRender();
btn.addEventListener("click", convertCurrencies);
opt.addEventListener('change',graphicRender)
