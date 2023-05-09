import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const [stars, setStars] = React.useState([]);
  const group = useRef();

  React.useEffect(() => {
    for (let z = -1000; z < 1000; z += 20) {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;
      sphere.position.z = z;
      sphere.scale.x = sphere.scale.y = 2;
      group.current.add(sphere);
      stars.push(sphere);
    }
    setStars(stars);
  }, []);

  useFrame(() => {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.position.z += i / 10;
      if (star.position.z > 1000) star.position.z -= 2000;
    }
    group.current.rotation.z -= 0.001;
  });

  return <group ref={group} />;
}

export default function StarsBackground() {
  return (
    <Canvas
    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
    onCreated={({ gl }) => {
      gl.setClearColor(0x000000); // Set the background color to black
    }}>
      <Stars />
      <perspectiveCamera
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
        near={1}
        far={1000}
        position={[0, 0, 5]}
      />
    </Canvas>
  );
}
