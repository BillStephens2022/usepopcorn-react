import Logo from "./Logo";
import NumResults from "./NumResults";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar />
      <NumResults />
    </nav>
  );
}
