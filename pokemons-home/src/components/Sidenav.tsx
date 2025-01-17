import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="sidenav">
      <Link to="/">Home</Link>
      <Link to="/langflow">Langflow</Link>
      <Link to="/page2">Page 2</Link>
    </div>
  );
}

export default Sidenav;
