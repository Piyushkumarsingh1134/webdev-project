console.log("hello");
const API_KEY = "a5f8007cc22dbad392f35642609c80bb";
function renderweatherInfo(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    document.body.appendChild(newPara);
}
async function showWeather() {
    try {
        let city = "Siwan";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        console.log("weather data:", data);
        
        renderweatherInfo(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

async function getCustomweatherdeatils() {
    try {
        let latitude = 18.33;
        let longitude = 22.23;
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const data = await result.json();
        console.log("Custom weather data:", data);
        // Further processing if needed
    } catch (error) {
        console.error("Error fetching custom weather data:", error); 
    }
}



