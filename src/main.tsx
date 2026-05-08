import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { profileImageUrl } from "@/data/profile-image";

const existingIcon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
const favicon = existingIcon ?? document.createElement("link");
favicon.rel = "icon";
favicon.href = profileImageUrl;
if (!existingIcon) document.head.appendChild(favicon);

const accentVar = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
const accentColor = accentVar ? `hsl(${accentVar})` : "#a855f7";

function setCircularFavicon(src: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  // Clear the canvas with transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.crossOrigin = "anonymous"; // Handle CORS for external images
  img.src = src;
  img.onload = () => {
    // Create circular clipping path for the entire canvas
    ctx.save();
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.clip();

    // Fill the circle with a gradient background
    const grad = ctx.createLinearGradient(0, 0, 64, 64);
    grad.addColorStop(0, accentColor);
    grad.addColorStop(1, "#a855f7");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    // Draw the profile image to fill the circle
    const scale = Math.max(64 / img.width, 64 / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (64 - w) / 2;
    const y = (64 - h) / 2;
    
    // Apply slight transparency to blend with gradient
    ctx.globalAlpha = 0.9;
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();

    // Create a subtle border around the circle
    ctx.beginPath();
    ctx.arc(32, 32, 31, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.stroke();

    favicon.href = canvas.toDataURL("image/png");
  };
  img.onerror = () => {
    // Fallback: create a simple circular favicon with initials
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create circular background
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.fill();
    
    // Add initials
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MS', 32, 32);
    
    favicon.href = canvas.toDataURL("image/png");
  };
}

setCircularFavicon(profileImageUrl);

createRoot(document.getElementById("root")!).render(<App />);
