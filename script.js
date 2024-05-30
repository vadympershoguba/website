const tg = window.Telegram.WebApp.onEvent();


body.height = window.innerHeight


 document.getElementById('sendMessageButton').addEventListener('click', () => {
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

  document.getElementById('mainButtonBox').addEventListener('click', ()=>{
    const coins = +document.getElementById('coinsLabel').textContent;
    coins += 1;
    document.getElementById('coinsLabel').innerHTML = coins
  })