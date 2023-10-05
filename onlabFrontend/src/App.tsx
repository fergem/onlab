import { AppShell } from "@mantine/core";
import axios from "axios";
import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import JobDetail from "./components/job-components/JobDetail";
import AuthVerify from "./components/user-components/AuthVerify";
import HeaderPetHoliday from "./components/utility-components/HeaderPetHoliday";
import AuthContext from "./context/AuthContext";
import { User } from "./models/User";
import CreatePetSitterJob from "./pages/CreatePetSitterJob";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import OwnerProfile from "./pages/PostedJobs";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UndertookJobs from "./pages/UndertookJobs";

axios.defaults.baseURL = "http://localhost:5173/";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const val = useMemo(() => ({ user, setUser }), [user]);
  return (
    <AuthContext.Provider value={val}>
      <AppShell navbarOffsetBreakpoint="sm" header={<HeaderPetHoliday />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/postedjobs" element={<OwnerProfile />} />
          <Route path="/undertookjobs" element={<UndertookJobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/createpetsitterjob" element={<CreatePetSitterJob />} />
        </Routes>
      </AppShell>
      <AuthVerify />
    </AuthContext.Provider>
  );
}

export default App;
