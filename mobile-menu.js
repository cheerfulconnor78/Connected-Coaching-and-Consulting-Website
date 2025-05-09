document.addEventListener('DOMContentLoaded', () => {
  // — Mobile menu & submenus —
  const mobileMenuBtn = document.querySelector('.mobile-menu');
  const mobileDropdown = document.querySelector('.mobile-dropdown');
  if (mobileMenuBtn && mobileDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDropdown.classList.toggle('show');
    });
    mobileDropdown.querySelectorAll('button').forEach(btn => {
      btn.setAttribute('type','button');
      btn.addEventListener('click', e => {
        e.preventDefault();
        btn.nextElementSibling.classList.toggle('hidden');
      });
    });
    document.addEventListener('click', e => {
      if (!mobileMenuBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
        mobileDropdown.classList.remove('show');
        mobileDropdown.querySelectorAll('div').forEach(sub => sub.classList.add('hidden'));
      }
    });
  }

  // — Desktop dropdowns —
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.setAttribute('type','button');
    const dropdown = document.getElementById(`${btn.dataset.dropdown}-dropdown`);
    if (!dropdown) return;
    btn.addEventListener('click', e => {
      e.preventDefault();
      dropdown.classList.toggle('hidden');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.relative')) {
      document.querySelectorAll('.dropdown-content').forEach(menu => {
        menu.classList.add('hidden');
      });
    }
  });
});
