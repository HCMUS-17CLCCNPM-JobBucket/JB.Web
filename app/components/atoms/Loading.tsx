import React from "react";

export default function LoadingTransition() {
  return (
    <div className="fixed z-50 w-full h-full bg-white flex items-center justify-center">
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </div>
  );
}
