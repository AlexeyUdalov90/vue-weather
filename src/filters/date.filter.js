export default function(value, format = 'date') {
  const options = {};

  switch(format) {
    case 'date': {
      options.day = '2-digit';
      options.month = '2-digit';
      break;
    }
    case 'time': {
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    }
  }

  return new Intl.DateTimeFormat('ru', options).format(new Date(value));
}