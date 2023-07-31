import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavButton({ name = "default", route = "/" }) {
  return (
    <Link to={route} style={{ textDecoration: "none" }}>
      <Button variant="contained" disableElevation>
        {name}
      </Button>
    </Link>
  );
}
