body.height = window.innerHeight
window.onload = ()=> {
    const tg = window.Telegram.WebApp;
    tg.expand();
    postData('https://telegram-clicker-website.onrender.com/getGameData', {
        telegramId: getTelegramId(),
      })
      .then(data => {
        newData = Array.from(data.data);
        const record = newData[newData.length-1];
        document.getElementById('coinsLabel').innerHTML = record.coins;
        document.getElementById('energyLabel').innerHTML = calculateEnergy(record.energy, record.time)
      });
}

document.getElementById('friendsButton').addEventListener('click', ()=>{
    document.getElementById('gameField').style.display = 'none';
    document.getElementById('friendsButton').style.color = 'red';
    document.getElementById('gameButton').style.color ='white';
    document.getElementById('referalField').style.display = 'block';
});

document.getElementById('gameButton').addEventListener('click', ()=>{
  document.getElementById('gameField').style.display = 'block';
  document.getElementById('friendsButton').style.color = 'white';
  document.getElementById('gameButton').style.color ='red';
  document.getElementById('referalField').style.display = 'none';
});

document.getElementById('mainButtonBox').addEventListener('touchstart', ()=>{
    if (window.Telegram.WebApp.platform == 'ios'){
        for (let i = 0; i < event.touches.length; i++) {
        showClick(event.touches[i]);
    }
    let energy = getLeftEnergy();
    if (energy != 0){
        let coins = getLeftCoins();
        energy -= event.touches.length;
        coins += event.touches.length;
        document.getElementById('energyLabel').innerHTML = energy + '/1000'
        document.getElementById('coinsLabel').innerHTML = coins
        }
    }
  });

document.getElementById('mainButtonBox').addEventListener('click', ()=>{
    if (window.Telegram.WebApp.platform == 'tdesktop'){
    showClick(event);
    let energy = getLeftEnergy();
    if (energy != 0){
        let coins = getLeftCoins();
        energy -= 1;
        coins += 1;
        document.getElementById('energyLabel').innerHTML = energy + '/1000'
        document.getElementById('coinsLabel').innerHTML = coins
    }
    }
});

   

  setInterval(()=>{
    let leftEnergy = getLeftEnergy();
    if (leftEnergy != 1000) {
        document.getElementById('energyLabel').innerHTML = (leftEnergy + 1) + '/1000';
    }
  }, 1000)

  function getCurrentTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
    const time = now.toLocaleTimeString('en-US', { 
        hour12: false 
    });

    return `${date} ${time}`;
}
function getLeftEnergy() {
    let energy = document.getElementById('energyLabel').textContent;
    const parts = energy.split('/');
    let leftEnergy = +parseInt(parts[0]);
    return +leftEnergy;
}

function getLeftCoins() {
    return +document.getElementById('coinsLabel').textContent;
}

function getTelegramId() {
    let tg = window.Telegram.WebApp;
    return tg.initDataUnsafe.user.id
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
    postData('https://telegram-clicker-website.onrender.com/updateGameData', {
        telegramId: getTelegramId(),
        energy: getLeftEnergy(),
        coins: getLeftCoins(),
        time: getCurrentTime()
      })
      .then(data => {
        // Do something with the response data if needed
      });
  }, 2000);

  function calculateEnergy(lastEnergy, time){
    let givenDateString = time;

    let givenDate = new Date(givenDateString);

    let currentDate = new Date();

    let differenceInMilliseconds = currentDate - givenDate;

    let differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    if (lastEnergy + differenceInSeconds >= 1000) {
      return '1000/1000';
    } else {
      return `${lastEnergy + differenceInSeconds}`+'/1000'
    }
  }
function showClick(event) {
    const x = event.clientX;
    const y = event.clientY;

    const plusOne = document.createElement('h2');
    plusOne.textContent = "+1";

    plusOne.style.position = "absolute";
    plusOne.style.left = (x-20) + "px";
    plusOne.style.top = (y-20) + "px";
    plusOne.style.color = "green";
    plusOne.style.animation = "upAndFadeOut 1s forwards"; 

    document.body.appendChild(plusOne);

        setTimeout(() => {
        document.body.removeChild(plusOne);
    }, 1000);
}
    
document.getElementById('inviteFriendBox').addEventListener('click', ()=>{
  const shareUrl = 'https://t.me/share/url?url=https%3A%2F%2Fexample.com&text=Check%20out%20this%20amazing%20website!';

    // Open the Telegram share link
    Telegram.WebApp.openTelegramLink(shareUrl);
});