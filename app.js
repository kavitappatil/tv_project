window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        long = position.coords.longitude;
        lat = position.coords.latitude;

        //long = -77.0364;
        //lat = 38.8951;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
    
   fetch(api) .then(response=> {
         console.log(response.json());
         return response.json();

     }) .then(data=> {
         const {temperature, summary, icon} = data.currently;
         temperatureDegree.textContent=summary;
         temperatureDescription.textContent = summary;
         locationTimezone.textContent=data.timezone;
    
         //formula for celsius
         let celsius = (temperature - 32) * (5/9);

         //set Icon
         setIcons(icon, document.querySelector(".icon"));

         //change temperature to celsius/farenheit
        });
        if(temperatureSpan.textContent === "F"){
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
        }else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = temperature;
        }
 });
 }

 function setIcons(icon,iconID){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon];)
 }