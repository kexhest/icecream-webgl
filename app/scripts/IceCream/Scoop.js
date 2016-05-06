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
const HALF_PI = PI * 0.5;

const colors = [
  0x59332e,
  0xfff373,
  0x6ed0f4,
  0xf26e7e,
];

// const rand = (low, high) => ~~(random() * (high - low) + low);

export default class Scoop extends THREE.Mesh {

  constructor(world, options) {
    const opts = {
      radius: 24,
      widthSegments: 32,
      heightSegments: 32,
      phiStart: 0,
      phiLength: TWO_PI,
      thetaStart: 0,
      thetaLength: PI,
      color: sample(colors),
      rim: true,
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

    geometry.mergeVertices();

    const modifier = opts.rim ? 448 : 0;

    // const facets = [];

    for (let i = 0; i < geometry.vertices.length - modifier; i++) {
      const v = geometry.vertices[i];

      // facets.push({
      //   y: v.y,
      //   x: v.x,
      //   z: v.z,
      //   ang: random() * TWO_PI,
      //   amp: 0.25 + random() * (v.x * v.y) * 0.01, // random() * 0.5,
      //   speed: 0.016 + random() * 0.032,
      // });

      const angle = random() * TWO_PI;
      const amp = random() * 2; // 0.25 + random() * (v.x * v.y) * 0.01;

      v.x += cos(angle) * amp;
      v.y += sin(angle) * amp;
    }

    const material = new THREE.MeshPhongMaterial({
      color: opts.color,
      // transparent: true,
      // opacity: 0.8,
      // shading: THREE.FlatShading,
    });

    super(geometry, material);

    // this.facets = facets

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;

    this.shape = new CANNON.Sphere(opts.radius + 1);
    this.body = new CANNON.Body({ mass: 0 });
    this.body.addShape(this.shape);

    this.body.position.set(this.position.x, this.position.y + 64, this.position.z);
    this.body.quaternion.copy(this.quaternion);

    world.physics.addBody(this.body);

    this.receiveShadow = true;
    this.castShadow = true;

    if (opts.rim) this.createRim(material, opts.position);
  }

  createRim(material, position) {
    const geometry = new THREE.TorusGeometry(24, 2, 16, 64);

    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-HALF_PI));
    geometry.mergeVertices();

    for (let i = 0; i < geometry.vertices.length; i++) {
      const v = geometry.vertices[i];

      const angle = random() * TWO_PI;
      const amp = random() * 0.5;

      v.x += cos(angle) * amp;
      v.y += sin(angle) * amp;
    }

    const rim = new THREE.Mesh(geometry, material);

    rim.position.y = -position.y;

    rim.receiveShadow = true;
    rim.castShadow = true;

    this.add(rim);
  }

  update() {
    // this.position.copy(this.body.position);
    // this.quaternion.copy(this.body.quaternion);

    // for (let i = 0; i < this.geometry.vertices.length; i++) {
    //   const v = this.geometry.vertices[i];
    //   const f = this.facets[i];

    //   v.x = f.x + cos(f.ang) * f.amp;
    //   v.y = f.y + sin(f.ang) * f.amp;
    //   f.ang += f.speed;
    // }

    // this.geometry.verticesNeedUpdate = true;
  }

}
