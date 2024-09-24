"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three"; // Corrected import
import { useSpring as webSpring, animated } from "@react-spring/web";
import * as THREE from "three";
import { ThreeDCardDemo } from "./ui/threedCardDemo";

// Planet Component with Spring Animation
const Planet = ({
  position,
  textureUrl,
  size,
  rotationSpeed,
  selected,
  onClick,
}: {
  position: [number, number, number];
  textureUrl: string;
  size: number;
  rotationSpeed: number;
  selected: boolean;
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Load the texture
  const texture = new THREE.TextureLoader().load(textureUrl);

  // Use spring animation for position and scale
  const { pos, scale } = useSpring({
    pos: selected ? [0, position[1], 0] : position, // X-axis moves, Y-axis stays fixed at `position[1]`
    scale: selected ? 1.8 : 1, // Scale up to 1.8 when selected
    config: { mass: 1, tension: 120, friction: 14 },
  });

  // Rotate the planet each frame with different speeds
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <a.mesh ref={meshRef} position={pos as any} scale={scale} onClick={onClick}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </a.mesh>
  );
};

// Stars Component with Rotation
const RotatingStars = () => {
  const starsRef = useRef<THREE.Group>(null!);

  // Rotate stars group continuously
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.00001; // Slow rotation for the stars
      starsRef.current.rotation.x += 0.0002; // Slight tilt for dynamic effect
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </group>
  );
};

// Main Space Scene Component
const SpaceScene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  // Function to handle planet click and set the camera target
  const handlePlanetClick = (planetName: string) => {
    if (selectedPlanet === planetName) {
      // Deselect if already selected
      setSelectedPlanet(null);
    } else {
      // Select the clicked planet
      setSelectedPlanet(planetName);
    }
  };

  // Animation for the info card when a planet is selected
  const cardSpring = webSpring({
    opacity: selectedPlanet ? 1 : 0,
    transform: selectedPlanet ? `translateX(0px)` : `translateX(400px)`, // Slide in from the right
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <>
      <Canvas
        className="h-full"
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <ambientLight intensity={0.5} />

        {/* Sunlight (Directional Light) - Invisible Sun */}
        <directionalLight position={[10, 0, 10]} intensity={2} castShadow color={"#FFFACD"} />

        {/* Rotating Stars */}
        <RotatingStars />

        {/* Planets with click events */}
        <Planet
          position={[5, 0, 0]}
          textureUrl="/textures/2k_earth_daymap.jpg"
          size={1.5}
          rotationSpeed={0.004}
          selected={selectedPlanet === "Earth"}
          onClick={() => handlePlanetClick("Earth")}
        />
        <Planet
          position={[-3, 2, -5]}
          textureUrl="/textures/2k_mars.jpg"
          size={1}
          rotationSpeed={0.003}
          selected={selectedPlanet === "Mars"}
          onClick={() => handlePlanetClick("Mars")}
        />
        <Planet
          position={[-6, -1, -4]}
          textureUrl="/textures/2k_jupiter.jpg"
          size={2}
          rotationSpeed={0.002}
          selected={selectedPlanet === "Jupiter"}
          onClick={() => handlePlanetClick("Jupiter")}
        />

        {/* Orbit Controls with locked Y-axis */}
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2} // Prevent vertical movement
          maxPolarAngle={Math.PI / 2} // Prevent vertical movement
        />
      </Canvas>

      {/* Animated Info Card for selected planet */}
      {selectedPlanet && (
        <animated.div
          style={{
            ...cardSpring,
            position: "absolute",
            top: "20%",
            right: "200px",
            width: "300px",
          }}
        >
          {/* Using the custom card from aceternity */}
          <ThreeDCardDemo
            title={selectedPlanet}
            description={`Hello, I'm ${selectedPlanet}! Here is some more info about me.`}
          />
        </animated.div>
      )}
    </>
  );
};

export default SpaceScene;
