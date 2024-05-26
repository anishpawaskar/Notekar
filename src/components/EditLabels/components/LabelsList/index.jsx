import { useRef, useState } from 'react';
import { LabelsListPresentation } from './Presentation';

export const LabelsList = ({ label, labelToEditId, setLabelToEditId }) => {
  const [isHover, setIsHover] = useState(false);

  const labelInputRef = useRef(null);

  const handleUpdateLabel = (labelId, inputRef) => {
    console.log(
      'aata update kar ani editable la false kar',
      inputRef.current.value,
    );
    setLabelToEditId(null);
  };

  const handleEditMode = (labelId) => {
    if (labelToEditId !== labelId) {
      setLabelToEditId(labelId);
    }
  };

  const handleDeleteLabel = (labelId) => {
    console.log('label delete kar', labelId);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <LabelsListPresentation
      label={label}
      labelInputRef={labelInputRef}
      isHover={isHover}
      labelToEditId={labelToEditId}
      handleEditMode={handleEditMode}
      handleUpdateLabel={handleUpdateLabel}
      handleDeleteLabel={handleDeleteLabel}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};
