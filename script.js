const tg = window.Telegram.WebApp.onEvent();

body.height = window.innerHeight

window.onload = ()=> {
    if (localStorage.getItem('coins') > 0) {
        document.getElementById('coinsLabel').innerHTML = localStorage.getItem('coins');
    }
}

 /*document.getElementById('sendMessageButton').addEventListener('click', () => {
    alert(123)
    const message = prompt("Enter your message:");
    if (message !== null && message.trim() !== "") {
      fetch('http://localhost:3000/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      })
      .then(response => response.json())
      .then(data => {
        alert(data.response)
      })
      .catch(error => console.error('Error:', error));
    }
  });
*/
  document.getElementById('mainButtonBox').addEventListener('click', ()=>{
    let coins = +document.getElementById('coinsLabel').textContent;
    let energy = document.getElementById('energyLabel').textContent;
    const parts = energy.split('/');
    let leftEnergy = parseInt(parts[0]);
    leftEnergy = leftEnergy - 1;
    coins += 1;
    localStorage.setItem('coins', `${coins}`);
    localStorage.setItem('energy', `${energy}`);
    document.getElementById('energyLabel').innerHTML = leftEnergy + '/1000'
    document.getElementById('coinsLabel').innerHTML = coins
  })

  setInterval(()=>{
    let energy = +document.getElementById('energyLabel').textContent;
    const parts = energy.split('/');
    let leftEnergy = parseInt(parts[0]);
    if (leftEnergy != 1000) {
        document.getElementById('energyLabel').innerHTML = (leftEnergy + 1) + '/1000';
    }
  }, 1000)