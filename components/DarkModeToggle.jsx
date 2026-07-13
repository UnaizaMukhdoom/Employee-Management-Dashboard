function DarkModeToggle({ isDark, onToggle }) {
  let buttonStyle;
  if (isDark) {
    buttonStyle = "border-gray-600 text-gray-200 hover:bg-gray-800";
  } else {
    buttonStyle = "border-gray-300 text-gray-600 hover:bg-gray-50";
  }

  let buttonText;
  if (isDark) {
    buttonText = "☀ Light";
  } else {
    buttonText = "🌙 Dark";
  }

  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-md text-sm border ${buttonStyle}`}
    >
      {buttonText}
    </button>
  );
}

export default DarkModeToggle;