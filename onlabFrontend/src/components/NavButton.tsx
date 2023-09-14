import { Button } from "@mantine/core";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

interface INavButtonProps {
  name: string;
  route: string;
}

export default function NavButton({
  name = "default",
  route = "/",
}: INavButtonProps) {
  const queryClient = useQueryClient();
  const handleClick = () => {
    queryClient.invalidateQueries();
  };
  return (
    <Link to={route} style={{ textDecoration: "none" }}>
      <Button onClick={handleClick}>{name}</Button>
    </Link>
  );
}
