const BORDER_CORNER_RADIUS = 10;

const sizeRefs = [];

const addSVG = (element, corners, sizeRef = element) => {
  const {topLeft, topRight, bottomLeft, bottomRight} = corners;
  element.setAttribute('data-corners', JSON.stringify(corners));
  if (sizeRef !== element) {
    sizeRefs.push([element, sizeRef]);
  }
  const height = sizeRef.offsetHeight;
  const width = sizeRef.offsetWidth;
  const points = [];
  topLeft
    ? points.push([1, BORDER_CORNER_RADIUS + 1], [BORDER_CORNER_RADIUS + 1, 1])
    : points.push([1,1]);
  topRight
    ? points.push([width - (BORDER_CORNER_RADIUS + 1), 1], [width - 1, BORDER_CORNER_RADIUS + 1])
    : points.push([width - 1, 1]);
  bottomRight
    ? points.push([width - 1, height - (BORDER_CORNER_RADIUS + 1)], [width - (BORDER_CORNER_RADIUS + 1), height - 1])
    : points.push([width - 1, height - 1]);
  bottomLeft
    ? points.push([BORDER_CORNER_RADIUS - 1, height - 1], [1, height - (BORDER_CORNER_RADIUS + 1)])
    : points.push([1, height - 1]);
  topLeft
    ? points.push([1, BORDER_CORNER_RADIUS + 1])
    : points.push([1, 1]);
  const path = `
    <path d="${points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')}"></path>
  `;
  element.querySelector('.border-svg').innerHTML = path;
}

window.addEventListener('resize', () => {
  [...document.querySelectorAll('[data-corners]')].forEach(el => {
    if (el) {
      let sizeRef = el;
      sizeRefs.forEach(([main, ref]) => {
        if (main === el) {
          sizeRef = ref;
        }
      });
      addSVG(el, JSON.parse(el.getAttribute('data-corners')), sizeRef);
    }
  });
});

export default addSVG;
