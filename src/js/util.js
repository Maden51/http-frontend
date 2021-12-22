export default function modalClose() {
  const close = document.querySelector('.active');
  if (close) {
    close.classList.remove('active');
  }
}
