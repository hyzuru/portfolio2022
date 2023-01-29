export function reload() {
  const reload = () => {
    window.location.reload();
  }

  const mediaQuery = window.matchMedia('(min-width: 48em)');
  mediaQuery.addEventListener('change', reload);
}