async function fetchData() {
  try {
    const locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=48152`);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&units=imperial&appid=48ac09a0f305b4b4d18c22b2a4822899`,
    );

    if (!response.ok) {
      throw new Error(
        `Error in fetching data. Status code: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(data);

    // const weather = (document.getElementById(
    //   "weather_information",
    // ).textContent = JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

fetchData();
