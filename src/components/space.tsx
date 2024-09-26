"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three"; // Corrected import
import { useSpring as webSpring, animated } from "@react-spring/web";
import * as THREE from "three";

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

  // Spring animation for the planet’s position and scale.
  const { pos, scale } = useSpring({
    pos: selected ? [0, -3, 0] : position, // Move planet to center-bottom when selected
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

// Info data for each planet
const planetData = {
  Earth: {
    name: "Earth",
    description:
      "The third planet from the Sun and the only astronomical object known to harbor life.",
    size: "7,917.5 miles",
  },
  Mars: {
    name: "Mars",
    description:
      "Known as the Red Planet, Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.",
    size: "4,212 miles",
  },
  Jupiter: {
    name: "Jupiter",
    description:
      "Jupiter is the largest planet in the Solar System and is known for its Great Red Spot.",
    size: "86,881 miles",
  },
};

// Custom Info Panel
const PlanetInfoPanel = ({ planet }: { planet: string }) => {
  const data = planetData[planet as keyof typeof planetData];

  if (!data) return null; // If no data, return nothing

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: "30px",
        borderRadius: "10px",
        color: "white",
        width: "600px", // Increased width
        height: "300px", // Increased height
        position: "absolute",
        zIndex: -1, // Set to a negative zIndex to make sure the card is behind the planet
      }}
    >
      <h1 style={{ fontSize: "30px", margin: "0" }}>{data.name}</h1>
      <p style={{ fontSize: "16px", margin: "10px 0" }}>{data.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <p>Size</p>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{data.size}</p>
      </div>
    </div>
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
        camera={{ position: [0, 0, 10], fov: 60 }} // Keep camera in original position
        gl={{ antialias: true, alpha: false }}
      >
        <ambientLight intensity={0.5} />

        {/* Sunlight (Directional Light) - Invisible Sun */}
        <directionalLight position={[10, 0, 10]} intensity={2} castShadow color={"#FFFACD"} />

        {/* Rotating Stars */}
        <RotatingStars />

        {/* Planets with click events */}
        <Planet
          position={[5, 0, 0]} // Keep original position
          textureUrl="/textures/2k_earth_daymap.jpg"
          size={1.5}
          rotationSpeed={0.004}
          selected={selectedPlanet === "Earth"}
          onClick={() => handlePlanetClick("Earth")}
        />
        <Planet
          position={[-3, 2, -5]} // Keep original position
          textureUrl="/textures/2k_mars.jpg"
          size={1}
          rotationSpeed={0.003}
          selected={selectedPlanet === "Mars"}
          onClick={() => handlePlanetClick("Mars")}
        />
        <Planet
          position={[-6, -1, -4]} // Keep original position
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
            top: "70%", // Keep the card lower when the planet is clicked
            left: "50%", // Center the card horizontally
            transform: "translate(-50%, -50%)", // Ensure the card is centered
            width: "600px", // Increased width
            height: "300px", // Increased height
            zIndex: -1, // Ensure card is behind the planet
          }}
        >
          {/* Custom Info Panel */}
          <PlanetInfoPanel planet={selectedPlanet} />
        </animated.div>
      )}
    </>
  );
};

export default SpaceScene;
