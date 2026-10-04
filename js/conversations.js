import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://kjwgodmsdclkljukryft.supabase.co",
  "sb_publishable_B8bshQswHtxR8oSlpqXPbg_g9-GXNQz"
);

const DEMO = true;
const TEST_SIGNUP_REQUEST_ID = "813c253a-0a38-424f-9a94-5db03fb5697b";

const demoConversations = [
  {
    id: "demo-sms",
    title: "Demo Convo",
    date: "October 3, 2026",
    channel: "SMS",
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
    report: {
      summary: "Demo conversation 2",
      recommendation: "Lock in again gng."
    }
  }
];

const conversationData = document.querySelector("#conversation");
const selection = new URLSearchParams(window.location.search).get("id");

async function getConversations() {
  if (DEMO) {
    return demoConversations;
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
    .eq("signup_request_id", TEST_SIGNUP_REQUEST_ID)
    .order("started_at", { ascending: false });

    if (error) {
        console.error(error);
        throw error;
    }

    console.log("Conversation query result:", { data, error });

    return data.map((conversation) => ({
        id: conversation.id,
        title: conversation.campaign || "Training conversation",
        date: conversation.started_at
            ? new Date(conversation.started_at).toLocaleString()
            : "Date unavailable",
        channel: (conversation.kind || "Call").toUpperCase(),
        report: {
            summary: conversation.summary || "No summary available yet.",
            recommendation:
            conversation.followups || "No recommendation available yet."
        }
    }));
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
                 href="./conversations.html?id=${conversation.id}">
                ${conversation.title} — ${conversation.channel}
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
      <p class="eyebrow">${conversation.channel} conversation</p>
      <h2>${conversation.title}</h2>
      <p>${conversation.date}</p>

      <h3>Feedback</h3>
      <p>${conversation.report.summary}</p>

      <h3>Recommendation</h3>
      <p>${conversation.report.recommendation}</p>

      <div class="hero-actions">
        <a class="button button-primary" href="./conversations.html">
          Back to conversations
        </a>
      </div>
    </div>
  `;
}

const conversations = await getConversations();

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

const selectedConversation = conversations.find(
  (conversation) => conversation.id === selection
);

if (selectedConversation) {
  showReport(selectedConversation);
} else {
  showConversations(conversations);
}