const getCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  return Object.entries(json).map((currencie) => currencie[0])
    .filter((currencie) => currencie !== 'USDT');
};

export default getCurrencies;
