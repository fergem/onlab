import { AppShell, Header } from "@mantine/core";
import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthVerify from "./components/AuthVerify";
import Navbar from "./components/Navbar";
import JobPage from "./components/job-components/JobPage";
import AuthContext from "./context/AuthContext";
import User from "./models/User";
import CreatePetSitterJob from "./pages/CreatePetSitterJob";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import OwnerProfile from "./pages/PostedJobs";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UndertookJobs from "./pages/UndertookJobs";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const val = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={val}>
      <AppShell
        header={
          <Header height="75px">
            <Navbar />
          </Header>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/postedjobs" element={<OwnerProfile />} />
          <Route path="/undertookjobs" element={<UndertookJobs />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/createpetsitterjob" element={<CreatePetSitterJob />} />
        </Routes>
      </AppShell>
      <AuthVerify />
    </AuthContext.Provider>
  );
}

export default App;
