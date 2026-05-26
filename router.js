(function () {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const message = document.getElementById('message');

  if (!form || !emailInput || !passwordInput || !message || !window.Auth) {
    return;
  }

  function routeToDashboard(folderName) {
    window.location.href = `${folderName}/dashboard.html`;
  }

  async function routeFromExistingSession() {
    try {
      const user = await window.Auth.getCurrentUser();
      if (!user) {
        return;
      }

      const profile = await window.Auth.getProfile(user.id);
      const folderName = window.Auth.resolveFolderByDashboardCode(profile.dashboard_code);

      if (folderName) {
        routeToDashboard(folderName);
      }
    } catch (error) {
      message.textContent = error.message;
    }
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    message.textContent = 'Signing in...';

    try {
      const user = await window.Auth.signInWithEmailPassword(emailInput.value.trim(), passwordInput.value);
      const profile = await window.Auth.getProfile(user.id);
      const folderName = window.Auth.resolveFolderByDashboardCode(profile.dashboard_code);

      if (!folderName) {
        throw new Error('No dashboard route configured for this user.');
      }

      message.textContent = `Access granted. Loading ${folderName}...`;
      routeToDashboard(folderName);
    } catch (error) {
      message.textContent = error.message || 'Login failed. Please try again.';
    }
  });

  routeFromExistingSession();
})();
