const tg = window.Telegram.WebApp.onEvent();

document.getElementById('clickButton').addEventListener('click', ()=>{
    let button = document.getElementById("clickButton");
    button.classList.toggle("clicked");
    setTimeout(function() {
        button.classList.toggle("clicked");
    }, 100);
});



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