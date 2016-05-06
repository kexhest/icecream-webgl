/*
 * This file is part of the ice cream example.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';
import CANNON from 'cannon';

const {
  PI,
} = Math;

const HALF_PI = PI * 0.5;

/**
 * This is the Ground class.
 */
export default class Ground extends THREE.Mesh {

  /**
   * Create Ground.
   *
   * @param {object} options
   *
   * @return {void}
   */
  constructor(options) {
    const opts = {
      color: 0xdddddd,
      specular: 0x000000,
      distance: 10000,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      ...options,
    };

    const geometry = new THREE.PlaneBufferGeometry(opts.distance, opts.distance);

    const material = new THREE.MeshPhongMaterial({
      color: opts.color,
      specular: opts.specular,
    });

    material.color.setHSL(0, 0, 0.5);

    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-HALF_PI));

    super(geometry, material);

    this.shape = new CANNON.Plane();
    this.body = new CANNON.Body({ mass: 0 });

    this.body.addShape(this.shape);
    this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -HALF_PI);

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;

    this.receiveShadow = true;
  }

  /**
   * Update.
   *
   * @return {void}
   */
  update() {
  }

}
