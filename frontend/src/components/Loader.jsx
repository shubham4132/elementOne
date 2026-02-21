import React from "react";

export function Loader({ variant = "spinner", size = "md", text }) {
  const dotSize = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-4 h-4",
  };

  const outerSize = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {variant === "spinner" && (
        <div
          className={`${outerSize[size]} animate-spin rounded-full border-4 border-lime-300/30 border-t-lime-300`}
        />
      )}

      {variant === "pulse" && (
        <div
          className={`${outerSize[size]} animate-pulse rounded-full bg-lime-300`}
        />
      )}

      {variant === "dots" && (
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`${dotSize[size]} rounded-full bg-lime-300`}
              style={{
                animation: "dotBounce 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          <style>{`
            @keyframes dotBounce {
              0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
              40% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {variant === "bars" && (
        <div className={`${outerSize[size]} flex items-end gap-1`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-lime-300"
              style={{
                animation: "barPulse 1s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
          <style>{`
            @keyframes barPulse {
              0%, 100% { height: 30%; }
              50% { height: 100%; }
            }
          `}</style>
        </div>
      )}

      {variant === "ring" && (
        <div
          className={`${outerSize[size]} animate-spin rounded-full border-4 border-lime-300 border-b-transparent`}
        />
      )}

      {text && <p className="text-sm font-medium text-lime-300">{text}</p>}
    </div>
  );
}
