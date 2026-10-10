// Loaded synchronously in <head> so the stored theme and language apply before first paint.
try {
  const theme = localStorage.getItem('theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;

  const locale = localStorage.getItem('locale');
  if (locale === 'es' || locale === 'en') document.documentElement.lang = locale;
} catch {}
