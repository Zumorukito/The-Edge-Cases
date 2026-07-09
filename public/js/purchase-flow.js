const form = document.querySelector(".checkout-form");
const payButton = document.querySelector(".checkout-form button[type='submit']");
const processingState = document.querySelector(".processing-state");
const paymentRadios = document.querySelectorAll("input[name='paymentMethod']");
const demoCardFields = document.querySelector(".demo-card-fields");
const paymentNote = document.querySelector(".payment-note");
const cardNumberInput = document.querySelector("input[name='cardNumber']");
const expiryInput = document.querySelector("input[name='expiry']");
const cvvInput = document.querySelector("input[name='cvv']");

function updatePaymentMethod() {
  const selected = document.querySelector("input[name='paymentMethod']:checked").value;

  if (selected === "demo-card") {
    demoCardFields.style.display = "grid";
    paymentNote.textContent =
      "Demo card selected. Use 4242 4242 4242 4242 for testing only.";
  } else if (selected === "paynow") {
    demoCardFields.style.display = "none";
    paymentNote.textContent =
      "PayNow simulation selected. No real PayNow payment will be made.";
  } else {
    demoCardFields.style.display = "none";
    paymentNote.textContent =
      "Bank transfer simulation selected. No real bank transfer will be made.";
  }
}

paymentRadios.forEach((radio) => {
  radio.addEventListener("change", updatePaymentMethod);
});

if (cardNumberInput) {
  cardNumberInput.addEventListener("input", () => {
    let value = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    cardNumberInput.value = value;
  });
}

if (expiryInput) {
  expiryInput.addEventListener("input", () => {
    let value = expiryInput.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    expiryInput.value = value;
  });
}

if (cvvInput) {
  cvvInput.addEventListener("input", () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 3);
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const selectedPayment = document.querySelector("input[name='paymentMethod']:checked").value;

    if (selectedPayment === "demo-card") {
      const cardName = document.querySelector("input[name='cardName']").value.trim();
      const cardNumber = document.querySelector("input[name='cardNumber']").value.trim();
      const expiry = document.querySelector("input[name='expiry']").value.trim();
      const cvv = document.querySelector("input[name='cvv']").value.trim();

      if (!cardName || !cardNumber || !expiry || !cvv) {
        processingState.textContent = "Please complete the demo card details.";
        processingState.classList.add("error-state");
        return;
      }
    }

    payButton.disabled = true;
    payButton.textContent = "Processing fake payment...";
    processingState.classList.remove("error-state");
    processingState.innerHTML = `
      <div class="mini-loader"></div>
      <span>Checking demo payment details...</span>
    `;

    setTimeout(() => {
      processingState.innerHTML = `
        <div class="success-dot"></div>
        <span>Demo payment approved. Redirecting...</span>
      `;

      setTimeout(() => {
        HTMLFormElement.prototype.submit.call(form);
      }, 800);
    }, 1500);
  });
}

updatePaymentMethod();