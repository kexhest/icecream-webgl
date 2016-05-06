/*
 * This file is part of the ice cream example.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

export default class WebGLRenderer extends THREE.WebGLRenderer {

  /**
   * Create WebGLRenderer.
   *
   * @return {void}
   */
  constructor(options) {
    const { innerWidth: width, innerHeight: height, devicePixelRatio: pixelRatio } = window;

    const opts = {
      container: document.body,
      alpha: true,
      antialias: true,
      ...options,
    };

    super({ alpha: opts.alpha, antialias: opts.antialias });

    this.setSize(width, height);
    this.setPixelRatio(pixelRatio);

    this.shadowMap.enabled = true;
    this.shadowMapSoft = true;

    this.domElement.style.position = 'fixed';
    this.domElement.style.top = 0;
    this.domElement.style.left = 0;

    opts.container.appendChild(this.domElement);
  }

}
