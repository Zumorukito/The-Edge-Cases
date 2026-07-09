const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const quickButtons = document.querySelectorAll('.quick-btn');

function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getReply(message) {
  const text = message.toLowerCase();

  if (text.includes('hours') || text.includes('open')) {
    return 'We are open from 10 AM to 9 PM daily. Would you like to make a booking?';
  }

  if (text.includes('price') || text.includes('pricing') || text.includes('cost')) {
    return 'Our prices depend on the service selected. I can show basic pricing or connect you to staff for a custom quote.';
  }

  if (text.includes('booking') || text.includes('book')) {
    return 'Sure, I can help with booking enquiries. Please share your preferred date and time.';
  }

  if (text.includes('order')) {
    return 'Please provide your order number and our staff can follow up on the order status.';
  }

  return 'I may need human staff to follow up on this. Please leave your contact details.';
}

if (chatForm && chatInput && chatMessages) {
  chatForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userMessage = chatInput.value.trim();
    if (!userMessage) {
      return;
    }

    addMessage(userMessage, 'user');
    chatInput.value = '';

    setTimeout(function () {
      addMessage(getReply(userMessage), 'bot');
    }, 500);
  });

  quickButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const message = button.getAttribute('data-message');
      addMessage(message, 'user');
      setTimeout(function () {
        addMessage(getReply(message), 'bot');
      }, 500);
    });
  });
}
