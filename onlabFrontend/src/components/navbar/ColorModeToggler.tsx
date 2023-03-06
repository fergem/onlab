import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react"

export default function ColorModeToggler() {
    const { colorMode, toggleColorMode } = useColorMode()
    const color = useColorModeValue("#B3C0A4", "#27233A")
    return (
        <header>
            <Button
                onClick={toggleColorMode}
                borderColor={color}
                _hover={{ bg: color }}
                variant="outline"
                fontSize="md"
            >
                Toggle to {colorMode === "light" ? "Dark" : "Light"}
            </Button>
        </header>
    )
}
