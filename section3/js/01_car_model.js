import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;

let scene, camera, renderer;

const makeOject = () => {
  const carGroup = new THREE.Group();
  const wheelFrontGroup = new THREE.Group();
  const wheelBackGroup = new THREE.Group();

  const carTopGeometry = new THREE.BoxGeometry(20, 12, 30);
  const carTopMaterial = new THREE.MeshPhongMaterial({
    color: 0xffd400,
    // wireframe: true,
  });
  const carTop = new THREE.Mesh(carTopGeometry, carTopMaterial);
  const carBottomGeometry = new THREE.BoxGeometry(12, 8, 16);
  const carBottomMaterial = new THREE.MeshPhongMaterial({ color: 0xffd400 });
  const carBottom = new THREE.Mesh(carBottomGeometry, carBottomMaterial);

  const wheelGeometry = new THREE.CylinderGeometry(5, 5, 3, 10);
  const wheelMeterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
  const wheel = new THREE.Mesh(wheelGeometry, wheelMeterial);
  wheel.rotateZ(Math.radians(90));
  wheel.position.set(-12, -4, 8);

  const wheel2 = wheel.clone();
  wheel.position.set(12, -4, 8);

  const wheel3 = wheel.clone();
  wheel.position.set(-12, -4, -8);

  const wheel4 = wheel.clone();
  wheel.position.set(12, -4, -8);

  wheelFrontGroup.add(wheel, wheel2);
  wheelBackGroup.add(wheel3, wheel4);

  carGroup.add(carTop, carBottom, wheelFrontGroup, wheelBackGroup);

  scene.add(carGroup);
};

Math.radians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
  camera.position.set(50, 50, 50);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x0e2255);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(70, 20);
  scene.add(gridHelper);

  const hemisphereLight = new THREE.HemisphereLight(0xc0daf5, 0xc0daf5, 0.3);
  scene.add(hemisphereLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(60, 60, 90);
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  makeOject();
};

const animate = () => {
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const stageResize = () => {
  W = window.innerWidth;
  H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
};

init();
animate();
window.addEventListener("resize", stageResize);
