import { Button, Group } from "@mantine/core";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";

interface INavButtonProps {
  name: string;
  to: string;
  icon: JSX.Element;
}

export default function NavButton({
  name = "default",
  to = "/",
  icon,
}: INavButtonProps) {
  const queryClient = useQueryClient();
  const handleClick = () => {
    queryClient.invalidateQueries();
  };
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Button onClick={handleClick} h="75px" radius={0}>
        <Group position="center" align="center" spacing={0}>
          {icon}
          {name}
        </Group>
      </Button>
    </Link>
  );
}
