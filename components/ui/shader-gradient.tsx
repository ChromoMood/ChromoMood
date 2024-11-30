"use client";

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export default function Shader() {
  return (
    <ShaderGradientCanvas>
      <ShaderGradient
        color1="#606080"
        color2="#8d7dca"
        color3="#212121"
        animate="on"
        uSpeed={0.2}
        uDensity={2.5}
        uStrength={3}
        uFrequency={3.5}
        uAmplitude={2}
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={1.5}
        cameraZoom={1}
        lightType="3d"
        brightness={1.2}
        zoomOut={false}
      />
    </ShaderGradientCanvas>
  );
}
