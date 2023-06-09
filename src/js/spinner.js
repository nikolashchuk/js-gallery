import { Spinner } from 'spin.js';
import { refs } from './refs';

var opts = {
  lines: 8, // The number of lines to draw
  length: 55, // The length of each line
  width: 7, // The line thickness
  radius: 37, // The radius of the inner circle
  scale: 1.2, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 0.7, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#00ff6e', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

export const spinner = new Spinner(opts);
export const spinnerPlay = () => {
  spinner.spin(refs.spinner);
  refs.backdrop.classList.remove('is-hidden');
};

export const spinnerStop = () => {
  spinner.stop();
  refs.backdrop.classList.add('is-hidden');
};
