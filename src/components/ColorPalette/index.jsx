import { ColorPalettePresentation } from './Presentation';
import { COLORS } from './ColorPaletteConstants';

export const ColorPalette = ({ closeColorPalette }) => {
  return (
    <ColorPalettePresentation
      colors={COLORS}
      closeColorPalette={closeColorPalette}
    />
  );
};
