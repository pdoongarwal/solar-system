import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const Planet = ({
  name,
  zFactor,
  orbitWidth,
  radius,
  revolutionSpeed = 0.01,
  rotationSpeed = 0.005,
  imagePath,
}) => {
  const texture = new THREE.TextureLoader().load(imagePath);
  const mesh = useRef();
  let direction = 1;

  useFrame(() => {
    if (mesh.current.position.x > orbitWidth) {
      direction = -1; // Left
    } else if (mesh.current.position.x < -orbitWidth) {
      direction = 1; // Right
    }
    mesh.current.position.x += direction * revolutionSpeed;
    mesh.current.position.z =
      (zFactor * direction * (orbitWidth - Math.abs(mesh.current.position.x))) /
      orbitWidth;
    mesh.current.rotation.z += Math.PI * rotationSpeed;
  });

  return (
    <mesh position={[2, 0, 0]} ref={mesh} rotation={[Math.PI / 2, 0, 0]}>
      <sphereBufferGeometry attach="geometry" args={[radius, 16, 16]} />
      <meshBasicMaterial attach="material">
        <primitive attach="map" object={texture}></primitive>
      </meshBasicMaterial>
    </mesh>
  );
};

export default Planet;
