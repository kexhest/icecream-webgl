/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

/**
 * This is the AmbientLight class.
 */
export default class AmbientLight extends THREE.AmbientLight {

  /**
   * Create AmbientLight.
   *
   * @return {void}
   */
  constructor(scene, options) {
    const opts = {
      color: 0xffffff,
      intensity: 0.5,
      ...options,
    };

    super(opts.color, opts.intensity);

    if (scene) scene.add(this);
  }

  update() {
  }

}
