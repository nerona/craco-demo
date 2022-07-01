export function createEleAndClick(href: string) {
  const elem = document.createElement('a');
  elem.style.display = 'none';
  elem.href = href;
  elem.target = '_blank';
  elem.rel = 'noopener noreferrer';
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
