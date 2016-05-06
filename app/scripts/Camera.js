/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

const {
  PI,
  sin,
  cos,
  min,
  max,
} = Math;

export default class Camera extends THREE.PerspectiveCamera {

  /**
   * Create Camera.
   *
   * @param {object} options
   *
   * @return {void}
   */
  constructor(options) {
    const { innerWidth: width, innerHeight: height } = window;

    const opts = {
      fov: 75,
      aspect: width / height,
      near: 1,
      far: 10000,
      position: {
        x: 0,
        y: 64,
        z: 128,
      },
      ...options,
    };

    super(opts.fov, opts.aspect, opts.near, opts.far);

    this.width = width;
    this.height = height;

    this.halfWidth = width * 0.5;
    this.halfHeight = height * 0.5;

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;
  }

  /**
   * Set size.
   *
   * @param {number} width
   * @param {number} height
   *
   * @return {void}
   */
  setSize(width, height) {
    this.width = width;
    this.height = height;

    this.aspect = width / height;
    this.updateProjectionMatrix();
  }

  /**
   * Update camera position and angle according to mouse movement.
   *
   * @param {object} mouse
   * @param {object} target
   *
   * @return {void}
   */
  update(mouse, target) {
    this.position.x = 144 * sin(((mouse.x - this.halfWidth) / this.halfWidth) * PI);
    // this.position.x += ((mouse.x - this.halfWidth) - this.position.x) * 0.01;
    // this.position.x = min(this.position.y, 256);

    this.position.z = 144 * cos(((mouse.x - this.halfWidth) / this.halfWidth) * PI);
    // this.position.z += ((mouse.x - this.halfWidth) - this.position.x) * 0.01;
    // this.position.z = min(this.position.z, 256);

    this.position.y += (-(mouse.y - this.halfHeight - 64) - this.position.y) * 0.005;
    this.position.y = max(this.position.y, 16);
    this.lookAt(target);
  }

}
