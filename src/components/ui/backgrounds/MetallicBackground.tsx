import React from "react";
import "./MetallicBackground.css";

const MetallicBackground: React.FC = () => {
  return (
    <div className="metallic-background">
      {/* Animated gradient mesh */}
      <div className="metallic-background__mesh" />

      {/* Glass morphism grid */}
      <div className="metallic-background__glass" />

      {/* Metallic shine sweep */}
      <div className="metallic-background__shine" />

      {/* Reflective particles */}
      <div className="metallic-background__particles" />
    </div>
  );
};

export default MetallicBackground;
