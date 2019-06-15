import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
// scale effect to animate the display of the messages
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const defaults = {
  position: 'top-right',
  effect: 'scale',
  timeout: 3500,
  offset: 45,
};

export { Alert };

export const success = (message, options = {}) => {
  Alert.success(message, Object.assign(defaults, options));
};

export const info = (message, options = {}) => {
  Alert.info(message, Object.assign(defaults, options));
};

export const warning = (message, options = {}) => {
  Alert.warning(message, Object.assign(defaults, options));
};

export const error = (message, options = {}) => {
  Alert.error(message, Object.assign(defaults, options));
};
