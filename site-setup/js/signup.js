const app = document.querySelector("#app");

app.innerHTML = `
  <h1>HackMe</h1>
  <p>Demo sign up page for sms prevention opt-ins.</p>

  <form id="signup-form">
    <p>
      <label>
        Name<br />
        <input id="name" type="text" required />
      </label>
    </p>

    <p>
      <label>
        Phone number<br />
        <input id="phone" type="tel" required />
      </label>
    </p>

    <p>
      <label>
        <input id="consent" type="checkbox" required />
        Opt in to receive educational SMS scam simulations.
      </label>
    </p>

    <button type="submit">Sign up</button>
  </form>

  <p id="message"></p>
`;

const form = document.querySelector("#signup-form");
const message = document.querySelector("#message");

// listen for valid signup to later send to db

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // placeholder confirmation task
  message.textContent = "Signup successful";
});