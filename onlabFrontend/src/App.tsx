import { VStack } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Pets from "./pages/Pets"
import PetSitters from "./pages/PetSitters"

function App() {
    const bg = "#EAEFD3"
    const color = "#505168"
    const borderColor = "#B3C0A4"
    return (
        <VStack
            align="stretch"
            backgroundColor={bg}
            color={color}
            borderColor={borderColor}
        >
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/petsitters" element={<PetSitters />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </VStack>
    )
}

export default App
