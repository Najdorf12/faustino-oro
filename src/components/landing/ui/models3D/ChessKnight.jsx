import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function ChessKnight(props) {
  // ✅ useGLTF ya cachea automáticamente
  const { nodes, materials } = useGLTF("/model3D/chess_knight.glb");
  const knightRef = useRef();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!knightRef.current) return;

    gsap.to(knightRef.current.rotation, {
      z: 0.6,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#notices",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    
    gsap.to(knightRef.current.position, {
      z: 9.4,
      y: -0.25,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#notices",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, [knightRef]); // ✅ Dependency array

  return (
    <group {...props} dispose={null}>
      <group
        ref={knightRef}
        position={[0.8, 0.2, 8.5]}
        rotation={[-Math.PI / 2, 0, -1]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001_Material003_0.geometry}
          material={materials["Material.003"]}
          position={[0.002, -0.005, -0.002]}
        />
      </group>
    </group>
  );
}

// ✅ Preload del modelo para que esté listo antes de renderizar
useGLTF.preload("/model3D/chess_knight.glb");