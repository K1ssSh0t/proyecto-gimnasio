import * as React from "react";

export function AboutUs() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <span className="footer-title">Ubicación:</span>
        <a className="link link-hover">Constitución 300, Centro Historico</a>
        <a className="link link-hover">Oaxaca de Juárez</a>
      </div>
      <div>
        <span className="footer-title">Email:</span>
        <a className="link link-hover">contacto@aurobics.com.mx</a>
      </div>
      <div>
        <span className="footer-title">Llámanos:</span>
        <a className="link link-hover">+52 951 267 4801</a>
      </div>
    </footer>
  );
}
