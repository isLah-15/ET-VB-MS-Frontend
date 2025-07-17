import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export default function FreakModel() {
  const model = useGLTF("/src/Assets/3DModels/circus_baby_-_fnaf_ar_-_special_delivery.glb"); // Place in /public/models
  return (
    <Canvas style={{ height: "300px" }}>
      <ambientLight intensity={0.5} />
      <primitive object={model.scene} scale={2} />
      <OrbitControls />
    </Canvas>
  );
}