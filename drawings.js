// Native scrolling and touch panning preserve the exact uploaded drawing.
const viewport = document.querySelector('.sheet-viewport');
const canvas = document.querySelector('.sheet-canvas');
const zoomValue = document.querySelector('.zoom-value');
const zoomOut = document.querySelector('[data-zoom="out"]');
const zoomIn = document.querySelector('[data-zoom="in"]');
let zoom = 1;

function setZoom(next, reset = false) {
  const x = (viewport.scrollLeft + viewport.clientWidth / 2) / canvas.offsetWidth;
  const y = (viewport.scrollTop + viewport.clientHeight / 2) / Math.max(canvas.offsetHeight, 1);
  zoom = Math.min(4, Math.max(1, next));
  canvas.style.width = `${zoom * 100}%`;
  zoomValue.textContent = `${Math.round(zoom * 100)}%`;
  zoomOut.disabled = zoom <= 1;
  zoomIn.disabled = zoom >= 4;
  viewport.scrollLeft = reset ? 0 : x * canvas.offsetWidth - viewport.clientWidth / 2;
  viewport.scrollTop = reset ? 0 : y * canvas.offsetHeight - viewport.clientHeight / 2;
}

if (viewport && canvas) {
  const selector = document.querySelector('#sheet-select');
  selector?.addEventListener('change', () => {
    const option = selector.selectedOptions[0];
    const img = canvas.querySelector('img');
    img.src = option.value;
    img.alt = option.textContent + ' — complete drawing with original title block';
    document.querySelector('[data-sheet-open]').href = option.value;
    const download = document.querySelector('[data-sheet-download]');
    download.href = option.value;
    download.download = option.dataset.name;
    setZoom(1, true);
  });
  document.querySelectorAll('[data-zoom]').forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.zoom;
      setZoom(action === 'fit' ? 1 : zoom + (action === 'in' ? .5 : -.5), action === 'fit');
    });
  });
  viewport.addEventListener('keydown', event => {
    if (['+', '=', '-', '0'].includes(event.key)) {
      event.preventDefault();
      setZoom(event.key === '0' ? 1 : zoom + (event.key === '-' ? -.5 : .5), event.key === '0');
    }
  });
}
