import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.153.0/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let W = window.innerWidth;
let H = window.innerHeight;

let scene, camera, renderer;

export const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
  camera.position.set(50, 50, 50);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(W, H);
  renderer.setClearColor(0x0e2255);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // x, y, z 축
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // 바닥면 그리드
  const gridHelper = new THREE.GridHelper(70, 20);
  scene.add(gridHelper);

  // 하늘을 향하는 면을 비추는 조명 색상, 바닥을 향하는 면을 비추는 조명 색상
  // Ambient / Hemisphere 아래로 갈수록 성능 비용이 많이 든다.
  // Directional / Point
  // Spot / RectArea
  const hemisphereLight = new THREE.HemisphereLight(0xc0daf5, 0xc0daf5, 0.3);
  scene.add(hemisphereLight);

  // 조명
  // 손전등. 점에서 시작해 원뿔모양으로 퍼져나간다.
  // 매개변수는 다음과 같다. (color, intensity, distance, angle, penumbram, decay)
  // SpotLight는 회전시키기가 어렵다. Object3D 안의 target이라는 걸 항상바라본다. 위치를 변경하려고 해도, SpotLight는 쉽게 움직이지 않는다. target의 포지션을 변경해주고, scene에 add해주면 방향이 변하는 것을 확인할 수 있다.
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(60, 60, 90);
  scene.add(spotLight);

  // 조명 방향 헬퍼
  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);
};

// const animate = () => {
//   camera.lookAt(scene.position);
//   camera.updateProjectionMatrix();
//   renderer.render(scene, camera);
//   requestAnimationFrame(animate);
// };

export const stageResize = () => {
  W = window.innerWidth;
  H = window.innerHeight;
  renderer.setSize(W, H);
  camera.aspect = W / H;
};

// init();
// animate();
// window.addEventListener("resize", stageResize);
