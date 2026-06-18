interface ThemeToggleProps {
  isLightMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isLightMode, onToggle }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      className="theme-toggle-image-button"
      onClick={onToggle}
      aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <img
        className="theme-toggle-image"
        src={isLightMode ? '/dark-mode.png' : '/light-mode.jpg'}
        alt={isLightMode ? 'Dark mode icon' : 'Light mode icon'}
        height={24}
        width={24}
      />
    </button>
  );
};
