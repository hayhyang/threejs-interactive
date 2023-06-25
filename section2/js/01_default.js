import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 컨트롤 효과

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
const boxMesh = new THREE.Mesh(geometry, material);
scene.add(boxMesh);

const animate = () => {
  controls.update();

  boxMesh.rotation.z += 0.01;
  boxMesh.rotation.x += 0.01;
  boxMesh.rotation.y += 0.01;

  camera.lookAt(scene.position); // 장면의 위치를 바라봄
  camera.updateProjectionMatrix(); // 변경된 값을 카메라에 적용한다.
  renderer.render(scene, camera);
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
