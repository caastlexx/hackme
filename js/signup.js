
import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://kjwgodmsdclkljukryft.supabase.co",
  "sb_publishable_B8bshQswHtxR8oSlpqXPbg_g9-GXNQz"
);
const app = document.querySelector("#app");

const DEMO = true;

app.innerHTML = `
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="./index.html" aria-label="HackMe home">
        <span class="brand-mark" aria-hidden="true"><span class="brand-dot"></span></span>
        HackMe
      </a>
      <nav class="site-nav" aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#safety">Your privacy</a>
        <a href="./conversations.html">My Conversations</a>
      </nav>
    </div>
  </header>

  <main id="main-content">
    <section class="hero" aria-labelledby="page-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> Scam-safety practice</p>
          <h1 id="page-title">Practice spotting scams before they reach you.</h1>
          <p class="hero-lede">HackMe is a controlled training experience that helps you recognize suspicious messages in a calm, safe setting.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#enrollment">Start your training mission</a>
            <a class="button button-secondary" href="./conversations.html">View feedback example</a>
          </div>
          <p class="trust-note"><strong>Important:</strong> We will never ask for your password, bank details, account number, payment, or a verification code.</p>
        </div>

        <aside class="briefing-card" aria-label="Training mission overview">
          <div class="briefing-topline"><span>Secure briefing</span><span class="briefing-code">Mission 01</span></div>
          <h2>Learn the warning signs.</h2>
          <p>Only approved participants receive a clearly controlled practice message.</p>
          <div class="briefing-row"><span>Training channel</span><strong>SMS practice</strong></div>
          <div class="briefing-row"><span>Real money requested</span><strong>Never</strong></div>
          <div class="briefing-row"><span>Afterward</span><strong>Safety feedback</strong></div>
        </aside>
      </div>
    </section>

    <section class="section" id="how-it-works" aria-labelledby="how-title">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">How it works</p>
          <h2 id="how-title">A simple three-step practice mission.</h2>
          <p>There are no surprises. You choose to participate, and you can stop at any time.</p>
        </div>
        <div class="steps-grid">
          <article class="step-card"><div class="step-number">1</div><h3>Sign up and consent</h3><p>Tell us how to contact you and confirm that you want an educational practice message.</p></article>
          <article class="step-card"><div class="step-number">2</div><h3>Receive a practice alert</h3><p>After approval, you receive a controlled SMS scenario designed for learning—not a real scam.</p></article>
          <article class="step-card"><div class="step-number">3</div><h3>Review your feedback</h3><p>See helpful, personalized safety guidance after your training session is complete.</p></article>
        </div>
      </div>
    </section>

    <section class="section section-soft" id="safety" aria-labelledby="safety-title">
      <div class="container safety-grid">
        <div>
          <p class="eyebrow">Your safety comes first</p>
          <h2 id="safety-title">This is practice, not a real financial request.</h2>
          <p class="section-copy">The goal is to help you pause, notice warning signs, and feel more prepared for suspicious messages in everyday life.</p>
        </div>
        <div class="safety-list">
          <div class="safety-item"><span class="check-mark" aria-hidden="true">✓</span><div><strong>No financial information</strong><p>We never request passwords, payment details, or account numbers.</p></div></div>
          <div class="safety-item"><span class="check-mark" aria-hidden="true">✓</span><div><strong>Clear consent</strong><p>Only people who choose to participate can receive a practice message.</p></div></div>
          <div class="safety-item"><span class="check-mark" aria-hidden="true">✓</span><div><strong>Helpful feedback</strong><p>Your later report focuses on practical habits, not judgment.</p></div></div>
        </div>
      </div>
    </section>

    <section class="section enrollment-section" id="enrollment" aria-labelledby="enrollment-title">
      <div class="container enrollment-grid">
        <div class="form-intro">
          <p class="eyebrow">Enrollment</p>
          <h2 id="enrollment-title">Opt-In for Practice</h2>
          <div class="mini-brief"><span class="mini-brief-label">Before you continue</span><p>Use only your own contact information. You will not receive a real scam or a request for money.</p></div>
        </div>

        <div class="form-card">
          <div class="form-heading"><div><p class="form-kicker">Sign up</p><h2>Complete the form below</h2></div><span class="secure-label">Consent required</span></div>
          <form id="signup-form">
            <div class="field-group">
              <label for="name">Name</label>
              <input id="name" type="text" autocomplete="name" required />
            </div>

            <div class="field-group">
              <label for="email">Email</label>
              <input id="email" type="email" autocomplete="email" required />
              <button
                class="button button-secondary"
                type="button"
                id="send-sign-in-link"
              >
                Send sign-in link
              </button>
            </div>
            <div class="field-group">
              <label for="phone">Phone number</label>
              <input id="phone" type="tel" inputmode="tel" autocomplete="tel" required />
            </div>
            <div class="field-group">
              <label for="comments">Comments</label>
              <textarea id="comments" rows="4"></textarea>
            </div>
            <div class="field-group">
              <label for="favorite-item">Favorite Item </label>
              <input id="favorite-item" type="text" />
            </div>
            <fieldset class="consent-box">
              <legend>Training consent</legend>
              <label class="checkbox-row" for="consent">
                <input id="consent" type="checkbox" required />
                <span>
                  <strong>I agree to participate in this controlled educational scam-awareness simulation.</strong>
                  <small>
                    I understand that HackMe may send a simulated training message to the contact information I provide and may generate educational feedback based on my interaction with that simulation. This is not a real message from a bank, government agency, delivery company, or other organization. I will never be asked to send money, share a password, verification code, bank account number, payment-card information, or other sensitive financial information. My submitted contact information and optional responses will be used only to operate this demonstration and provide my simulation feedback—not for real transactions, marketing, sales, or use outside this educational simulation. By checking this box, I confirm that I am voluntarily opting in and understand that the experience is entirely simulated.
                  </small>
                </span>
              </label>
            </fieldset>
            <button class="button button-primary button-full" type="submit">Request training access</button>
          </form>
          <p class="form-message" id="message" role="status" aria-live="polite"></p>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer"><div class="container footer-inner"><div><a class="brand brand-footer" href="./index.html"><span class="brand-mark" aria-hidden="true"><span class="brand-dot"></span></span>HackMe</a><p>Controlled scam-safety training for informed decisions.</p></div><p class="footer-note">Never share passwords, bank details, account numbers, or verification codes.</p></div></footer>
`;

