import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

const orbitCalculation = function (radius, revolutionSpeed) {
  const speedConstant = 6000 / revolutionSpeed;
  return {
    x:
      Math.sin(((Date.now() % speedConstant) / speedConstant) * Math.PI * 2) *
      radius,
    z:
      Math.cos(((Date.now() % speedConstant) / speedConstant) * Math.PI * 2) *
      radius,
  };
};

const Planet = ({
  name,
  orbitRadius,
  radius,
  revolutionSpeed,
  rotationSpeed,
  imagePath,
  textRef,
}) => {
  const texture = new THREE.TextureLoader().load(imagePath);
  const mesh = useRef();

  useFrame(() => {
    const position = orbitCalculation(orbitRadius, revolutionSpeed);
    mesh.current.position.x = position.x;
    mesh.current.position.z = position.z;
    mesh.current.rotation.z += (Math.PI * rotationSpeed) / 10;
  });

  return (
    <mesh
      position={[2, 0, 0]}
      ref={mesh}
      rotation={[Math.PI / 2, 0, 0]}
      onPointerOver={() => (textRef.current.innerText = name)}
    >
      <sphereBufferGeometry attach="geometry" args={[radius, 16, 16]} />
      <meshBasicMaterial attach="material">
        <primitive attach="map" object={texture}></primitive>
      </meshBasicMaterial>
    </mesh>
  );
};

export default Planet;
