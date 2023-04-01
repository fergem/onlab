import { VStack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import CreatePetSitterJob from "./pages/CreatePetSitterJob";
import OwnerProfile from "./pages/OwnerProfile";
import PetSitterProfile from "./pages/PetSitterProfile";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import User from "./models/User";
import { UserService } from "./services/UserService";

function App() {
  return (
    <VStack align="stretch" minH="inherit">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/postedjobs" element={<OwnerProfile />} />
        <Route path="/undertookjobs" element={<PetSitterProfile />} />
        <Route
          path="/profile/createpetsitterjob"
          element={<CreatePetSitterJob />}
        />
      </Routes>
    </VStack>
  );
}

export default App;
