(function () {
  const DASHBOARD_FOLDER_BY_CODE = {
    Fz: 'Faaz-Fz',
    Rt: 'Ruth-Rt',
    Ak: 'Akshaya-Ak',
    Ar: 'Archith-Ar'
  };

  function getClient() {
    if (!window.SupabaseClient || !window.SupabaseClient.client) {
      throw new Error('Supabase client unavailable.');
    }
    return window.SupabaseClient.client;
  }

  async function getCurrentUser() {
    const supabase = getClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return data.user;
  }

  async function getProfile(userId) {
    const supabase = getClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('id, dashboard_code')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async function signInWithEmailPassword(email, password) {
    const supabase = getClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw error;
    }

    return data.user;
  }

  async function signOut() {
    const supabase = getClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  function resolveFolderByDashboardCode(code) {
    return DASHBOARD_FOLDER_BY_CODE[code] || null;
  }

  window.Auth = {
    getCurrentUser,
    getProfile,
    signInWithEmailPassword,
    signOut,
    resolveFolderByDashboardCode
  };
})();
