const requestCoins = () => ({
  type: 'REQUEST_CURRENCIES',
});

const getCoins = (coins) => ({
  type: 'GET_CURRENCIES',
  payload: coins,
});

const fetchCoins = () => {
  const currencies = [];

  return async (disptach) => {
    disptach(requestCoins());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const coinKeys = Object.keys(data);
    coinKeys.forEach((coin) => {
      if (coin !== 'USDT') {
        currencies.push(coin);
      }
    });
    disptach(getCoins(currencies));
  };
};

export default fetchCoins;
