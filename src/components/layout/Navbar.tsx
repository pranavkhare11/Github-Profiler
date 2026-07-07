import { useLocation, Link } from "react-router";
import SearchBar from "@pages/Search/components/SearchBar/SearchBar";
import ThemeToggle from "./ThemeToggle";
import * as S from "./Navbar.styles";

const Navbar = () => {
  const location = useLocation();
  const isSearchPage = location.pathname === "/" || location.pathname === "/home";

  return (
    <S.NavbarContainer className="panel">
      <S.NavbarContent>
        <S.BrandLeftLink as={Link} to="/">
          <S.BrandLeft>
            <S.BrandLens>
              <S.LensInner />
            </S.BrandLens>
            <S.BrandTitleGroup>
              <S.BrandTitle>GitHub Profiler</S.BrandTitle>
              <S.BrandSubtitleSpec>SYS.OP [GP-4004]</S.BrandSubtitleSpec>
            </S.BrandTitleGroup>
          </S.BrandLeft>
        </S.BrandLeftLink>

        <S.NavbarRight>
          {!isSearchPage ? (
            <S.NavbarSearchContainer>
              <SearchBar placeholder="Search users..." variant="default" />
            </S.NavbarSearchContainer>
          ) : (
            <S.NavbarDecor aria-hidden="true">
              <S.DecorSpecGroup>
                <S.DecorSpecLabel>NT.OS-V2.6.4</S.DecorSpecLabel>
                <S.DecorSpecStatus>SYS.STATUS // OK</S.DecorSpecStatus>
              </S.DecorSpecGroup>
              
              <S.DecorGlyphDial>
                <S.WaveformLine $index={1} />
                <S.WaveformLine $index={2} />
                <S.WaveformLine $index={3} />
                <S.WaveformLine $index={4} />
                <S.WaveformLine $index={5} />
              </S.DecorGlyphDial>
              
              <S.DecorHardwareGroup>
                <S.DecorLed />
                <S.DecorScrew />
                <S.DecorShapePill />
              </S.DecorHardwareGroup>
            </S.NavbarDecor>
          )}
          <ThemeToggle />
        </S.NavbarRight>
      </S.NavbarContent>
    </S.NavbarContainer>
  );
};

export default Navbar;