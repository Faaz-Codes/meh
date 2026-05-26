(function () {
  const PASSWORD_MAP = {
    'faaz123': 'Faaz-Fz',
    'ruth123': 'Ruth-Rt',
    'akshaya123': 'Akshaya-Ak',
    'archith123': 'Archith-Ar'
  };

  function resolveFolderByPassword(password) {
    const normalized = String(password || '').trim();
    return PASSWORD_MAP[normalized] || null;
  }

  window.PasswordHandler = {
    resolveFolderByPassword
  };
})();
