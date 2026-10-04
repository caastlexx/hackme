import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://kjwgodmsdclkljukryft.supabase.co",
  "sb_publishable_B8bshQswHtxR8oSlpqXPbg_g9-GXNQz"
);
const app = document.querySelector("#app");

app.innerHTML = `
  <h1>HackMe</h1>
  <p>Demo sign up page for opting-in to sms scam simulations.</p>

  <form id="signup-form">
    <p>
      <label>
        Name<br />
        <input id="name" type="text" required />
      </label>
    </p>

    <p>
        <label>
            Email<br />
            <input id="email" type="email" />
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
            Comments<br />
            <textarea id="comments" rows="4"></textarea>
        </label>
    </p>

    <p>
        <label>
            Favorite Item<br />
            <input id="favorite-item" type="text" />
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

// Listen for valid signup for database row entry

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

// User input consts for database entry

  const name = document.querySelector("#name").value.trim();
  const phoneNum = document.querySelector("#phone").value.replace(/\D/g, "");
  const email = document.querySelector("#email").value.trim();
  const favorite_item = document.querySelector("#favorite-item").value.trim();
  const comments = document.querySelector("#comments").value.trim();

  if (!(phoneNum.length == 10)) {
    message.textContent = "Please enter a valid phone number.";
    return;
  }

// Push entered data to Supabase

  const { error } = await supabase
    .from("signup_requests")
    .insert({
      name: name,
      phone: `+1${phoneNum}`,
      consent: true,
      email: email,
      favorite_item: favorite_item,
      comments: comments
    });

  if (error) {
    console.error(error);
    message.textContent = "Signup failed. Please try again.";
    return;
  }

  message.textContent =
    "Request submitted. Pending approval.";

  form.reset();

  /*
  Add event (Fetch report)
    get report
    insert report to page
  */
});