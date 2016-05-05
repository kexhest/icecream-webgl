/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';
import CANNON from 'cannon';

import { sample } from 'lodash/collection';

const {
  PI,
  sin,
  cos,
  random,
} = Math;

const TWO_PI = PI * 2;
// const HALF_PI = PI * 0.5;

const colors = [
  0xfff373,
  0x6ed0f4,
  0xf26e7e,
];

const rand = (low, high) => random() * (high - low) + low;

export default class Sprinkle extends THREE.Mesh {

  constructor(world, options) {
    const opts = {
      color: sample(colors),
      radiusTop: 1,
      radiusBottom: 1,
      height: 4,
      radiusSegments: 8,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: TWO_PI,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      ...options,
    };

    const geometry = new THREE.CylinderGeometry(
      opts.radiusTop,
      opts.radiusBottom,
      opts.height,
      opts.radiusSegments,
      opts.heightSegments,
      opts.openEnded,
      opts.thetaStart,
      opts.thetaLength
    );

    // geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-HALF_PI));
    geometry.mergeVertices();

    for (let i = 0; i < geometry.vertices.length; i++) {
      const v = geometry.vertices[i];

      const angle = random() * TWO_PI;
      const amp = random() * (v.x * v.y) * 0.01;

      v.x += cos(angle) * amp;
      v.y += sin(angle) * amp;
    }

    const material = new THREE.MeshPhongMaterial({
      color: opts.color,
      // transparent: true,
      // opacity: 0.8,
      shading: THREE.FlatShading,
    });

    super(geometry, material);

    this.rotation.x = -PI + rand(0, TWO_PI);

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;

    this.shape = new CANNON.Cylinder(opts.radiusTop, opts.radiusBottom, opts.height, 4);
    this.body = new CANNON.Body({ mass: 0.01 });
    this.body.addShape(this.shape);

    this.body.position.copy(this.position);
    this.body.quaternion.copy(this.quaternion);

    // this.body.linearDamping = 0.1;

    world.physics.addBody(this.body);

    this.receiveShadow = true;
    this.castShadow = true;

    // this.update = this.update.bind(this);
  }

  update() {
    this.position.copy(this.body.position);
    this.quaternion.copy(this.body.quaternion);
  }

}
