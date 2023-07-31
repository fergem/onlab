import { Container } from "@mui/material";
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
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import PetSitterProfile from "./pages/PetSitterProfile";

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <Container sx={{ height: "100vh" }} disableGutters maxWidth={false}>
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
    </Container>
  );
}

export default App;
