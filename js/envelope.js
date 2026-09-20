const envelopeButton = document.querySelector('#envelopeButton');
const tapPrompt = document.querySelector('#tapPrompt');
envelopeButton?.addEventListener('click', () => {
  if (envelopeButton.classList.contains('is-opening')) return;
  envelopeButton.classList.add('is-opening');
  tapPrompt.textContent = 'Opening your letter...';
  window.setTimeout(() => { window.location.href = 'main.html'; }, 1250);
});
