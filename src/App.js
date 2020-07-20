import React, { useRef } from "react";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sun from "./Components/Sun";
import Orbit from "./Components/Orbit";
import Planet from "./Components/Planet";
import PlanetsInfo from "./Data/PlanetsInfo";

import "./App.css";

extend({ OrbitControls });

const Controls = ({ autoRotate }) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  let angle = 0;

  useFrame(() => {
    if (autoRotate) {
      camera.position.x = 17 * Math.cos(angle);
      camera.position.y = 17 * Math.sin(angle);
      camera.position.z = 17 * Math.sin(angle);
      angle += 0.001;
    }
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

function App() {
  const textRef = useRef();

  const orbitRadius = [];
  for (let radius = 2; radius <= 16; radius += 2) {
    orbitRadius.push(radius);
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 17] }}>
        <Controls autoRotate={false} />
        {orbitRadius.map((radius) => (
          <Orbit radius={radius} />
        ))}
        <Sun textRef={textRef} />
        {PlanetsInfo.map((planetInfo) => (
          <Planet {...planetInfo} key={planetInfo.name} textRef={textRef} />
        ))}
      </Canvas>
      <h1 ref={textRef} className="text">
        Sun
      </h1>
    </>
  );
}

export default App;
