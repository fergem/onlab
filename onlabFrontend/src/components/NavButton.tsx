import { Button, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { selectedColor } from "../utility/Constants";

export default function NavButton({ name = "default", route = "/" }) {
  return (
    <Link as={ReactRouterLink} to={route} style={{ textDecoration: "none" }}>
      <Button
        borderColor={selectedColor}
        _hover={{ bg: selectedColor }}
        color="inherit"
        variant="outline"
        fontSize="md">
        {name}
      </Button>
    </Link>
  );
}
