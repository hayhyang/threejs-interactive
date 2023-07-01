import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;
let ASPECT = W / H;

let scene, camera, renderer;

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 1000);
  camera.position.set(200, 100, 200);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const axesHelper = new THREE.AxesHelper(120);
  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(200, 5);
  scene.add(gridHelper);

  // 우주만들기
  {
    const imageLoader = new THREE.TextureLoader();
    imageLoader.load("../../src/images/earth/universe.jpg", (data) => {
      const geometry = new THREE.SphereGeometry(400, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        map: data,
        side: THREE.BackSide,
      });
      const universe = new THREE.Mesh(geometry, material);
      scene.add(universe);
    });
  }

  // 지구만들기
  {
    const imageLoader = new THREE.TextureLoader();
    imageLoader.load("../../src/images/earth/earth.jpg", (data) => {
      const geometry = new THREE.SphereGeometry(80, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        map: data,
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    });
  }
};

const animate = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const stageResize = () => {
  W = window.innerWidth;
  H = window.innerHeight;
  ASPECT = W / H;
};

init();
animate();
window.addEventListener("resize", stageResize);
