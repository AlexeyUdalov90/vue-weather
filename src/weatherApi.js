import axios from 'axios';

const weatherRequest = async (city) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.VUE_APP_WEATHER_KEY}&lang=ru&units=metric`);

    return response.data;
  } catch(err) {
    if (err.response) {
      switch(err.response.status) {
        case 400: {
          throw new Error('Не верный запрос!');
        }
        case 404: {
          throw new Error('Не смогли найти город!');
        }
      }
    } else if (err.request) {
      throw new Error('Упс, что-то пошло не так!');
    } else {
      throw new Error(err.message);
    }
  }
};

export default weatherRequest;