const tg = window.Telegram.WebApp.onEvent();

document.

body.height = window.innerHeight

window.onload = ()=> {
    if (localStorage.getItem('coins') > 0) {
        document.getElementById('coinsLabel').innerHTML = localStorage.getItem('coins') 
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
    coins += 1;
    localStorage.setItem('coins', `${coins}`);
    document.getElementById('coinsLabel').innerHTML = coins
  })