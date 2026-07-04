const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.innerHTML = `<span>${sender === 'bot' ? 'Bot' : 'You'}:</span><p>${text}</p>`;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getReply(message) {
  const text = message.toLowerCase();

  if (text.includes('hours') || text.includes('open')) {
    return 'Our opening hours are Monday to Saturday, 9:00 AM to 9:00 PM.';
  }

  if (text.includes('price') || text.includes('pricing')) {
    return 'Our service packages start from SGD 99 per month. We can also offer a custom plan.';
  }

  if (text.includes('booking') || text.includes('book')) {
    return 'You can make a booking by contacting our team through the booking form or WhatsApp.';
  }

  if (text.includes('order')) {
    return 'We can help with order updates. Please share your order number so we can check the status.';
  }

  return 'Thanks for your message. A human staff member can follow up with you shortly.';
}

if (chatForm && chatInput && chatWindow) {
  chatForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userMessage = chatInput.value.trim();
    if (!userMessage) {
      return;
    }

    addMessage(userMessage, 'customer');
    chatInput.value = '';

    setTimeout(() => {
      addMessage(getReply(userMessage), 'bot');
    }, 500);
  });
}
