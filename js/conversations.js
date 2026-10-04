import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://kjwgodmsdclkljukryft.supabase.co",
  "sb_publishable_B8bshQswHtxR8oSlpqXPbg_g9-GXNQz"
);

const DEMO = false;

const demoConversations = [
  {
    id: "demo-sms",
    title: "Demo Convo",
    date: "October 3, 2026",
    channel: "SMS",
    transcript: `Demo Agent: Free GTA VI COPY.

Demo User: Okay.

Demo Agent: First, wire me 10 bands.`,
    report: {
      summary: "Demo conversation",
      recommendation: "Lock in gng."
    }
  },
  {
    id: "demo-sms2",
    title: "Demo Convo 2",
    date: "October 2, 2026",
    channel: "SMS",
    transcript: `Demo Agent: Hospital Bills overdue.

User: I'm not sending jack.

Demo Agent: Not bad, kid.`,
    report: {
      summary: "Demo conversation 2",
      recommendation: "Lock in again gng."
    }
  }
];

const conversationData = document.querySelector("#conversation");
const selection = new URLSearchParams(window.location.search).get("id");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTranscript(transcript) {
  if (!transcript) {
    return "A transcript is not available for this training conversation yet.";
  }

  if (typeof transcript === "string") {
    return transcript;
  }

  return JSON.stringify(transcript, null, 2);
}

async function getConversations() {
  if (DEMO) {
    return { status: "ready", conversations: demoConversations };
  }

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError) {
    console.error(authError);
    return {
      status: "error",
      message: "We could not verify your sign-in. Please try again."
    };
  }

  if (!user) {
    return { status: "signed-out", conversations: [] };
  }

  const { data, error } = await supabase
    .from("call_conversations")
    .select(`
        id,
        kind,
        campaign,
        outcome,
        summary,
        followups,
        transcript,
        state,
        duration_s,
        started_at,
        ended_at
        `)
    .order("started_at", { ascending: false });

  if (error) {
    console.error(error);
    return {
      status: "error",
      message: "We could not load your conversations. Please try again."
    };
  }

  console.log("Conversation query result:", { data, error });

  return {
    status: "ready",
    conversations: (data ?? []).map((conversation) => ({
      id: conversation.id,
      title: conversation.campaign || "Training conversation",
      date: conversation.started_at
        ? new Date(conversation.started_at).toLocaleString()
        : "Date unavailable",
      channel: (conversation.kind || "Call").toUpperCase(),
      transcript: conversation.transcript,
      report: {
        summary: conversation.summary || "No summary available yet.",
        recommendation:
          conversation.followups || "No recommendation available yet."
      }
    }))
  };
}

function showConversations(conversations) {
  conversationData.innerHTML = `
    <div class="empty-report">
      <h2>View your reports here</h2>
      ${conversations
        .map(
          (conversation) => `
            <div class="hero-actions">
              <a class="button button-primary"
                 href="./conversations.html?id=${encodeURIComponent(conversation.id)}">
                ${escapeHtml(conversation.title)} - ${escapeHtml(conversation.channel)}
              </a>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function showReport(conversation) {
  conversationData.innerHTML = `
    <div class="empty-report">
      <p class="eyebrow">${escapeHtml(conversation.channel)} conversation</p>
      <h2>${escapeHtml(conversation.title)}</h2>
      <p>${escapeHtml(conversation.date)}</p>

      <h3>Feedback</h3>
      <p>${escapeHtml(conversation.report.summary)}</p>

      <h3>Recommendation</h3>
      <p>${escapeHtml(conversation.report.recommendation)}</p>

      <h3>Conversation transcript</h3>
      <pre class="transcript">${escapeHtml(
        formatTranscript(conversation.transcript)
      )}</pre>

      <div class="hero-actions">
        <a class="button button-primary" href="./conversations.html">
          Back to conversations
        </a>
      </div>
    </div>
  `;
}

function showSignedOut() {
  conversationData.innerHTML = `
    <div class="empty-report">
      <div class="empty-report-icon" aria-hidden="true">â—‹</div>
      <h2>Sign in to view your conversations</h2>
      <p>Use the sign-in link on the sign-up page, then return here to review your training feedback.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="./index.html#enrollment">Go to sign in</a>
      </div>
    </div>
  `;
}

function showLoadError(message) {
  conversationData.innerHTML = `
    <div class="empty-report">
      <h2>Conversations are unavailable right now</h2>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

const result = await getConversations();

if (result.status === "signed-out") {
  showSignedOut();
} else if (result.status === "error") {
  showLoadError(result.message);
} else {
  const conversations = result.conversations;
  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selection
  );

  if (conversations.length === 0) {
    conversationData.innerHTML = `
      <div class="empty-report">
        <h2>No conversations available for review</h2>
        <p>Complete a simulation to generate a report.</p>
      </div>
    `;
  } else if (selectedConversation) {
    showReport(selectedConversation);
  } else {
    showConversations(conversations);
  }
}
