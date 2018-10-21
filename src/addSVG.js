const BORDER_CORNER_RADIUS = 10;

const addSVG = (element, corners, sizeRef = element) => {
  const {topLeft, topRight, bottomLeft, bottomRight} = corners;
  element.setAttribute('data-corners', JSON.stringify(corners));
  const height = sizeRef.offsetHeight;
  const width = sizeRef.offsetWidth;
  const points = [];
  topLeft
    ? points.push([0.5, BORDER_CORNER_RADIUS + 0.5], [BORDER_CORNER_RADIUS + 0.5, 0.5])
    : points.push([0.5,0.5]);
  topRight
    ? points.push([width - (BORDER_CORNER_RADIUS + 0.5), 0.5], [width - 0.5, BORDER_CORNER_RADIUS + 0.5])
    : points.push([width - 0.5, 0.5]);
  bottomRight
    ? points.push([width - 0.5, height - (BORDER_CORNER_RADIUS + 0.5)], [width - (BORDER_CORNER_RADIUS + 0.5), height - 0.5])
    : points.push([width - 0.5, height - 0.5]);
  bottomLeft
    ? points.push([BORDER_CORNER_RADIUS - 0.5, height - 0.5], [0.5, height - (BORDER_CORNER_RADIUS + 0.5)])
    : points.push([0.5, height - 0.5]);
  topLeft
    ? points.push([0.5, BORDER_CORNER_RADIUS + 0.5])
    : points.push([0.5, 0.5]);
  const path = `
    <path d="${points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')}"></path>
  `;
  element.querySelector('.border-svg').innerHTML = path;
}

window.addEventListener('resize', () => {
  [...document.querySelectorAll('[data-corners]')].forEach(el => {
    if (el) {
      addSVG(el, JSON.parse(el.getAttribute('data-corners')));
    }
  });
});

export default addSVG;
