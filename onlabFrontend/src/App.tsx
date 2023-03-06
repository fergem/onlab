import { border, Flex, useColorModeValue, VStack } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Login from "./pages/Login"
import Pets from "./pages/pets/Pets"
import PetSitters from "./pages/petsitters/PetSitters"

function App() {
    const bg = useColorModeValue("#EAEFD3", "#505168")
    const color = useColorModeValue("#505168", "#EAEFD3")
    const borderColor = useColorModeValue("#B3C0A4", "#27233A")
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
