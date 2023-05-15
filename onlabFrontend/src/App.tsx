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

import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import User from "./models/User";
import { useAuth, useLocalStorage } from "./hooks/AuthHooks";

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <VStack align="stretch" h="inherit">
      <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/postedjobs" element={<OwnerProfile />} />
          <Route path="/undertookjobs" element={<PetSitterProfile />} />
          <Route path="/createpetsitterjob" element={<CreatePetSitterJob />} />
        </Routes>
      </AuthContext.Provider>
    </VStack>
  );
}

export default App;
