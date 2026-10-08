(() => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.site-links');
  const mobile = window.matchMedia('(max-width: 860px)');
  const setMenu = () => {
    if (!toggle || !links) return;
    links.hidden = mobile.matches;
    toggle.setAttribute('aria-expanded', String(!mobile.matches));
    toggle.textContent = 'Menu';
  };
  setMenu();
  mobile.addEventListener('change', setMenu);
  toggle?.addEventListener('click', () => {
    links.hidden = !links.hidden;
    toggle.setAttribute('aria-expanded', String(!links.hidden));
    toggle.textContent = links.hidden ? 'Menu' : 'Close';
  });
  links?.addEventListener('click', (event) => {
    if (mobile.matches && event.target.closest('a')) {
      links.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }
  });
  const openTarget = (hash, scroll) => {
    if (!hash || hash === '#') return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    const panel = target.matches('.grade-panel') ? target : target.closest('.grade-panel');
    if (panel) {
      document.querySelectorAll('.grade-panel').forEach(other => { other.open = other === panel; });
      if (scroll) requestAnimationFrame(() => target.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'}));
    }
  };
  document.querySelectorAll('.grade-nav a').forEach(a => a.addEventListener('click', () => openTarget(new URL(a.href).hash, true)));
  document.querySelectorAll('.grade-panel').forEach(panel => panel.addEventListener('toggle', () => {
    if (panel.open) document.querySelectorAll('.grade-panel').forEach(other => { if (other !== panel && other.open) other.open = false; });
  }));
  window.addEventListener('hashchange', () => openTarget(location.hash, true));
  openTarget(location.hash, false);
})();
