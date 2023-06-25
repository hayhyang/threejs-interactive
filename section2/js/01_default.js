import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.js";

let W = window.innerWidth;
let H = window.innerHeight;
let ASPECT = W / H;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, ASPECT, 0.1, 1000);
camera.position.set(50, 50, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(W, H);
renderer.setClearColor(0x0e2255); // 배경색을 지정할 수 있음,  기본은 블랙
document.body.appendChild(renderer.domElement);

const axes = new THREE.AxesHelper();
scene.add(axes);

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

const animate = () => {
  camera.lookAt(secne.position); // 장면의 위치를 바라봄
  camera.updateProjectionMatrix(); // 변경된 값을 카메라에 적용한다.
  renderer(scene, camera);
  requestAnimationFrame(animate);
};

const stageResize = () => {
  W = window.innerWidth;
  H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = ASPECT; // 카메라 비율을 화면 비율에 맞춘다.
};

animate();
window.addEventListener("resize", stageResize);