const form = document.querySelector("#signup-form");
const message = document.querySelector("#message");

const emailInput = document.querySelector("#email");
const sendSignInLinkButton = document.querySelector("#send-sign-in-link");

sendSignInLinkButton.addEventListener("click", async () => {
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  sendSignInLinkButton.disabled = true;
  message.textContent = "Sending your sign-in link...";

  const { error } = await supabase.auth.signInWithOtp({
    email: emailInput.value.trim(),
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname
    }
  });

  sendSignInLinkButton.disabled = false;

  if (error) {
    console.error(error);
    message.textContent = "We could not send the sign-in link. Please try again.";
    return;
  }

  message.textContent =
    "Sign-in link sent. Open it from your email, then return here to submit your training request.";
});

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

  if (DEMO_MODE) {
    message.textContent =
      "Demo request submitted. In the live version, you would sign in by email before joining a training session.";
    form.reset();
    return;
  }

  // Authentication for user email so conversations.js can access columns in call_conversations

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError) {
    console.error(authError);
    message.textContent = "We could not verify your sign-in. Please try again.";
    return;
  }

  if (!user) {
    message.textContent =
      "Please use the “Send sign-in link” button and open the email before submitting your training request.";
    return;
  }

// Push entered data to Supabase

  const { error } = await supabase
    .from("signup_requests")
    .insert({
      auth_user_id: user.id,
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
});