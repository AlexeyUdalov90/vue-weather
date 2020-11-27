const API_KEY = 'b927683f3bed207ff1f0980653750cdc';

class NotFoundCityError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundCityError';
  }
}

class BadRequestError extends Error{
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}

const weatherRequest = async (city) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=ru&units=metric`);
    const data = await response.json();

    switch(response.status) {
      case 400:
        throw new BadRequestError('Неверный запрос!');
      case 404:
        throw new NotFoundCityError('Не смогли найти город!');
      case 200:
        return data;
    }
  } catch(err) {
    if (err instanceof BadRequestError) {
      throw err;
    } else if (err instanceof NotFoundCityError) {
      throw err;
    } else {
      throw new Error(err);
    }
  }
};

export default weatherRequest;