import defaultColorIcon from './assets/default-color-icon.png';

export const ColorPalettePresentation = ({
  colors,
  closeColorPalette,
  colorHandler,
}) => {
  const colorList = colors.map((color, idx) => {
    const liClassName =
      color.name === 'Default'
        ? 'h-8 w-8 rounded-full flex items-center justify-center border'
        : 'h-8 w-8 rounded-full';

    return (
      <li key={idx} style={{ background: color.color }} className={liClassName}>
        {color.name === 'Default' ? (
          <button
            onClick={(e) => colorHandler(color.color, color.hoverBgColor, e)}
            className="h-full w-full rounded-full"
          >
            <img
              className="m-0 h-full"
              src={defaultColorIcon}
              alt={color.name}
            />
          </button>
        ) : (
          <button
            onClick={(e) => colorHandler(color.color, color.hoverBgColor, e)}
            className="h-full w-full rounded-full"
          ></button>
        )}
      </li>
    );
  });
  return (
    <>
      <div
        onClick={closeColorPalette}
        className="w-full h-full absolute top-0 left-0 z-10"
      />
      <ul
        className={`flex items-center gap-1 flex-wrap bg-white shadow-xl p-2 rounded-lg border absolute bottom-[-75px] left-[-20px] sm:left-[-35px] sm:bottom-[-36px] z-20`}
      >
        {colorList}
      </ul>
    </>
  );
};
