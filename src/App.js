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
  const textRef = useRef();

  return (
    <>
      <Canvas camera={{ position: [0, 0, 17] }}>
        <Controls />
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
