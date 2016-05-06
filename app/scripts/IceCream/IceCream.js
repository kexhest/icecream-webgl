/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

import Cone from './Cone';
import Scoops from './Scoops';

// const { sin } = Math;

export default class IceCream extends THREE.Object3D {

  constructor(scene, world, options) {
    const opts = {
      name: 'icecream',
      position: {
        x: 0,
        y: 64,
        z: 0,
      },
      ...options,
    };

    super();

    this.name = opts.name;

    const cone = new Cone(world);
    const scoops = new Scoops(world);

    this.add(cone);
    this.add(scoops);

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;

    this.receiveShadow = true;
    this.castShadow = true;

    if (scene) scene.add(this);
  }

  update(elapsed) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update();
    }

    // this.rotation.y += 0.005;
    // this.rotation.y = sin(elapsed);
    // this.position.y += sin(elapsed) * 0.1;
  }

}
