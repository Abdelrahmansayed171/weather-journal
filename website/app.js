/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// Date format to be displayed
let newDate = (d.getMonth()+1) +'/'+ d.getDate()+'/'+ d.getFullYear();

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const appID = '&appid=285161cad12b5f194282ecd5e673848d&units=imperial';


// get submit button and do some operations on the received data
document.querySelector("#generate").addEventListener('click', (e) => {
    const zipCode = document.querySelector("#zip").value;
    const clientContent = document.querySelector("#feelings").value;
    getWeather(baseUrl+zipCode+appID)
        .then((data) =>{
            console.log(data);
            postData('/postDATA',{
                date : newDate,
                temp : data.main.temp,
                feeling: clientContent
            });
            updateUI();
        });

});

// GET Method will be sent to the WeatherAPI Server and return with the weather data to the client
const getWeather = async (url = '') => {

    const res = await fetch(url);

    try{
        const responseData = await res.json();
        return responseData;
    }
    catch(error){
        console.log(error);
    }

};

// POST method will post the data and feeling of the user to the server side to be recorded
const postData = async (url = '', content = {}) =>{
    console.log(content);

    const res = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}

// get the data from the server side and display it on the HTML page
async function updateUI(){
    const res = await fetch('/getDATA');
    try{
        const requestBody = await res.json();
        document.getElementById('date').innerHTML = `Date: ${requestBody.date}`;
        document.getElementById('temp').innerHTML = `Current temperature is : ${requestBody.temp}`;
        document.getElementById('content').innerHTML = `Your feeling: ${requestBody.feeling}`;
    }
    catch(error){
        console.log(error);
    }
}