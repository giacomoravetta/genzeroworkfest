<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    let container: HTMLDivElement | undefined = undefined;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let model: THREE.Group;
    let animationFrameId: number;
    let isVisible = $state(true);
    let isModelLoaded = $state(false);
    let isPageLoaded = $state(false);
    let isProgramDataLoaded = $state(false);

    onMount(() => {
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x81fbf5);

        // Camera setup
        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

        // Adjust camera position based on screen size
        if (window.innerWidth < 768) {
            camera.position.z = 6; // Further back on mobile
        } else {
            camera.position.z = 5;
        }

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        if (container) {
            container.appendChild(renderer.domElement);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(-5, -5, -5);
        scene.add(directionalLight2);

        // Load GLB model
        const loader = new GLTFLoader();
        loader.load(
            "/W.glb",
            (gltf) => {
                model = gltf.scene;

                // Center and scale the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                // Adjust scale based on screen size
                let targetSize = 3;
                if (window.innerWidth < 640) {
                    targetSize = 2; // Smaller on mobile
                } else if (window.innerWidth < 1024) {
                    targetSize = 2.5; // Medium on tablet
                }
                const scale = targetSize / maxDim;
                model.scale.multiplyScalar(scale);

                model.position.sub(center.multiplyScalar(scale));

                scene.add(model);
                isModelLoaded = true;
                animate();
            },
            undefined,
            (error) => {
                console.error("Error loading model:", error);
                isModelLoaded = true; // Continue even if model fails to load
            },
        );

        // Animation loop
        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            if (model) {
                // Rotate horizontally (around Y axis)
                model.rotation.y += 0.01;
            }

            renderer.render(scene, camera);
        }

        // Handle window resize
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Adjust camera position on resize
            if (window.innerWidth < 768) {
                camera.position.z = 6;
            } else {
                camera.position.z = 5;
            }

            // Adjust model scale on resize
            if (model) {
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);

                let targetSize = 3;
                if (window.innerWidth < 640) {
                    targetSize = 2;
                } else if (window.innerWidth < 1024) {
                    targetSize = 2.5;
                }

                const currentScale = model.scale.x;
                const desiredScale = targetSize / maxDim;
                const scaleFactor = desiredScale / currentScale;
                model.scale.multiplyScalar(scaleFactor);
            }
        }

        window.addEventListener("resize", handleResize);

        // Check when page is fully loaded
        if (document.readyState === "complete") {
            isPageLoaded = true;
        } else {
            window.addEventListener("load", () => {
                isPageLoaded = true;
            });
        }

        // Listen for program data loaded event
        window.addEventListener("programDataLoaded", () => {
            isProgramDataLoaded = true;
        });

        // Fallback: If program data event never fires, hide loading screen anyway after 5 seconds
        setTimeout(() => {
            if (!isProgramDataLoaded) {
                console.warn(
                    "Program data event not received, hiding loading screen anyway",
                );
                isProgramDataLoaded = true;
            }
        }, 5000);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (renderer) {
                renderer.dispose();
            }
            if (
                container &&
                renderer.domElement &&
                container.contains(renderer.domElement)
            ) {
                container.removeChild(renderer.domElement);
            }
        };
    });

    // Hide loading screen when model, page, and program data are all loaded
    $effect(() => {
        if (isModelLoaded && isPageLoaded && isProgramDataLoaded) {
            // Wait a bit to show the model, then fade out
            setTimeout(() => {
                isVisible = false;

                // Dispatch custom event to notify page that loading is complete
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("loadingComplete"));
                }, 700); // Match the fade-out transition duration
            }, 500);
        }
    });
</script>

{#if isVisible}
    <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#81FBF5] transition-opacity duration-700"
        class:opacity-0={!isVisible}
        bind:this={container}
    >
        <div class="absolute bottom-6 sm:bottom-10 text-center px-4">
            <p
                class="text-xl sm:text-2xl md:text-3xl font-bold text-black animate-pulse"
            >
                Caricamento...
            </p>
        </div>
    </div>
{/if}
