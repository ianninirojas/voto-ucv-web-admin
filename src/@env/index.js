const prod = {
  apiUrl: 'https://core-voto-ucv.appspot.com'
}

const dev = {  
  apiUrl: 'http://127.0.0.1:8080'
}

const env = process.env.REACT_APP_ENV === "production" ? prod : dev;

export {
  env
}