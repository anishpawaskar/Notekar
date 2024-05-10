import { ColorPalettePresentation } from './Presentation';
import { COLORS } from './ColorPaletteConstants';

export const ColorPalette = ({ closeColorPalette, colorHandler }) => {
  return (
    <ColorPalettePresentation
      colors={COLORS}
      closeColorPalette={closeColorPalette}
      colorHandler={colorHandler}
    />
  );
};
