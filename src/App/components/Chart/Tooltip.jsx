import { CHART_JS_ROOT_ID, CUSTOM_CHART_JS_CLASS } from '../../global/constants';

export const createTooltipElement = (tooltipClass) => {
  let tooltipEl = document.getElementById(CHART_JS_ROOT_ID);
  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = CHART_JS_ROOT_ID;
  }
  tooltipEl.innerHTML = `<div class="${CUSTOM_CHART_JS_CLASS} ${tooltipClass || ''}"></div>`;
  document.body.appendChild(tooltipEl);

  return tooltipEl;
};

export const toggleTooltip = (tooltipModel, tooltipEl) => {
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.display = 'none';
    return;
  } else {
    tooltipEl.style.display = 'block';
  }
};

export const configureTooltipPosition = (context, tooltipEl, offsetDistance) => {
  const tooltipModel = context.tooltip;
  const position = context.chart.canvas.getBoundingClientRect();
  const respWidthAdjustments =
    tooltipModel.caretX > position.width / 2 ? tooltipEl.offsetWidth + (offsetDistance || 0) : 0;
  const respHeightAdjustments =
    tooltipModel.caretY > position.height / 2 ? tooltipEl.offsetHeight + (offsetDistance || 0) : 0;

  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform');
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add('no-transform');
  }

  // Tooltip root position
  tooltipEl.style.opacity = '1';
  tooltipEl.style.position = 'absolute';
  tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - respWidthAdjustments + 'px';
  tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - respHeightAdjustments + 'px';
  tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
  tooltipEl.style.pointerEvents = 'none';
};
