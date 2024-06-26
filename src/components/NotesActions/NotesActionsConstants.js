import deleteIcon from './assets/delete-icon.png';
import archiveIcon from './assets/archive-icon.png';
import colorPaletteIcon from './assets/color-palette-icon.png';
import imgUploaderIcon from './assets/img-uploader-icon.png';
import labelIcon from './assets/label-icon.png';

export const NOTES_EDIT_FORM_ACTIONS = [
  {
    id: '1',
    name: 'Background-option',
    type: 'button',
    imgUrl: colorPaletteIcon,
    actionType: 'changeBackground',
  },
  {
    id: '2',
    name: 'Add Image',
    type: 'input',
    imgUrl: imgUploaderIcon,
    actionType: 'uplaodImage',
  },
  {
    id: '3',
    name: 'Archive',
    type: 'button',
    imgUrl: archiveIcon,
    actionType: 'archive',
  },
  {
    id: '4',
    name: 'Add Label',
    type: 'button',
    imgUrl: labelIcon,
    actionType: 'addLabel',
  },
  {
    id: '5',
    name: 'Delete',
    type: 'button',
    imgUrl: deleteIcon,
    actionType: 'delete',
  },
];

export const NOTES_FORM_ACTIONS = [
  {
    id: '1',
    name: 'Background-option',
    type: 'button',
    imgUrl: colorPaletteIcon,
    actionType: 'changeBackground',
  },
  {
    id: '2',
    name: 'Add Image',
    type: 'input',
    imgUrl: imgUploaderIcon,
    actionType: 'uplaodImage',
  },
  {
    id: '3',
    name: 'Archive',
    type: 'button',
    imgUrl: archiveIcon,
    actionType: 'archive',
  },
  {
    id: '4',
    name: 'Add Label',
    type: 'button',
    imgUrl: labelIcon,
    actionType: 'addLabel',
  },
];

export const NOTES_CARD_ACTIONS = [
  {
    id: '1',
    name: 'Background-option',
    type: 'button',
    imgUrl: colorPaletteIcon,
    actionType: 'changeBackground',
    usedFor: 'card',
  },
  {
    id: '2',
    name: 'Archive',
    type: 'button',
    imgUrl: archiveIcon,
    actionType: 'archive',
    usedFor: 'card',
  },
  {
    id: '3',
    name: 'Delete',
    type: 'button',
    imgUrl: deleteIcon,
    actionType: 'delete',
    usedFor: 'card',
  },
];
