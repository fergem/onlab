import { Button, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export default function NavButton({ name = "default", route = "/" }) {
  return (
    <Link as={ReactRouterLink} to={route} style={{ textDecoration: "none" }}>
      <Button>{name}</Button>
    </Link>
  );
}
