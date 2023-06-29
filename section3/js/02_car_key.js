import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;

let scene, camera, renderer, controls;
let carGroup, wheelFrontGroup, wheelBackGroup;

const makeOject = () => {
  carGroup = new THREE.Group();
  wheelFrontGroup = new THREE.Group();
  wheelBackGroup = new THREE.Group();

  const carTopGeometry = new THREE.BoxGeometry(20, 12, 30);
  const carTopMaterial = new THREE.MeshPhongMaterial({
    color: 0xffd400,
    // wireframe: true,
  });
  const carTop = new THREE.Mesh(carTopGeometry, carTopMaterial);
  const carBottomGeometry = new THREE.BoxGeometry(12, 8, 16);
  const carBottomMaterial = new THREE.MeshPhongMaterial({ color: 0xffd400 });
  const carBottom = new THREE.Mesh(carBottomGeometry, carBottomMaterial);
  carBottom.position.set(0, 10, 0);

  const wheelGeometry = new THREE.CylinderGeometry(5, 5, 3, 10);
  const wheelMeterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
  });
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
  carGroup.position.set(0, 9, 0);

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

  controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true; // 부드럽고 움직임
  // controls.enablePan = false; //
  // controls.enableZoom = false; // 줌 컨트롤
  controls.autoRotate = true; // 자동회전
  controls.autoRotateSpeed = 1; // 회전속도, 기본값 1

  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const gridHelper = new THREE.GridHelper(70, 20);
  scene.add(gridHelper);

  // 직사광선
  {
    const color = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(20, 80, 50);
    light.target.position.set(0, 20, 0); // target: 조명이 어디로 향하는지, 조명의 끝 점
    scene.add(light);
    scene.add(light.target);

    // const helper = new THREE.DirectionalLightHelper(light);
    // scene.add(helper);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.SpotLight(color, intensity);
    light.position.set(20, 40, 0);
    scene.add(light);
    scene.add(light.target);

    // const helper = new THREE.SpotLightHelper(light);
    // scene.add(helper);
  }

  makeOject();

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onkeyUp);
};

let keyCode = 0;
let isKeyDown = false;

const onKeyDown = (e) => {
  keyCode = e.keyCode;
  isKeyDown = true;
};

const onkeyUp = () => {
  isKeyDown = false;
};

const animate = () => {
  if (isKeyDown) {
    if (keyCode == "ArrowUp" || keyCode == 38) {
      carGroup.position.z++;
      wheelFrontGroup.children.forEach((el) => (el.rotation.x += 0.1));
      wheelBackGroup.children.forEach((el) => (el.rotation.x += 0.1));
    } else if (keyCode == "ArrowDown" || keyCode == 40) {
      carGroup.position.z--;
      wheelFrontGroup.children.forEach((el) => (el.rotation.x -= 0.1));
      wheelBackGroup.children.forEach((el) => (el.rotation.x -= 0.1));
    }
  }

  controls.update();
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
