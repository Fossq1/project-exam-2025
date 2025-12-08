import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { VenueProvider } from "./contexts/VenueContext.tsx";
import { AthleteProvider } from "./contexts/AthleteContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VenueProvider>
      <AthleteProvider>
        <App />
      </AthleteProvider>
    </VenueProvider>
  </StrictMode>
);
