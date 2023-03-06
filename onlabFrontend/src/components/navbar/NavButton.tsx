import { Button, Link, useColorModeValue } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"

export default function NavButton({ name = "default", route = "/" }) {
    const borderColor = useColorModeValue("#B3C0A4", "#27233A")

    return (
        <Link
            as={ReactRouterLink}
            to={route}
            style={{ textDecoration: "none" }}
        >
            <Button
                borderColor={borderColor}
                _hover={{ bg: borderColor }}
                color="inherit"
                variant="outline"
                fontSize="md"
            >
                {name}
            </Button>
        </Link>
    )
}
