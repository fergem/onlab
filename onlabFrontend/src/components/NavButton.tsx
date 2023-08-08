import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function NavButton({ name = "default", route = "/" }) {
  return (
    <Link to={route} style={{ textDecoration: "none" }}>
      <Button>{name}</Button>
    </Link>
  );
}
