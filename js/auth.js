import { supabase } from "./supabaseClient.js";

const form = document.getElementById("login-form");
const errorEl = document.getElementById("error");

const DASHBOARD_FOLDERS = ["Fz", "Rt", "Ak", "Ar"];

async function routeUserByProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("dashboard_folder")
    .eq("id", userId)
    .single();

  if (error) throw error;

  const folder = data?.dashboard_folder;
  if (!DASHBOARD_FOLDERS.includes(folder)) {
    throw new Error("Profile is missing a valid dashboard folder assignment.");
  }

  window.location.href = `/${folder}/`;
}

const { data: sessionData } = await supabase.auth.getSession();
if (sessionData.session?.user) {
  await routeUserByProfile(sessionData.session.user.id);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorEl.textContent = "";

  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorEl.textContent = error.message;
    return;
  }

  await routeUserByProfile(data.user.id);
});
