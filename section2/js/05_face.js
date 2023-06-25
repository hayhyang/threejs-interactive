import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;
let ASPECT = W / H;
let scene, camera, renderer;
let positionX = 0;
let positionY = 0;
let targetX = 0;
let targetY = 0;
const faceGroup = new THREE.Group();

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

  const hemisphereLight = new THREE.HemisphereLight(0xc0daf5, 0xc0daf5, 0.3);
  hemisphereLight.position.set(-50, -50, -50);
  scene.add(hemisphereLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(60, 60, 60);
  scene.add(spotLight);

  // 얼굴
  const geometry = new THREE.BoxBufferGeometry(50, 25, 12);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const boxMesh = new THREE.Mesh(geometry, material);

  // 코
  const geometry_con = new THREE.ConeGeometry(5, 15, 30);
  const meterial_cone = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const cone = new THREE.Mesh(geometry_con, meterial_cone);
  cone.rotation.set(1.6, 5, 0);
  cone.position.set(0, 0, 5);

  const geometry_sphere = new THREE.SphereGeometry(1, 10, 10);
  const meterial_sphere = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const sphere1 = new THREE.Mesh(geometry_sphere, meterial_sphere);
  sphere1.position.set(-15, 5, 6);
  const sphere2 = new THREE.Mesh(geometry_sphere, meterial_sphere);
  sphere2.position.set(15, 5, 6);

  faceGroup.add(boxMesh, cone, sphere1, sphere2);
  scene.add(faceGroup);

  document.addEventListener("mousemove", onMouseMove);
};

const onMouseMove = (e) => {
  positionX = e.clientX - W / 2;
  positionY = e.clientY - H / 2;
};

const animate = () => {
  targetX = positionX * 0.003;
  targetY = positionY * 0.002;

  if (faceGroup) {
    faceGroup.rotation.y += 0.1 * (targetX - faceGroup.rotation.y);
    faceGroup.rotation.x += 0.1 * (targetY - faceGroup.rotation.x);
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
  camera.aspect = ASPECT;
};

init();
animate();
window.addEventListener("resize", stageResize);
