import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;
let ASPECT = W / H;
let scene, camera, renderer;
let boxMesh;
let positionX = 0;
let positionY = 0;
let targetX = 0;
let targetY = 0;

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 1000);
  camera.position.set(50, 50, 50);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x0e2255);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const axes = new THREE.AxesHelper(50);
  scene.add(axes);

  const gridHelper = new THREE.GridHelper(70, 20);
  scene.add(gridHelper);

  // 조명
  const hemisphereLight = new THREE.HemisphereLight(0xc0daf5, 0xc0daf5, 0.3);
  hemisphereLight.position.set(-50, -50, -50);
  scene.add(hemisphereLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(60, 60, 60);
  scene.add(spotLight);

  const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  boxMesh = new THREE.Mesh(geometry, material);
  scene.add(boxMesh);

  document.addEventListener("mousemove", onMouseMove);
};

const onMouseMove = (e) => {
  positionX = e.clientX - W / 2;
  positionY = e.clientY - H / 2;
};

const animate = () => {
  targetX = positionX * 0.003;
  targetY = positionY * 0.003;

  if (boxMesh) {
    boxMesh.rotation.y += 0.1 * (targetX - boxMesh.rotation.y);
    boxMesh.rotation.x += 0.1 * (targetY - boxMesh.rotation.x);
  }

  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const stageResize = () => {
  W = window.innerWidth;
  H = window.innerHeight;

  renderer.setSize(W, H);
  camera.aspect = ASPECT; // 카메라 비율을 화면 비율에 맞춘다.
};

init();
animate();
window.addEventListener("resize", stageResize);
