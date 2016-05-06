/*
 * This file is part of the ice cream example.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';

const {
  PI,
} = Math;

const TWO_PI = PI * 2;

/**
 * This is the Sky class.
 */
export default class Sky extends THREE.Mesh {

  /**
   * Create Sky.
   *
   * @param {object} options
   *
   * @return {void}
   */
  constructor(options) {
    const opts = {
      radius: 1000,
      widthSegments: 32,
      heightSegments: 32,
      phiStart: 0,
      phiLength: TWO_PI,
      thetaStart: 0,
      thetaLength: PI,
      topColor: 0xdddddd,
      bottomColor: 0xffffff,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      ...options,
    };

    const geometry = new THREE.SphereGeometry(
      opts.radius,
      opts.widthSegments,
      opts.heightSegments,
      opts.phiStart,
      opts.phiLength,
      opts.thetaStart,
      opts.thetaLength
    );

    const material = new THREE.ShaderMaterial({
      uniforms: {
        topColor: {
          type: 'c',
          value: new THREE.Color(opts.topColor),
        },
        bottomColor: {
          type: 'c',
          value: new THREE.Color(opts.bottomColor),
        },
        offset: {
          type: 'f',
          value: 95,
        },
        exponent: {
          type: 'f',
          value: 10,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.BackSide,
    });

    super(geometry, material);

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;
  }

  /**
   * Update.
   *
   * @return {void}
   */
  update() {
  }

}
