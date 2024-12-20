"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  scale: number;
  modelPath: string;
  rotationSpeed?: number;
  glowColor?: string;
  glowIntensity?: number;
  emissionIntensity?: number;
}

export const Planet: React.FC<PlanetProps> = ({ 
  position, 
  scale, 
  modelPath, 
  rotationSpeed = 0.002,
  glowColor = "#00ffff",
  glowIntensity = 1,
  emissionIntensity = 0.5
}) => {
  const ref = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF(modelPath);

  // Increase details by applying a normal map and emission
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const normalMap = new THREE.TextureLoader().load('/textures/planet_normal_map.jpg');
        child.material.normalMap = normalMap;
        child.material.normalScale.set(1, 1);
        
        // Add emission to the material without changing its color
        child.material.emissiveMap = child.material.map;
        child.material.emissiveIntensity = emissionIntensity;
      }
    });
  }, [scene, emissionIntensity]);

  // Create glow effect
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(glowColor) },
        viewVector: { value: new THREE.Vector3() },
        c: { value: 0.1 },
        p: { value: 4.5 },
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
          intensity = pow( dot(normalize(viewVector), actual_normal), p );
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * c * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }
      `,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
  }, [glowColor]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += state.clock.getDelta() * rotationSpeed;
    }
    if (glowRef.current && glowRef.current.material) {
      (glowRef.current.material as THREE.ShaderMaterial).uniforms.viewVector.value = new THREE.Vector3().subVectors(
        state.camera.position,
        glowRef.current.position
      );
    }
  });

  return (
    <group position={position} scale={scale}>
      <primitive 
        object={scene} 
        ref={ref}
      />
      <mesh ref={glowRef} scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial attach="material" {...glowMaterial} />
      </mesh>
      <pointLight intensity={glowIntensity} distance={50} color={glowColor} />
    </group>
  );
};