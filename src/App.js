import React, { useRef } from "react";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sun from "./Components/Sun";
import Planet from "./Components/Planet";
import PlanetsInfo from "./Data/PlanetsInfo";

import "./App.css";

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <Controls />
      <Sun />
      {PlanetsInfo.map((planetInfo) => (
        <Planet {...planetInfo} />
      ))}
    </Canvas>
  );
}

export default App;
