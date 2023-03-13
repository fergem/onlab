import { Button, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function NavButton({ name = "default", route = "/" }) {
  const borderColor = "#B3C0A4";

  return (
    <Link as={ReactRouterLink} to={route} style={{ textDecoration: "none" }}>
      <Button
        borderColor={borderColor}
        _hover={{ bg: borderColor }}
        color="inherit"
        variant="outline"
        fontSize="md">
        {name}
      </Button>
    </Link>
  );
}
