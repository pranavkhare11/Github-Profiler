import { useLocation, Link } from "react-router";
import SearchBar from "@pages/Search/components/SearchBar/SearchBar";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isSearchPage = location.pathname === "/" || location.pathname === "/home";

  return (
    <nav className="panel navbar">
      <div className="navbar-content">
        <Link to="/" className="brand-left-link">
          <div className="brand-left">
            <div className="brand-lens">
              <div className="lens-inner" />
            </div>
            <div className="brand-title-group">
              <h1 className="brand-title">GitHub Profiler</h1>
              <span className="brand-subtitle-spec">SYS.OP [GP-4004]</span>
            </div>
          </div>
        </Link>

        <div className="navbar-right">
          {!isSearchPage ? (
            <div className="navbar-search-container">
              <SearchBar placeholder="Search users..." variant="default" />
            </div>
          ) : (
            <div className="navbar-decor" aria-hidden="true">
              <div className="decor-spec-group">
                <span className="decor-spec-label">NT.OS-V2.6.4</span>
                <span className="decor-spec-status">SYS.STATUS // OK</span>
              </div>
              
              <div className="decor-glyph-dial">
                <div className="waveform-line wave-1" />
                <div className="waveform-line wave-2" />
                <div className="waveform-line wave-3" />
                <div className="waveform-line wave-4" />
                <div className="waveform-line wave-5" />
              </div>
              
              <div className="decor-hardware-group">
                <span className="decor-led led-red" />
                <span className="decor-screw" />
                <span className="decor-shape shape-pill" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;