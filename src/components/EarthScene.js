import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "./Earth";

const EarthScene = () => {
  return (
    <div className="earthScene">
      <EarthCanvas />
    </div>
  );
};

const EarthCanvas = () => (
  <Canvas
    camera={{ position: [0, 10, 20], fov: 50 }}
    style={{ width: "100%", height: "100%" }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 10]} intensity={1} />
    <Earth />
    <OrbitControls enableZoom={false} /> {/* Disable zoom */}
  </Canvas>
);

export default EarthScene;
