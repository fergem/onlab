import { AppShell } from "@mantine/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin
import { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AxiosInterceptor from "./components/interceptor/AxiosInterceptor";
import JobDetail from "./components/job-components/JobDetail";
import HeaderPetHoliday from "./components/utility-components/HeaderPetHoliday";
import MessagesDrawer from "./components/utility-components/MessagesDrawer";
import AuthContext from "./context/AuthContext";
import MessagesOpenContext from "./context/MessagesContext";
import { User, UserRole } from "./models/User";
import AppliedJobs from "./pages/AppliedJobs";
import CreatePetSitterJob from "./pages/CreatePetSitterJob";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import OwnerProfile from "./pages/PostedJobs";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { ArrayFunctions } from "./utility/array";

dayjs.extend(utc);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const userContext = useMemo(() => ({ user, setUser }), [user]);

  const [opened, setOpened] = useState<boolean>(false);
  const drawerOpenedContext = useMemo(() => ({ opened, setOpened }), [opened]);
  return (
    <AuthContext.Provider value={userContext}>
      <MessagesOpenContext.Provider value={drawerOpenedContext}>
        <AppShell navbarOffsetBreakpoint="sm" header={<HeaderPetHoliday />}>
          <AxiosInterceptor>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />

              <Route
                path="/profile"
                element={userContext.user ? <Profile /> : <Navigate to="/" />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/postedjobs"
                element={
                  ArrayFunctions.safeIncludes(
                    userContext.user?.roles,
                    UserRole.Owner
                  ) ? (
                    <OwnerProfile />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/appliedjobs"
                element={
                  ArrayFunctions.safeIncludes(
                    userContext.user?.roles,
                    UserRole.PetSitter
                  ) ? (
                    <AppliedJobs />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route
                path="/createpetsitterjob"
                element={
                  ArrayFunctions.safeIncludes(
                    userContext.user?.roles,
                    UserRole.Owner
                  ) ? (
                    <CreatePetSitterJob />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </AxiosInterceptor>
          {user && <MessagesDrawer />}
        </AppShell>
      </MessagesOpenContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
