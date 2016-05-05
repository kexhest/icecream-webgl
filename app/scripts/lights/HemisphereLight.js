/* global dat */

/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

// const params = {
//   H: 0.62,
//   S: 1,
//   L: 0.55,
// };

// const gui = new dat.GUI();
// gui.add(params, 'H', 0, 1);
// gui.add(params, 'S', 0, 1);
// gui.add(params, 'L', 0, 1);
// gui.open();

/**
 * This is the HemisphereLight class.
 */
export default class HemisphereLight extends THREE.HemisphereLight {

  /**
   * Create HemisphereLight.
   *
   * @return {void}
   */
  constructor(scene, options) {
    const opts = {
      color: 0xffffff,
      intensity: 1,
      ...options,
    };

    super(opts.color, opts.intensity);

    if (scene) scene.add(this);
  }

  update() {
  }

}
