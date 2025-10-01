<script lang="ts">
    import W from "../components/W.svelte";
    // import { onMount } from "svelte";
    // import * as THREE from "three";
    // import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    // let container: HTMLElement;
    // let scene: THREE.Scene;
    // let camera: THREE.PerspectiveCamera;
    // let renderer: THREE.WebGLRenderer;
    // let model: THREE.Group;
    // let animationId: number;

    // onMount(() => {
    //     initThreeJS();
    //     loadModel();
    //     animate();

    //     // Cleanup on component destroy
    //     return () => {
    //         if (animationId) {
    //             cancelAnimationFrame(animationId);
    //         }
    //         if (renderer) {
    //             renderer.dispose();
    //         }
    //     };
    // });

    // function initThreeJS() {
    //     // Create scene
    //     scene = new THREE.Scene();

    //     // Create camera
    //     camera = new THREE.PerspectiveCamera(
    //         75,
    //         window.innerWidth / window.innerHeight,
    //         0.1,
    //         1000,
    //     );
    //     // Responsive camera distance - closer on mobile, further on desktop
    //     const isMobile = window.innerWidth < 768;
    //     const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    //     if (isMobile) {
    //         camera.position.set(0, 2, 10); // Higher and further back on mobile
    //     } else if (isTablet) {
    //         camera.position.set(-1, 3, 15); // Higher and medium distance on tablet
    //     } else {
    //         camera.position.set(-2, 2, 22); // Higher and further back on desktop
    //     }

    //     // Create renderer
    //     renderer = new THREE.WebGLRenderer({
    //         antialias: true,
    //         alpha: true,
    //     });
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     renderer.setPixelRatio(window.devicePixelRatio);
    //     renderer.setClearColor(0x000000, 0); // Transparent background

    //     // Add renderer to container
    //     container.appendChild(renderer.domElement);

    //     // Add bright ambient light
    //     const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
    //     scene.add(ambientLight);

    //     // Add bright directional light
    //     const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    //     directionalLight.position.set(5, 5, 5);
    //     directionalLight.castShadow = false;
    //     scene.add(directionalLight);

    //     // Handle window resize
    //     const handleResize = () => {
    //         camera.aspect = window.innerWidth / window.innerHeight;
    //         camera.updateProjectionMatrix();
    //         renderer.setSize(window.innerWidth, window.innerHeight);
    //     };

    //     window.addEventListener("resize", handleResize);

    //     // Cleanup resize listener
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }

    // function loadModel() {
    //     const loader = new GLTFLoader();

    //     loader.load(
    //         "/W.glb",
    //         (gltf) => {
    //             model = gltf.scene;

    //             // Center the model perfectly
    //             const box = new THREE.Box3().setFromObject(model);
    //             const center = box.getCenter(new THREE.Vector3());

    //             // Make model responsive - bigger on desktop
    //             const size = box.getSize(new THREE.Vector3());
    //             const maxDim = Math.max(size.x, size.y, size.z);

    //             const isMobile = window.innerWidth < 768;
    //             const isTablet =
    //                 window.innerWidth >= 768 && window.innerWidth < 1024;

    //             let scale;
    //             if (isMobile) {
    //                 scale = 8 / maxDim; // Smaller on mobile
    //             } else if (isTablet) {
    //                 scale = 20 / maxDim; // Slightly smaller on tablet
    //             } else {
    //                 scale = 36 / maxDim; // Fill screen width on desktop
    //             }

    //             model.scale.setScalar(scale);

    //             // Perfectly center the model at origin after scaling
    //             const scaledBox = new THREE.Box3().setFromObject(model);
    //             const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
    //             model.position.set(
    //                 -scaledCenter.x,
    //                 -scaledCenter.y,
    //                 -scaledCenter.z,
    //             );

    //             scene.add(model);
    //         },
    //         (progress) => {
    //             console.log(
    //                 "Loading progress:",
    //                 (progress.loaded / progress.total) * 100 + "%",
    //             );
    //         },
    //         (error) => {
    //             console.error("Error loading model:", error);
    //         },
    //     );
    // }

    // function animate() {
    //     animationId = requestAnimationFrame(animate);

    //     // Rotate the model very slowly around its center (Y-axis) - reversed direction
    //     if (model) {
    //         model.rotation.y += 0.002; // Much slower rotation, reversed direction
    //     }

    //     renderer.render(scene, camera);
    // }
</script>

<section
    class="w-auto h-[100dvh] relative bg-[#81FBF5] flex justify-center items-center p-4"
>
    <W />
</section>
