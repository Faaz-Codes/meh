(function () {
  const SUPABASE_URL = 'https://nuy8yd7x-s9kuql3oq0fhq.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_nuY8yd7X-s9KuQL3OQ0FHQ_kqDPXYJu';

  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    throw new Error('Supabase SDK not loaded.');
  }

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  window.SupabaseClient = {
    client
  };
})();
