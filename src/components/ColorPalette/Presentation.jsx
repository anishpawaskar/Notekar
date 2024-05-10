import defaultColorIcon from './assets/default-color-icon.png';

export const ColorPalettePresentation = ({ colors, closeColorPalette }) => {
  const colorList = colors.map((color) => {
    const liClassName =
      color.name === 'Default'
        ? 'h-8 w-8 rounded-full flex items-center justify-center border'
        : 'h-8 w-8 rounded-full';
    return (
      <li style={{ background: color.color }} className={liClassName}>
        {color.name === 'Default' ? (
          <button className="h-full w-full rounded-full">
            <img
              className="m-0 h-full"
              src={defaultColorIcon}
              alt={color.name}
            />
          </button>
        ) : (
          <button className="h-full w-full rounded-full"></button>
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
      <ul className="flex items-center gap-1 flex-wrap bg-white shadow-xl p-2 rounded-lg border absolute bottom-[-75px] left-[-20px] sm:bottom-[-35px] sm:left-[-35px] ">
        {colorList}
      </ul>
    </>
  );
};
