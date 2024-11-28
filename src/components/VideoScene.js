import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const VideoScene = () => {
  const mountRef = useRef(null);
  const meshRef = useRef(null);
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const videoRef = useRef();
  const videoTextureRef = useRef();
  const shaderMaterialRef = useRef();

  useEffect(() => {
    const init = () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 5;

      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(rendererRef.current.domElement);

      videoRef.current = document.createElement("video");
      videoRef.current.src = "/underWater.mp4"; // Ensure this path is correct
      videoRef.current.loop = true;
      videoRef.current.muted = true;
      videoRef.current.playbackRate = 3;

      videoRef.current.addEventListener("canplay", () => {
        videoRef.current.play();
        videoTextureRef.current = new THREE.VideoTexture(videoRef.current);
        videoTextureRef.current.minFilter = THREE.LinearFilter;
        videoTextureRef.current.magFilter = THREE.LinearFilter;
        videoTextureRef.current.format = THREE.RGBFormat;

        // Create shader material
        shaderMaterialRef.current = new THREE.ShaderMaterial({
          uniforms: {
            videoTexture: { value: videoTextureRef.current },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D videoTexture;
            varying vec2 vUv;
            void main() {
                vec4 videoColor = texture2D(videoTexture, vUv);
                vec4 blueShade = vec4(0.0, 0.0, 0.5, 1.0);
                gl_FragColor = mix(videoColor, blueShade, 0.25);
            }
          `,
        });

        // Create mesh and apply shader material
        const geometry = new THREE.PlaneGeometry(16, 9);
        meshRef.current = new THREE.Mesh(geometry, shaderMaterialRef.current);
        sceneRef.current.add(meshRef.current);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        sceneRef.current.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(1, 1, 1).normalize();
        sceneRef.current.add(directionalLight);

        // Start animation loop
        animate();
      });

      document.body.addEventListener("click", () => {
        videoRef.current.muted = false;
      });

      // Handle window resize
      window.addEventListener("resize", onWindowResize, false);
      // Attach scroll event listener
      window.addEventListener("scroll", onScroll, false);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const onScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scale = 1 + scrollPosition / maxScroll; // Scale based on scroll position
      if (meshRef.current) {
        meshRef.current.scale.set(scale, scale, scale); // Apply the scaling to the mesh
      }
    };

    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update camera aspect ratio and renderer size
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);

      // Update the geometry based on aspect ratio
      const aspectRatio = width / height; // Define aspectRatio here
      const videoAspectRatio = 16 / 9; // Assuming the video is 16:9

      if (aspectRatio > videoAspectRatio) {
        // Window is wider than video
        const newHeight = width / videoAspectRatio;
        meshRef.current.scale.set(1, newHeight / height, 1);
      } else {
        // Window is taller than video
        const newWidth = height * videoAspectRatio;
        meshRef.current.scale.set(newWidth / width, 1, 1);
      }
    };

    init();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      document.body.removeEventListener("click", () => {
        videoRef.current.muted = false;
      });
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("scroll", onScroll); // Remove scroll event listener
    };
  }, []);

  return <div ref={mountRef} />;
};

export default VideoScene;
