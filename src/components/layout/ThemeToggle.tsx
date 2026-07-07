import { useTheme } from "../../context/ThemeContext";
import * as S from "./ThemeToggle.styles";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <S.ToggleContainer
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-label="Toggle Theme"
    >
      <S.ToggleDial $theme={theme}>
        {/* Mechanical dial markings (representing 12, 3, 6, 9 ticks) */}
        <S.DialMarking $index={1} />
        <S.DialMarking $index={2} />
        <S.DialMarking $index={3} />
        <S.DialMarking $index={4} />

        {/* Dynamic icon wrapper */}
        <S.IconWrapper $theme={theme}>
          {theme === "light" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </S.IconWrapper>

        {/* Small mechanical indicator dot */}
        <S.LedIndicator $theme={theme} />
      </S.ToggleDial>
    </S.ToggleContainer>
  );
};

export default ThemeToggle;
