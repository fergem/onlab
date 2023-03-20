import { VStack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PetSitters from "./pages/PetSitters";
import Jobs from "./pages/Jobs";

function App() {
  const bg = "#EAEFD3";
  const color = "#505168";
  const borderColor = "#B3C0A4";
  return (
    <VStack
      align="stretch"
      backgroundColor={bg}
      color={color}
      borderColor={borderColor}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        {/* <Route path="/petsitters" element={<PetSitters />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </VStack>
  );
}

export default App;
