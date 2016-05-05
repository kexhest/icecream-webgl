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
 * This is the DirectionalLight class.
 */
export default class DirectionalLight extends THREE.DirectionalLight {

  /**
   * Create DirectionalLight.
   *
   * @return {void}
   */
  constructor(scene, options) {
    const opts = {
      color: 0xcccccc,
      intensity: 0.8,
      position: {
        x: -1,
        y: 1.75,
        z: 1,
      },
      ...options,
    };

    super(opts.color, opts.intensity);

    const distance = 128;

    this.shadow.camera.left = -distance;
    this.shadow.camera.right = distance;
    this.shadow.camera.top = distance;
    this.shadow.camera.bottom = -distance;

    this.shadow.mapSize.width = 2048;
    this.shadow.mapSize.height = 2048;

    // this.shadow.camera.far = 350;
    // this.shadow.bias = -0.01;

    // this.color.setHSL(0.1, 1, 0.95);
    this.position.set(opts.position.x, opts.position.y, opts.position.z);
    this.position.multiplyScalar(128);

    this.castShadow = true;

    if (scene) scene.add(this);
  }

  update() {
  }

}
