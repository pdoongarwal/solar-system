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
  camera.position.x = 0;
  camera.position.y = 15;
  camera.position.z = 25;

  useFrame(() => {
    if (autoRotate) {
      camera.position.x = 10 * Math.cos(angle);
      camera.position.y = 10 * Math.sin(angle);
      camera.position.z = 10 * Math.tan(angle);
      angle += 0.001;
    }
    orbitRef.current.update();
  });

  return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

function App() {
  const textRef = useRef();
  const [checked, setChecked] = React.useState(false);

  const orbitRadius = [];
  for (let radius = 2; radius <= 16; radius += 2) {
    orbitRadius.push(radius);
  }

  return (
    <>
      <Canvas camera={{ position: [0, 0, 17] }}>
        <Controls autoRotate={checked} />
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
      <label className="auto-rotate">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        Auto Control Camera
      </label>
    </>
  );
}

export default App;
