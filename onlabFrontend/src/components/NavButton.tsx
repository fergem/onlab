import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

interface INavButtonProps {
  name: string;
  route: string;
}

export default function NavButton({
  name = "default",
  route = "/",
}: INavButtonProps) {
  return (
    <Link to={route} style={{ textDecoration: "none" }}>
      <Button>{name}</Button>
    </Link>
  );
}
