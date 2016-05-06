/*
 * This file is part of the ice cream example.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

/**
 * This is the HemisphereLight class.
 */
export default class HemisphereLight extends THREE.HemisphereLight {

  /**
   * Create HemisphereLight.
   *
   * @param {object} scene
   * @param {object} options
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

  /**
   * Update.
   *
   * @return {void}
   */
  update() {
  }

}
