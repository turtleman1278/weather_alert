const zipCode = document.getElementById("zip_code"); 
const zipBtn = document.getElementById('btn-zip');
const info = document.getElementById('weather_information');

async function fetchData(zip) {

  try {
    if(!zip) {
        info.textContent = "Please enter a zip code. "
        return;
    }

    const locationResponse = await fetch(`/api/weather?zip=${zip}`);
    const geoData = await locationResponse.json();
    

    if (!locationResponse.ok) {
      throw new Error(
        `Error in fetching data. Status code: ${locationResponse.status} ${locationResponse.statusText}`,
      );
    }

    info.innerHTML = `
    <h2>${geoData.location.name}</h2>
    <p>Temp: ${geoData.current.main.temp} F</p>
    <p>Condition: ${geoData.current.weather[0].description}</p>
    `;


  } catch (error) {
    console.error(error);
  }
}

zipBtn.addEventListener('click', () => {
    fetchData(zipCode.value);
});

