import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to={"/"}
      className="font-bold text-underlay-1 text-3xl sm:text-4xl md:text-5xl"
    >
      HirelyAi
    </Link>
  );
}

export default Logo;
