let url = "assets/js/datos.json";
const ctx = document.getElementById("myChart");

const fetchData = async () => {
  try {
    const response = await fetch(url);
    const datapoint = await response.json();

    return datapoint;
  } catch (error) {
    console.log(error);
  }
};

const prepararConfiguracionParaLaGrafica = (datapoint) => {
 
  const tipoDeGrafica = "line";
  const title = datapoint.nombre;
  const border = 'rgba(255, 99, 132, 1)';
  const fecha = datapoint.serie.map((x) => x.fecha.slice(0,10));
  const valores = datapoint.serie.map((x) => x.valor);

  // Creamos el objeto de configuración usando las variables anteriores
  const config = {
    type: tipoDeGrafica,
    responsive: true,
    data: {
      labels: fecha.reverse(),
      datasets: [
        {
          label: `Historico Mensual ${title}`,
          borderColor: border,
          backgroundColor: border,
          data: valores.reverse(),
        },
      ],
    },
  };
  // console.log(config);
  return config;
};

const renderGrafica = async () =>{
  try {
    const datapoint = await fetchData();
    const config = prepararConfiguracionParaLaGrafica(datapoint);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
  } catch (error) {
    console.log(error);
  }
}
renderGrafica();
