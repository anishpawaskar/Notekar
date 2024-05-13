import { ColorPalettePresentation } from './Presentation';
import { COLORS } from './ColorPaletteConstants';

export const ColorPalette = ({ closeColorPalette, colorHandler, usingIn }) => {
  return (
    <ColorPalettePresentation
      colors={COLORS}
      closeColorPalette={closeColorPalette}
      colorHandler={colorHandler}
      usingIn={usingIn}
    />
  );
};
