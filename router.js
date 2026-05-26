(function () {
  const form = document.getElementById('login-form');
  const passwordInput = document.getElementById('password');
  const message = document.getElementById('message');

  if (!form || !passwordInput || !message || !window.PasswordHandler) {
    return;
  }

  function routeToDashboard(folderName) {
    window.location.href = `${folderName}/dashboard.html`;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const folderName = window.PasswordHandler.resolveFolderByPassword(passwordInput.value);

    if (!folderName) {
      message.textContent = 'Invalid password. Please try again.';
      return;
    }

    message.textContent = `Access granted. Loading ${folderName}...`;
    routeToDashboard(folderName);
  });
})();
