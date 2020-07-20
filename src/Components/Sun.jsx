import React, { useMemo } from "react";
import * as THREE from "three";

const Sun = ({ textRef }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load("sun.jpg"), []);

  return (
    <mesh
      position={[0, 0, 0]}
      onPointerOver={() => (textRef.current.innerText = "Sun")}
    >
      <sphereBufferGeometry attach="geometry" args={[1.0, 32, 32]} />
      <meshBasicMaterial attach="material">
        <primitive
          attach="map"
          object={texture}
          //   onUpdate={(self) => img && (self.needsUpdate = true)}
        ></primitive>
      </meshBasicMaterial>
    </mesh>
  );
};

export default Sun;
