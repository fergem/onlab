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
import User, { LoggedUser } from "./models/User";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { UserService } from "./services/UserService";
import AuthService from "./services/AuthService";

function App() {
  return (
    <VStack align="stretch" minH="inherit">
      <AuthService>
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
      </AuthService>
    </VStack>
  );
}

export default App;
