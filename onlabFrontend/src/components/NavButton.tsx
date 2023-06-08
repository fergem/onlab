import { Link } from "react-router-dom";

export default function NavButton({ name = "default", route = "/" }) {
  return (
    <Link to={route} style={{ textDecoration: "none" }}>
      <button className="btn btn-primary">{name}</button>
    </Link>
  );
}
