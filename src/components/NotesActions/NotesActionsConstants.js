import deleteIcon from './assets/delete-icon.png';
import archiveIcon from './assets/archive-icon.png';

export const NOTES_EDIT_FORM_ACTIONS = [
  {
    id: '1',
    name: 'Delete',
    type: 'button',
    imgUrl: deleteIcon,
    actionType: 'delete',
  },
];

export const NOTES_FORM_ACTIONS = [
  {
    id: '1',
    name: 'Archive',
    type: 'button',
    imgUrl: archiveIcon,
  },
];
