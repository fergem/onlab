import { AppShell, Center, Flex, Group, Header } from "@mantine/core";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";
import User from "./models/User";
import CreatePetSitterJob from "./pages/CreatePetSitterJob";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import OwnerProfile from "./pages/OwnerProfile";
import PetSitterProfile from "./pages/PetSitterProfile";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppShell header={<Header children={<Navbar />} height={"75px"} />}>
        <Center mih={"100%"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/postedjobs" element={<OwnerProfile />} />
            <Route path="/undertookjobs" element={<PetSitterProfile />} />
            <Route
              path="/createpetsitterjob"
              element={<CreatePetSitterJob />}
            />
          </Routes>
        </Center>
      </AppShell>
    </AuthContext.Provider>
  );
}

export default App;
