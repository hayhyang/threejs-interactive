import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;
let ASPECT = W / H;

let scene, camera, renderer, controls;
let earth, moon, cloud;

Math.radians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 1000);
  camera.position.set(200, 20, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 200;
  controls.maxDistance = 500;
  controls.minPolarAngle = Math.radians(40);
  controls.minPolarAngle = Math.radians(120);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.05;

  const axesHelper = new THREE.AxesHelper(120);
  scene.add(axesHelper);

  // const gridHelper = new THREE.GridHelper(200, 5);
  // scene.add(gridHelper);

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

  const earthMap = new THREE.TextureLoader().load(
    "../../src/images/earth/Albedo.jpg"
  );
  const earthGeometry = new THREE.SphereGeometry(80, 32, 32);
  const earthMaterial = new THREE.MeshBasicMaterial({
    map: earthMap,
  });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earth.rotation.x = 0.3;

  const earthGridHelper = new THREE.GridHelper(340, 20);
  earth.add(earthGridHelper);

  scene.add(earth);

  // 구름
  const cloudMap = new THREE.TextureLoader().load(
    "../../src/images/earth/clouds.png"
  );
  const cloudGeometry = new THREE.SphereGeometry(82, 32, 32);
  const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudMap,
    transparent: true,
    opacity: 0.6,
  });
  cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
  earth.add(cloud);

  // 달 만들기
  const moonMap = new THREE.TextureLoader().load(
    "../../src/images/earth/moon.jpg"
  );

  const moonGeometry = new THREE.SphereGeometry(6, 32, 32);
  const moonMaterial = new THREE.MeshBasicMaterial({
    map: moonMap,
  });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(120, 0, 80);

  earth.add(moon);

  const light = new THREE.HemisphereLight(0x000000, 0x080820, 1.5);
  light.position.set(100, 100, 0);
  const hemisphereLightHelper = new THREE.HemisphereLightHelper(light, 15);
  scene.add(light, hemisphereLightHelper);
};

let time = 0;
const d = 120;

const animate = () => {
  earth.rotation.y += 0.00005;
  cloud.rotation.y += 0.00003;
  moon.rotation.y += 0.00005;

  time += 0.005;
  moon.position.x = Math.cos(time) * d;
  moon.position.z = Math.sin(time) * d;

  controls.update();
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
