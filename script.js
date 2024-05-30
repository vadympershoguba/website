const tg = window.Telegram.WebApp.onEvent();
window.Telegram.WebApp.expand();
body.height = window.innerHeight
alert(141414)

window.onload = ()=> {
    postData('http://localhost:3000/api/getGameData', {
        telegramId: getTelegramId(),
      })
      .then(data => {
        let newData = JSON.parse(data);
        document.getElementById('coinsLabel').innerHTML = newData[0]['coins'];
        
      });
}
  
document.getElementById('mainButtonBox').addEventListener('click', ()=>{
    let energy = getLeftEnergy();
    if (energy != 0){
        let coins = getLeftCoins();
        energy -= 1;
        coins += 1;
        document.getElementById('energyLabel').innerHTML = energy + '/1000'
        document.getElementById('coinsLabel').innerHTML = coins
    }
  })

  setInterval(()=>{
    let leftEnergy = getLeftEnergy();
    if (leftEnergy != 1000) {
        document.getElementById('energyLabel').innerHTML = (leftEnergy + 1) + '/1000';
    }
  }, 1000)

function getCurrentTime(){
    return new Date().toLocaleTimeString('en-US', { hour12: false });
}

function getLeftEnergy() {
    let energy = document.getElementById('energyLabel').textContent;
    const parts = energy.split('/');
    let leftEnergy = +parseInt(parts[0]);
    return leftEnergy;
}

function getLeftCoins() {
    return +document.getElementById('coinsLabel').textContent;
}

function getTelegramId() {
    return window.Telegram.WebApp.initDataUnsafe.user.first_name+window.Telegram.WebApp.initDataUnsafe.user.last_name
}

function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  setInterval(() => {
    postData('http://localhost:3000/api/updateGameData', {
        telegramId: getTelegramId(),
        energy: getLeftEnergy(),
        coins: getLeftCoins(),
        time: getCurrentTime()
      })
      .then(data => {
        // Do something with the response data if needed
        console.log('Response:', data);
      });
  }, 2000);