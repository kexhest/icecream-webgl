/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

import Scoop from './Scoop';

const {
  random,
} = Math;

const rand = (low, high) => ~~(random() * (high - low) + low);

const scoopCount = rand(1, 4);

export default class Scoops extends THREE.Object3D {

  constructor(world, options) {
    const opts = {
      name: 'scoops',
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      ...options,
    };

    super();

    this.name = opts.name;

    for (let i = 0; i < scoopCount; i++) {
      const scoop = new Scoop(world, {
        radius: 24 + i * -4,
        rim: i < 1,
        position: i > 0 ? {
          x: rand(-4 - i * 2, 4 + i * 2),
          y: 6 + i * 24 - i * 4,
          z: rand(-4 - i * 2, 4 + i * 2),
        } : {
          x: 0,
          y: 6,
          z: 0,
        },
      });

      this.add(scoop);
    }

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;
  }

  update() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update();
    }
  }

}
