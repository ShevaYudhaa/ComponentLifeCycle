import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import KartuProfilePages from "./pages/KartuProfilePages";
import KartuProfil from "./components/KartuProfil";

export default function App() {
  return (
    <SafeAreaProvider>
      <KartuProfilePages />
    </SafeAreaProvider>
  );
}