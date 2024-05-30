const tg = window.Telegram.WebApp.onEvent();

 document.getElementById('sendMessageButton').addEventListener('click', () => {
    const message = prompt("Enter your message:");
    if (message !== null && message.trim() !== "") {
      fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById('response').innerText = data.response;
      })
      .catch(error => console.error('Error:', error));
    }
  });