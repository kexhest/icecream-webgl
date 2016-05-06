/* global dat, Stats, OrbitControls, StereoEffect, CardboardEffect, DeviceOrientationControls, CannonDebugRenderer */

/*
 * This file is part of the three playground.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import raf from 'raf';
import THREE from 'three';

import WebGLRenderer from 'WebGLRenderer';
import Scene from 'Scene';
import Camera from 'Camera';

import HemisphereLight from 'lights/HemisphereLight';
import AmbientLight from 'lights/AmbientLight';
import DirectionalLight from 'lights/DirectionalLight';

import World from './World/World';

import IceCream from './IceCream/IceCream';
import Sprinkles from './Sprinkles/Sprinkles';

if (process.env.NODE_ENV.dev) {
  const stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  stats.domElement.style.zIndex = '1';
  document.body.appendChild(stats.domElement);
}

/**
 * This is the App class.
 */
export default class App {

  /**
   * Create App
   *
   * @param {object|string} video (src path or video element)
   * @param {bool} iOS
   *
   * @return {void}
   */
  constructor(options) {
    const { innerWidth: width, innerHeight: height } = window;

    this.opts = {
      container: document.body,
      ...options,
    };

    this.fit = this.fit.bind(this);
    this.track = this.track.bind(this);
    this.update = this.update.bind(this);
    this.setOrientationControls = this.setOrientationControls.bind(this);

    this.clock = new THREE.Clock();
    this.renderer = new WebGLRenderer({ container: this.opts.container });
    this.scene = new Scene();
    this.camera = new Camera();

    this.mouse = new THREE.Vector2(width * 0.5, height * 0.5);

    this.hemisphereLight = new HemisphereLight(this.scene);
    this.ambientLight = new AmbientLight(this.scene);
    this.shadowLight = new DirectionalLight(this.scene);

    this.world = new World(this.scene);

    this.iceCream = new IceCream(this.scene, this.world);

    this.sprinkles = new Sprinkles(this.scene, this.world);

    // this.cannonDebugRenderer = new CannonDebugRenderer(this.scene, this.world.physics);

    // this.effect = new StereoEffect(this.renderer);
    // this.effect.setSize(width, height);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // this.controls.target.set(
    //   this.camera.position.x,
    //   this.camera.position.y,
    //   this.camera.position.z
    // );

    // this.controls.enableZoom = false;
    // this.controls.enablePan = false;

    this.bindEvents();
    this.update();
  }

  /**
   * Bind DOM events.
   *
   * @return {void}
   */
  bindEvents() {
    window.addEventListener('resize', this.fit, false);
    this.opts.container.addEventListener('mousemove', this.track, false);
    this.opts.container.addEventListener('touchmove', this.track, false);
    // window.addEventListener('deviceorientation', this.setOrientationControls, true);
  }

  /**
   * Track mouse/touch positions.
   *
   * @param {object} e
   *
   * @return {void}
   */
  track(e) {
    const { clientX: x, clientY: y } = (e.touches && e.touches[0]) || e;

    this.mouse.set(x, y);
  }

  /**
   * Update controls to be deviceorientation based if deviceorientation is triggered.
   *
   * @param {object} e
   *
   * @return {void}
   */
  setOrientationControls(e) {
    if (!e.alpha) return;

    this.controls = new DeviceOrientationControls(this.camera, true);
    this.controls.connect();
    this.controls.update();

    window.removeEventListener('deviceorientation', this.setOrientationControls, true);
  }

  /**
   * Resize canvas and everything within according to new window size.
   *
   * @return {void}
   */
  fit() {
    const { innerWidth: width, innerHeight: height } = window;

    this.camera.setSize(width, height);
    this.renderer.setSize(width, height);
    // this.effect.setSize(width, height);
  }

  /**
   * Update loop.
   *
   * @return {void}
   */
  update() {
    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    if (process.env.NODE_ENV.dev) stats.begin();

    this.camera.update(this.mouse, this.iceCream.position);
    // this.controls.update(delta);

    this.world.physics.step(delta);

    this.iceCream.update(elapsed);
    this.sprinkles.update(elapsed);

    // this.cannonDebugRenderer.update();

    this.render();

    if (process.env.NODE_ENV.dev) stats.end();

    raf(this.update);
  }

  /**
   * Render gl.
   *
   * @return {void}
   */
  render() {
    // this.effect.render(this.scene, this.camera);
    this.renderer.render(this.scene, this.camera);
  }
}
