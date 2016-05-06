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

import Ground from './Ground';
import Sky from './Sky';

// const { PI } = Math;

// const HALF_PI = PI * 0.5;

/**
 * This is the World class.
 */
export default class World extends THREE.Object3D {

  /**
   * Create World.
   *
   * @param {object} scene
   * @param {object} options
   *
   * @return {void}
   */
  constructor(scene, options) {
    const opts = {
      name: 'world',
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      ...options,
    };

    super();

    this.name = opts.name;

    this.physics = new CANNON.World();

    this.physics.quatNormalizeSkip = 0;
    this.physics.quatNormalizeFast = false;

    const solver = new CANNON.GSSolver();

    solver.iterations = 7;
    solver.tolerance = 0.1;

    this.physics.solver = new CANNON.SplitSolver(solver);

    this.physics.gravity.set(0, -24, 0);
    this.physics.broadphase = new CANNON.NaiveBroadphase();

    this.physics.defaultContactMaterial.contactEquationStiffness = 4e9;
    this.physics.defaultContactMaterial.contactEquationRelaxation = 1;

    const physicsMaterial = new CANNON.Material('slipperyMaterial');
    const physicsContactMaterial = new CANNON.ContactMaterial(
      physicsMaterial,
      physicsMaterial,
      0.0, // friction coefficient
      0.3  // restitution
    );

    this.physics.addContactMaterial(physicsContactMaterial);

    this.ground = new Ground();
    this.sky = new Sky();

    this.add(this.ground);
    this.add(this.sky);

    this.physics.addBody(this.ground.body);

    this.position.x = opts.position.x;
    this.position.y = opts.position.y;
    this.position.z = opts.position.z;

    if (scene) scene.add(this);
  }

  /**
   * Update.
   *
   * @return {void}
   */
  update() {
  }

}
