(function () {
  const expectedFolder = document.body.dataset.folder;
  const messageElement = document.getElementById('auth-message');
  const logoutButton = document.getElementById('logout-button');

  function redirectToLogin() {
    window.location.href = '../index.html';
  }

  async function enforceAuth() {
    try {
      const user = await window.Auth.getCurrentUser();
      if (!user) {
        redirectToLogin();
        return;
      }

      const profile = await window.Auth.getProfile(user.id);
      const actualFolder = window.Auth.resolveFolderByDashboardCode(profile.dashboard_code);

      if (!actualFolder || actualFolder !== expectedFolder) {
        redirectToLogin();
        return;
      }

      if (messageElement) {
        messageElement.textContent = `Signed in as ${user.email}`;
      }
    } catch (_error) {
      redirectToLogin();
    }
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', async function () {
      await window.Auth.signOut();
      redirectToLogin();
    });
  }

  enforceAuth();
})();
