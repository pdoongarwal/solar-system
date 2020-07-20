import React from "react";
import * as THREE from "three";

const Orbit = ({ radius }) => {
  var segments = 32,
    material = new THREE.LineBasicMaterial({ color: 0xe0e0e0 }),
    geometry = new THREE.CircleGeometry(radius, segments);

  // Remove center vertex
  geometry.vertices.shift();
  const line = new THREE.LineLoop(geometry, material);
  return (
    <primitive
      object={line}
      position={[0, 0, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
};

export default Orbit;
