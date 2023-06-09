import * as React from "react";

export function AboutUs() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <span className="footer-title">Ubicación:</span>
        <p className="link link-hover">Constitución 300, Centro Historico</p>
        <p className="link link-hover">Oaxaca de Juárez</p>
      </div>
      <div>
        <span className="footer-title">Email:</span>
        <p className="link link-hover">contacto@aurobics.com.mx</p>
      </div>
      <div>
        <span className="footer-title">Llámanos:</span>
        <p className="link link-hover">+52 951 267 4801</p>
      </div>
    </footer>
  );
}
