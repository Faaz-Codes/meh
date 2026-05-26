import { supabase } from "/js/supabaseClient.js";

const DASHBOARD_FOLDERS = ["Fz", "Rt", "Ak", "Ar"];
const currentFolder = window.location.pathname.split("/").filter(Boolean)[0];

const titleEl = document.getElementById("title");
const welcomeEl = document.getElementById("welcome");
const habitsEl = document.getElementById("habits");
const journalEl = document.getElementById("journal");
const logoutButton = document.getElementById("logout");

if (!DASHBOARD_FOLDERS.includes(currentFolder)) {
  window.location.href = "/";
}

async function loadDashboard() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    window.location.href = "/";
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, dashboard_folder")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile) {
    window.location.href = "/";
    return;
  }

  if (profile.dashboard_folder !== currentFolder) {
    window.location.href = `/${profile.dashboard_folder}/`;
    return;
  }

  titleEl.textContent = `${currentFolder} Dashboard`;
  welcomeEl.textContent = `Welcome ${profile.full_name || session.user.email}`;

  const { data: habits } = await supabase
    .from("habits")
    .select("title, status")
    .order("created_at", { ascending: false })
    .limit(10);

  habitsEl.innerHTML = habits?.length
    ? habits.map((habit) => `<li>${habit.title} — ${habit.status}</li>`).join("")
    : "<li>No habits yet.</li>";

  const { data: journal } = await supabase
    .from("journal")
    .select("entry_date, content")
    .order("entry_date", { ascending: false })
    .limit(10);

  journalEl.innerHTML = journal?.length
    ? journal.map((entry) => `<li>${entry.entry_date}: ${entry.content}</li>`).join("")
    : "<li>No journal entries yet.</li>";
}

logoutButton.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "/";
});

loadDashboard();
