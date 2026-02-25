"use client";
import * as THREE from "three";
import Form from "./ui/layout/FormContact";
import iconface from "@/assets/images/icons/face.svg";
import iconinsta from "@/assets/images/icons/insta.svg";
import iconyoutube from "@/assets/images/icons/youtube.svg";
import Link from "next/link";
import { useRef, useReducer, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Image from "next/image";
import { useGLTF, Environment, Preload } from "@react-three/drei";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import { usePathname } from "next/navigation";

const VISUAL_SCALE = 0.75; // 75% del tamaño actual
const accents = ["#09090b", "#09090b"];
const shuffle = (accent = 0) => [
  { color: "#57534d", type: "rook" },
  { color: "#57534d", type: "pawn" }, // Peón
  { color: "#052f4a", type: "rook" },
  { color: "#09090b", type: "pawn" }, // Peón
  { color: "#57534d", type: "rook" },
  { color: "#052f4a", type: "pawn" }, // Peón
  { color: accents[accent], accent: true, type: "rook" },
  { color: accents[accent], accent: true, type: "pawn" }, // Peón
  { color: accents[accent], accent: true, type: "rook" },
];

export const Contact = () => {
  const pathname = usePathname();
  return (
    <>
      <div
        id="contact"
        className="w-full h-[120vh] bg-zinc-950 flex items-center justify-center relative px-3 md:h-screen"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%), radial-gradient(160% 130% at 10% 10%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%), radial-gradient(160% 130% at 90% 90%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%)",
          }}
        />
        <div className="w-full h-full absolute inset-0">
          <Suspense fallback={null}>
            <Scene key={pathname} />
          </Suspense>
        </div>
        <section className="relative h-full w-full pointer-events-none flex flex-col justify-center  md:flex-row md:justify-center items-center ">
          <article className="flex flex-col md:justify-start md:pt-12 md:w-[60%] md:h-full md:pl-9 lg:pt-20 md:gap-28 xl:gap-50 2xl:pl-14 3xl:pt-28 ">
            <div className="text-center px-4 lg:text-start md:px-0">
              <h5 className="text-5xl  sm:text-6xl lg:text-8xl 2xl:text-[7rem] 3xl:text-9xl font-medium text-zinc-200 z-30 relative">
                CONTACTO
              </h5>
              <p className="text-zinc-300 mt-6 text-start text-sm md:text-base max-w-145 border-l-2 py-1 pl-3 border-sky-600 lg:mt-6 font-medium lg:py-2 lg:text-lg 2xl:max-w-150">
                Fausti quiere escucharte. Ponte en contacto para invitarlo a
                eventos, colaboraciones o simplemente para alentarlo en su
                carrera.
              </p>
            </div>

            <ul className="hidden gap-6 flex-col text-zinc-400 pointer-events-auto md:flex  md:w-fit lg:font-medium 2xl:text-lg  ">
              <Link
                href={"https://www.facebook.com/orofaustino/?locale=es_LA"}
                target="blank"
                className="group "
              >
                <li className="flex items-center gap-3 xl:gap-4 group-hover:text-zinc-300 group-hover:ml-4 duration-300 ">
                  <Image
                    className="w-8.5 2xl:w-9.5"
                    src={iconface}
                    alt="icon-facebook "
                  />
                  https://www.facebook.com/orofaustino
                </li>
              </Link>
              <Link
                href={"https://www.instagram.com/faustioro/"}
                target="blank"
                className="group "
              >
                <li className="flex items-center gap-3 xl:gap-4 group-hover:text-zinc-300 group-hover:ml-4 duration-300">
                  <Image
                    className="w-9 2xl:w-10"
                    src={iconinsta}
                    alt="icon-instagram"
                  />
                  https://www.instagram.com/faustioro
                </li>
              </Link>
              <Link
                href={"https://www.youtube.com/@faustinooro"}
                target="blank"
                className="group "
              >
                <li className="flex items-center gap-3 xl:gap-4 group-hover:text-zinc-300 group-hover:ml-4 duration-300">
                  <Image
                    className="w-9 2xl:w-10"
                    src={iconyoutube}
                    alt="icon-youtube"
                  />
                  https://www.youtube.com/@faustinooro
                </li>
              </Link>
            </ul>
          </article>

          <div className="flex flex-col items-center justify-center mt-8  w-full md:mt-0 md:w-[40%] md:h-full">
            <Form />
            <ul className="flex md:hidden gap-12 mt-9 text-zinc-500 pointer-events-auto">
              <Link
                href={"https://www.facebook.com/orofaustino/?locale=es_LA"}
                target="blank"
              >
                <li className="flex items-center gap-3">
                  <Image className="w-8" src={iconface} alt="icon-face" />
                </li>
              </Link>
              <Link
                href={"https://www.instagram.com/faustioro/"}
                target="blank"
              >
                <li className="flex items-center gap-3">
                  <Image className="w-9" src={iconinsta} alt="icon-insta" />
                </li>
              </Link>
              <Link
                href={"https://www.youtube.com/@faustinooro"}
                target="blank"
              >
                <li className="flex items-center gap-3">
                  <Image className="w-9" src={iconyoutube} alt="icon-youtube" />
                </li>
              </Link>
            </ul>
          </div>
        </section>
        <div className="absolute z-200 bottom-0.5 text-zinc-600 font-medium w-full flex items-center justify-center text-sm md:text-base 2xl:text-lg">
          © Faustino Oro
        </div>
      </div>
    </>
  );
};
export default Contact;

function randomPosition(range = 8, yRange = 6) {
  return [
    THREE.MathUtils.randFloatSpread(range),
    THREE.MathUtils.randFloatSpread(yRange),
    THREE.MathUtils.randFloatSpread(range),
  ];
}

function Scene(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => {
    return shuffle(accent).map((item) => ({
      ...item,
      position: randomPosition(),
    }));
  }, [accent]);

  return (
    <Canvas
      onClick={click}
      dpr={[1, 1.25]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 15], fov: 18 }}
      {...props}
    >
      <Suspense fallback={null}>
        {/* <color attach="background" args={["#09090b"]} /> */}

        {/* Luz base barata */}
        <ambientLight intensity={0.8} />

        {/* Una sola direccional */}
        <directionalLight position={[5, 5, 5]} intensity={1.2} />

        <Physics gravity={[0, 0, 0]}>
          <Pointer />
          {connectors.map((props, i) => (
            <Connector key={i} {...props} />
          ))}
        </Physics>

        {/* Environment MUY liviano */}
        <Environment preset="studio" resolution={64} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}

function Connector({
  position,
  vec = new THREE.Vector3(),
  type = "rook",
  ...props
}) {
  const api = useRef();
  const pos = useMemo(
    () =>
      position || [
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10),
      ],
    [],
  );

  useFrame(() => {
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.05),
    );
  });

  return (
    <RigidBody
      ref={api}
      position={pos}
      linearDamping={6}
      angularDamping={4}
      colliders="cuboid"
    >
      <Model {...props} type={type} />
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0,
      ),
    );
  });
  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

function Model({ color = "white", roughness = 0.6, type = "rook" }) {
  const { scene } = useGLTF(
    type === "pawn" ? "/model3D/chess_pawn_lp.glb" : "/model3D/rook.glb",
  );

  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.material.color.set(color);
        o.material.roughness = roughness;
      }
    });
    return c;
  }, [scene, color, roughness]);

  const baseScale = type === "pawn" ? 0.5 : 0.5;

  return <primitive object={cloned} scale={baseScale * VISUAL_SCALE} />;
}
