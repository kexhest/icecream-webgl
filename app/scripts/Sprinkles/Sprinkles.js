/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

import Sprinkle from './Sprinkle';

const {
  random,
} = Math;

const rand = (low, high) => ~~(random() * (high - low) + low);

const sprinkleCount = 128;

export default class Sprinkles extends THREE.Object3D {

  constructor(scene, world, options) {
    const opts = {
      name: 'sprinkles',
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      ...options,
    };

    super();

    this.name = opts.name;

    this.generateSprinkles(world);

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;

    if (scene) scene.add(this);
  }

  generateSprinkles(world) {
    if (this.children.length >= sprinkleCount) {
      const item = this.children[0];
      this.remove(item);
      world.physics.remove(item.body);
    }

    const sprinkle = new Sprinkle(world, {
      position: {
        x: -32 + rand(0, 64),
        y: 256,
        z: -32 + rand(0, 64),
      },
    });

    this.add(sprinkle);

    setTimeout(() => {
      this.generateSprinkles(world);
    }, 100);
  }

  update() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update();
    }
  }

}
