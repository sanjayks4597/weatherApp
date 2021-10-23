const appConstants = {

    apiKey : "79d712ccff103ac908d624b2c053dbb4",
    baseUrl : "https://api.openweathermap.org/data/2.5/weather",
    unitc : "metric",
    unitf :"imperial",
    unknownVal : "NA",
    imageUrl : "https://openweathermap.org/img/wn/"

}

function celcius(event) 
{
    event.preventDefault();
    
    const location=document.querySelector('.search-box').value;
     const language=document.querySelector('.dropdown').value;

        fetch(`${appConstants.baseUrl}?q=${location}&units=${appConstants.unitc}&appid=${appConstants.apiKey}&lang=language`)
    .then((response) => {
        if(response.status===200)
        {
            return response.json();
        }
        throw Error("Error fetching data.")
    })
    .then((data) => {
        
        updateDOMc(data);
    })
    .catch((error) => {
        console.error(error);
        alert(`error getting data of ${location}`);
    })
    
    

   
   
    
}
function updateDOMc(data)
{
    const dateInformation=getDateInformation();
    document.querySelector('.today .date-and-day .unhighlited').innerHTML=`${dateInformation.month} ${dateInformation.date}`;
    document.querySelector('.tomorrow .date-and-day .unhighlited').innerHTML=`${dateInformation.month} ${dateInformation.date+1}`;
    document.querySelector('.day-after-tomorrow .date-and-day .unhighlited').innerHTML=`${dateInformation.month} ${dateInformation.date+2}`;
    document.querySelector('.location-and-temp .location .exact-location').innerHTML=`${data?.name || appConstants.unknownVal}, ${data?.sys?.country || appConstants.unknownVal}`;
    document.querySelector('.location-and-temp .day').innerHTML = dateInformation.day;
    document.querySelector('.location-cloud-report .cloud-report img')
    .setAttribute("src",`${appConstants.imageUrl}${data?.weather?.[0]?.icon}.png`);
    document.querySelector('.location-cloud-report .cloud-report h3').innerHTML=`${data?.weather?.[0]?.description}`;
    document.querySelector('.location-and-temp .temp h1').innerHTML=`${parseInt(data?.main?.temp || 0)} &deg;C`;
    document.querySelector('.today .temp1 h2').innerHTML=`${parseInt(data?.main?.temp || 0)} &deg;C`;
    document.querySelector('.tomorrow .temp1 h2').innerHTML=`update soon..`;
    document.querySelector('.day-after-tomorrow .temp1 h2').innerHTML=`update soon..`;

    document.querySelector('.wind .wind-data h4').innerHTML=`${data?.wind?.speed || appConstants.unknownVal} KM/HR`;
    document.querySelector('.visibility .visibility-data h4').innerHTML=`${data?.visibility || appConstants.unknownVal} METER`;
    document.querySelector('.pressure .pressure-data h4').innerHTML=`${data?.main?.pressure || appConstants.unknownVal} mb`;
    document.querySelector('.humidity .humidity-data h4').innerHTML=`${data?.main?.humidity || appConstants.unknownVal} %`;

    
}
function fahrenheit(event)
{
    event.preventDefault();
    const location=document.querySelector('.search-box').value;
   
        fetch(`${appConstants.baseUrl}?q=${location}&units=${appConstants.unitf}&appid=${appConstants.apiKey}`)
    .then((response) => {
        if(response.status===200)
        {
            return response.json();
        }
        throw Error("Error fetching data.")
    })
    .then((data) => {
        
        updateDOMf(data);
    })
    .catch((error) => {
        console.error(error);
        alert(`error getting data of ${location}`);
    })
}
function updateDOMf(data)
{
    const dateInformation=getDateInformation();
    document.querySelector('.today .date-and-day .unhighlited').innerHTML=`${dateInformation.month} ${dateInformation.date}`;
    document.querySelector('.location-and-temp .location .exact-location').innerHTML=`${data?.name || appConstants.unknownVal}, ${data?.sys?.country || appConstants.unknownVal}`;
    document.querySelector('.location-cloud-report .cloud-report img')
    .setAttribute("src",`${appConstants.imageUrl}${data?.weather?.[0]?.icon}.png`);
    document.querySelector('.location-cloud-report .cloud-report h3').innerHTML=`${data?.weather?.[0]?.description}`;
    document.querySelector('.location-and-temp .temp h1').innerHTML=`${parseInt(data?.main?.temp || 0)} &deg;F`;
    document.querySelector('.today .temp1 h2').innerHTML=`${parseInt(data?.main?.temp || 0)} &deg;F`;

    document.querySelector('.wind .wind-data h4').innerHTML=`${data?.wind?.speed || appConstants.unknownVal} KM/HR`;
    document.querySelector('.visibility .visibility-data h4').innerHTML=`${data?.visibility || appConstants.unknownVal} METER`;
    document.querySelector('.pressure .pressure-data h4').innerHTML=`${data?.main?.pressure || appConstants.unknownVal} mb`;
    document.querySelector('.humidity .humidity-data h4').innerHTML=`${data?.main?.humidity || appConstants.unknownVal} %`;

    
}

function getDateInformation()
{
    const months=[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "oct",
        "nov",
        "dec"
    ];
    const days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const d=new Date();
    const day=days[d.getDay()];
    const date=d.getDate();
    const month=months[d.getMonth()];
    const year=d.getFullYear();

    return {
        day,
        date,
        month,
        year,
    }
}