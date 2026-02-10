import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import ChessKnight from "./ChessKnight";

export const ChessKnightExperience = () => {
  return (
    <>
      <OrbitControls enableZoom={false} enableRotate={false} />
      <spotLight 
        position={[0, 15, 0]} 
        color={"#212121"} 
        angle={0.3} 
        penumbra={1} 
        castShadow 
        intensity={2} 
        shadow-bias={-0.0001} 
      />
      <PerspectiveCamera makeDefault position={[0, 0, 12]} />
      <Environment preset="city" />
      <ChessKnight />
    </>
  );
};