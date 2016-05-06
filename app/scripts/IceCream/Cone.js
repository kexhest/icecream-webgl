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

// const color = 0x59332e;
const color = 0xdda678;

const {
  PI,
  sin,
  cos,
  random,
} = Math;

const TWO_PI = PI * 2;
const HALF_PI = PI * 0.5;

export default class Cone extends THREE.Mesh {

  constructor(world, options) {
    const opts = {
      radiusTop: 24,
      radiusBottom: 0,
      height: 64,
      radiusSegments: 32,
      heightSegments: 16,
      openEnded: false,
      thetaStart: 0,
      thetaLength: TWO_PI,
      position: {
        x: 0,
        y: -32,
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

    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-HALF_PI));
    geometry.mergeVertices();

    // const facets = [];

    for (let i = 0; i < geometry.vertices.length; i++) {
      const v = geometry.vertices[i];

      // facets.push({
      //   y: v.y,
      //   x: v.x,
      //   z: v.z,
      //   ang: random() * TWO_PI,
      //   amp: random() * (v.x * v.y) * 0.01, // random() * 0.5,
      //   speed: 0.016 + random() * 0.032,
      // });

      const angle = random() * TWO_PI;
      const amp = i < 96 ? random() * (v.x * v.y) * 0.0025 : random() * (v.x * v.y) * 0.01;

      v.x += cos(angle) * amp;
      v.y += sin(angle) * amp;
    }

    const material = new THREE.MeshPhongMaterial({
      color,
      // transparent: true,
      // opacity: 0.8,
      shading: THREE.FlatShading,
    });

    super(geometry, material);

    // this.facets = facets;

    this.rotation.x = HALF_PI;

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;

    this.shape = new CANNON.Cylinder(opts.radiusTop, opts.radiusBottom, opts.height, 32);
    this.body = new CANNON.Body({ mass: 0 });
    this.body.addShape(this.shape);

    this.body.position.set(this.position.x, this.position.y + 64, this.position.z);
    this.body.quaternion.copy(this.quaternion);

    world.physics.addBody(this.body);

    this.receiveShadow = true;
    this.castShadow = true;
  }

  update() {
    // this.position.copy(this.body.position);
    // this.quaternion.copy(this.body.quaternion);

    // skip 128 first, since they make up the upper edge
    // and we want it to be fixed.
    // for (let i = 128; i < this.geometry.vertices.length; i++) {
    //   const v = this.geometry.vertices[i];
    //   const f = this.facets[i];

    //   v.x = f.x + cos(f.ang) * f.amp;
    //   v.y = f.y + sin(f.ang) * f.amp;
    //   f.ang += f.speed;
    // }

    // this.geometry.verticesNeedUpdate = true;
  }

}
