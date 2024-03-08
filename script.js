async function clickBtn() {
  let city = document.querySelector(".input-city").value;
  let data = await getCity(city);
  if(data) {
    getData(data);
  }
}

async function getCity(city) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=781e67f0283e3ca48996ff83793027a9&lang=pt_br&units=metric`);
    if (!response.ok) {
      throw new Error('Cidade não encontrada!');
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    alert('Cidade não encontrada!');
    return null;
  }
}

function getData(data) {
  document.querySelector(".city").innerHTML = "Tempo em " + data.name;
  document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°C";
  document.querySelector(".text-previsao").innerHTML = data.weather[0].description;
  document.querySelector(".umidade").innerHTML = "Umidade: " + data.main.humidity + "%";
  document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
