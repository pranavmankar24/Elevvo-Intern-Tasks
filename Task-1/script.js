const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('toggleBtn');

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
