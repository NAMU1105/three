import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.outputEncoding = THREE.sRGBEncoding;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(10, 1);
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  camera.position.set(0, 0, 15);
  scene.add(camera);

  // Light
  scene.background = new THREE.Color("white");
  const light = new THREE.DirectionalLight(0xffff00, 10);
  scene.add(light);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // gltf loader
  const gltfLoader = new GLTFLoader();

  gltfLoader.load("/models/scene.gltf", (gltf) => {
    scene.add(gltf.scene);
    //   renderer.render(scene);

    // function animate() {
    //   requestAnimationFrame(animate);
    //   gltf.scene.rotation.y -= 0.1;
    //   gltf.scene.rotation.x -= 0.1;
    //   renderer.render(scene, camera);
    // }

    // animate();
  });

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
