import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const Earth = () => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const { viewport } = useThree(); // Access viewport dimensions

  // Use the specified local textures
  const earthTexture = useTexture("/earth_map.jpg");
  const earthBumpMap = useTexture("/earth_bump.jpg");
  const earthSpecularMap = useTexture("/earth_specular.png");
  const cloudTexture = useTexture("/earth_clouds.png");

  const radius = Math.min(viewport.width, viewport.height) * 0.3; // Adjust factor as needed

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={earthBumpMap}
          bumpScale={0.05}
          specularMap={earthSpecularMap}
          specular={new THREE.Color("grey")}
        />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius * 1.02, 32, 32]} />
        <meshPhongMaterial map={cloudTexture} transparent={true} />
      </mesh>
    </>
  );
};

export default Earth;
