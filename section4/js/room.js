import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;

let scene, camera, renderer, controls;

export const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
  camera.position.set(50, 50, 50);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x0e2255);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 200;
  controls.maxDistance = 200;
  controls.enableDamping = true;

  {
    const imageLoader = new THREE.TextureLoader();
    imageLoader.load("../../src/images/room/bg.jpg", (data) => {
      const material = new THREE.MeshBasicMaterial({
        map: data,
        side: THREE.BackSide,
      });
      const geometry = new THREE.SphereGeometry(400, 32, 32);
      const roomMesh = new THREE.Mesh(geometry, material);
      scene.add(roomMesh);
    });
  }
};

const animate = () => {
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

export const stageResize = () => {
  W = window.innerWidth;
  H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
};

init();
animate();
window.addEventListener("resize", stageResize);
