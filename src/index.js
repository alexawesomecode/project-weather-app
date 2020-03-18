let description;
let country;
let temp;
let cityname;
let tempMetric;


const convertTemp = (t) => {
  const celcius = Math.floor(t - 273.15);
  const farenheit = Math.floor((celcius * (9 / 5)) + 32);
  return [celcius, farenheit];
};

const changeDom = (a, b, c, d) => {
  const cardCity = document.querySelector('#city');
  const cardTempDescription = document.querySelector('#temp-description');
  const cardCountry = document.querySelector('#country');
  const cardTemp = document.querySelector('#temp');
  const cardBody = document.querySelector('.card-body');

  [cardCity.textContent, cardTempDescription.textContent, cardCountry.textContent] = [a, b, c];
  cardTemp.textContent = tempMetric === 'c' ? `${Math.floor(convertTemp(d)[0])} C` : `${Math.floor(convertTemp(d)[1])} F`;
  if (description === 'few clouds') cardBody.style.backgroundImage = 'url("./fewclouds.jpg")';
  if (description === 'clear sky') cardBody.style.backgroundImage = 'url("./sunny.jpg")';
  if (description === 'broken clouds') cardBody.style.backgroundImage = 'url("./cloudy.jpg")';
  if (description === 'scattered clouds') cardBody.style.backgroundImage = 'url("./cloudy.jpg")';
  if (description === 'light rain') cardBody.style.backgroundImage = 'url("./rainy.jpg")';
};

const changeAnimations = () => {
  const cardElem = document.querySelector('.card');
  cardElem.style.opacity = '0';
  const bodyElem = document.body;
  if (temp < 300) bodyElem.style.background = 'linear-gradient(225deg, rgba(58,180,159,1) 0%, rgba(29,253,75,1) 50%, rgba(255,203,1,1) 100%)';
  if (temp > 290) bodyElem.style.background = 'linear-gradient(225deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(199,69,252,1) 100%)';
  if (temp > 304) bodyElem.style.background = 'linear-gradient(225deg, rgba(79,58,180,1) 0%, rgba(253,29,175,1) 50%, rgba(255,1,1,1) 100%)';
  setTimeout(() => {
    cardElem.style.opacity = '1';
  }, 300);
};

const cityWeather = (city) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0b91ec70e5e1e568bad92f3363c60c34`)
    .then((response) => response.json())
    .then((res) => {
      cityname = res.name;
      description = res.weather[0].description;
      country = res.sys.country;
      temp = res.main.temp;
    })
    .then(() => changeAnimations())
    .then(() => changeDom(cityname, description, country, temp))

    .catch((error) => console.log(error));
};


function handleForm(e) {
  e.preventDefault();
  const inputValue = document.querySelector('#search-input').value;

  cityWeather(inputValue);
}


const lookupCity = document.querySelector('form');
lookupCity.addEventListener('submit', handleForm);
// cityWeather('iquique');

const changeTempDom = () => {
  const checkboxTemp = document.querySelector('#switch-1');
  checkboxTemp.addEventListener('click', (e) => {
    const check = e.target.checked;
    const result = convertTemp(temp);
    const tempElem = document.querySelector('#temp');

    if (check) {
      tempMetric = 'f';
      tempElem.textContent = `${Math.floor(result[1])} F`;
    } else {
      tempMetric = 'c';
      tempElem.textContent = `${Math.floor(result[0])} C`;
    }
  });
};


changeTempDom();
