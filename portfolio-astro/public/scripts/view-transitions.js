// Увімкнення View Transitions для навігації без SPA
if (document.startViewTransition) {
  const delegate = (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const url = new URL(a.href);
    if (url.origin !== location.origin || a.hasAttribute('download') || a.target === '_blank') return;
    e.preventDefault();
    document.startViewTransition(async () => {
      window.location.href = a.href;
    });
  };
  document.addEventListener('click', delegate);
}