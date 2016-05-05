/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import App from './App';

let LOADED = false;

function bootstrap() {
  if (LOADED) return;

  LOADED = true;

  document.removeEventListener('DOMContentLoaded', bootstrap);
  window.removeEventListener('load', bootstrap);

  if (!window.WebGLRenderingContext) {
    window.location = 'http://get.webgl.org';
  } else {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl');

    if (!context) {
      window.location = 'http://get.webgl.org/troubleshooting';
    } else {
      window.app = new App();
    }
  }
}

document.addEventListener('DOMContentLoaded', bootstrap, false);
window.addEventListener('load', bootstrap, false);
