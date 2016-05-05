/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import THREE from 'three';

export default class Scene extends THREE.Scene {

  /**
   * Create scene.
   *
   * @return {void}
   */
  constructor() {
    super();

    this.fog = new THREE.Fog(0xeeeeee, 100, 950);
  }

  update() {
  }

}
