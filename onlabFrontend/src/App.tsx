import { AppShell } from "@mantine/core";
import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MessagesDrawer from "./components/MessagesDrawer";
import AxiosInterceptor from "./components/interceptor/AxiosInterceptor";
import JobDetail from "./components/job-components/JobDetail";
import AuthVerify from "./components/user-components/AuthVerify";
import HeaderPetHoliday from "./components/utility-components/HeaderPetHoliday";
import AuthContext from "./context/AuthContext";
import MessagesOpenContext from "./context/MessagesContext";
import { User } from "./models/User";
import ApplicationsPetSitter from "./pages/ApplicationsPetSitter";
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

  const [opened, setOpened] = useState<boolean>(false);
  const val2 = useMemo(() => ({ opened, setOpened }), [opened]);
  return (
    <AuthContext.Provider value={val}>
      <MessagesOpenContext.Provider value={val2}>
        <AppShell navbarOffsetBreakpoint="sm" header={<HeaderPetHoliday />}>
          <AxiosInterceptor>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/postedjobs" element={<OwnerProfile />} />
              <Route path="/undertookjobs" element={<UndertookJobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/applications" element={<ApplicationsPetSitter />} />
              <Route
                path="/createpetsitterjob"
                element={<CreatePetSitterJob />}
              />
            </Routes>
          </AxiosInterceptor>
          <MessagesDrawer />
        </AppShell>
        <AuthVerify />
      </MessagesOpenContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
