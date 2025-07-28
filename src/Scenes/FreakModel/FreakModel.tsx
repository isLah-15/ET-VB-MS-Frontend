import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { Mesh, MeshStandardMaterial, Group } from "three";
import * as THREE from "three";

function FreakModelGLTF() {
  const group = useRef<Group>(null);
  const model = useGLTF(
    "/src/Assets/3DModels/circus_baby_-_fnaf_ar_-_special_delivery.glb"
  );
  const { animations } = model;
  const { actions } = useAnimations(animations, group);

  // Enhance materials and shadows
  useEffect(() => {
    model.scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            const standardMat = mat as MeshStandardMaterial;
            standardMat.metalness = 0.5;
            standardMat.roughness = 0.3;
          });
        } else {
          const standardMat = mesh.material as MeshStandardMaterial;
          standardMat.metalness = 0.5;
          standardMat.roughness = 0.3;
        }
      }
    });
  }, [model]);

  // Play the first animation
  useEffect(() => {
    if (actions && animations.length > 0) {
      const action = actions[animations[0].name];
      if (action) {
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.5).play();
      }
    }
  }, [actions, animations]);

  return <primitive ref={group} object={model.scene} scale={2} />;
}

export default function FreakModel() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 1, 5], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} castShadow />
        <FreakModelGLTF />
        <ContactShadows position={[0, -1, 0]} opacity={0.4} blur={2} />
        <Environment preset="sunset" />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
}
