import deleteIcon from '../../assets/delete-icon.png';
import editIcon from '../../assets/edit-icon.png';
import labelIcon from '../../assets/label-icon.png';
import checkIcon from '../../assets/check-icon.png';
import { useEffect } from 'react';

export const LabelsListPresentation = (props) => {
  const {
    label,
    labelInputRef,
    isHover,
    labelToEditId,
    handleUpdateLabel,
    handleEditMode,
    handleDeleteLabel,
    handleMouseEnter,
    handleMouseLeave,
  } = props;

  useEffect(() => {
    if (labelToEditId === label._id && labelInputRef.current) {
      labelInputRef.current.focus();
    }
  }, [labelToEditId]);

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex gap-4 justify-between"
    >
      <button
        onClick={() =>
          (isHover || labelToEditId === label._id) &&
          handleDeleteLabel(label._id)
        }
      >
        <img
          className="h-5"
          src={isHover || labelToEditId === label._id ? deleteIcon : labelIcon}
          alt="delete label"
        />
      </button>
      {labelToEditId === label._id ? (
        <input
          defaultValue={label.name}
          ref={labelInputRef}
          className="w-full focus:outline-none focus:border-b focus:border-b-[#afafaf] text-sm"
        />
      ) : (
        <p className="w-full text-sm">{label.name}</p>
      )}
      <button
        onClick={() =>
          labelToEditId === label._id
            ? handleUpdateLabel(label._id, labelInputRef)
            : handleEditMode(label._id)
        }
      >
        <img
          className="h-5"
          src={labelToEditId === label._id ? checkIcon : editIcon}
        />
      </button>
    </li>
  );
};
