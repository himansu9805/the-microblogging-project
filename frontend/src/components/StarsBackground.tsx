import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

interface StarryBackgroundProps {
  animate: boolean;
}

export const StarryBackground: React.FC<StarryBackgroundProps> = ({
  animate,
}) => {
  const starryBackgroundRef = useRef<THREE.Group>();

  useFrame(({ clock }) => {
    if (animate) {
      // Move the stars in a straight line along the z-axis
      starryBackgroundRef.current!.position.z =
        -1000 + Math.sign(clock.elapsedTime) * 100;
      // Rotate the stars around the y-axis to create a twisting effect
      starryBackgroundRef.current!.rotation.y += 0.005;
    } else {
      // Rotate the stars around the y-axis at a slower rate
      starryBackgroundRef.current!.position.z =
        -1000 + Math.sign(clock.elapsedTime) * 100;
      starryBackgroundRef.current!.rotation.y += 0.001;
    }
  });

  return (
    <Stars
      ref={starryBackgroundRef}
      radius={50}
      depth={500}
      count={5000}
      factor={4}
      saturation={0}
      fade
    />
  );
};
