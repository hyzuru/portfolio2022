import * as THREE from 'three';
import imagesLoaded from 'imagesloaded';
import FontFaceObserver from 'fontfaceobserver';
import Scroll from './scroll';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import fragment from './../shaders/fragment.glsl?raw';
import vertex from './../shaders/vertex.glsl?raw';

export default class Sketch {
  constructor(options) {
    this.container = options.domElement;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      100,
      2000
    );
    this.camera.position.z = 600;

    // field of view (vertical angle) in degrees
    this.camera.fov =
      2 * Math.atan(this.height / 2 / this.camera.position.z) * (180 / Math.PI);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      // alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setSize( this.width, this.height );

    this.container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.images = [...document.querySelectorAll('img')];
    // this.imagesGl = [...document.querySelectorAll('img.gl-img')];

    // Font face observer
    const fontMontserrat = new Promise((resolve) => {
      new FontFaceObserver('Montserrat').load().then(() => {
        resolve();
      });
    });
    const fontLato = new Promise((resolve) => {
      new FontFaceObserver('Lato').load().then(() => {
        resolve();
      });
    });
    const fontSource = new Promise((resolve) => {
      new FontFaceObserver('Source Sans Pro').load().then(() => {
        resolve();
      });
    });

    // Preload images
    const preloadImages = new Promise((resolve, reject) => {
      imagesLoaded(
        document.querySelectorAll('img'),
        { background: true },
        resolve
      );
    });

    let allDone = [fontMontserrat, fontSource, fontLato, preloadImages];
    this.currentScroll = 0;

    Promise.all(allDone).then(() => {
      this.scroll = new Scroll();
      this.addImages();
      this.setPosition();

      this.resize();
      this.setupResize();
      // this.addObjects();
      this.render();

      // window.addEventListener('scroll', () => {
      //   this.currentScroll = window.scrollY;
      //   this.setPosition();
      // });
    });
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addImages() {
    this.imageStore = this.images.map((img) => {
      let bounds = img.getBoundingClientRect();
      let geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 1, 1);

      let texture = new THREE.TextureLoader().load(img.src);
      let material = new THREE.MeshBasicMaterial({ map: texture });
      let mesh = new THREE.Mesh(geometry, material);

      this.scene.add(mesh);

      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
      };
    });
    console.log(this.imageStore);
  }

  setPosition() {
    this.imageStore.forEach((obj) => {
      obj.mesh.position.y =
        this.currentScroll - obj.top + this.height / 2 - obj.height / 2;
      obj.mesh.position.x = obj.left - this.width / 2 + obj.width / 2;
    });
  }

  addObjects() {
    // this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    this.geometry = new THREE.PlaneGeometry(200, 400, 10, 10);
    // console.log(this.geometry);
    this.material = new THREE.MeshNormalMaterial({});

    this.material = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms: {
        time: { value: 1.0 },
        // oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
        resolution: { value: new THREE.Vector2() },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render() {
    // this.time += 0.05;
    this.scroll.render();
    this.currentScroll = this.scroll.scrollToRender;
    this.setPosition();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

// new Sketch({
//   domElement: document.getElementById('container'),
// });
