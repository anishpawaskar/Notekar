import { useRef, useState } from 'react';
import { LabelsListPresentation } from './Presentation';
import {
  useDeleteLabelMutation,
  useUpdateLabelMutation,
} from '../../../../app/services/api';

export const LabelsList = ({ label, labelToEditId, setLabelToEditId }) => {
  const [isHover, setIsHover] = useState(false);

  const [updateLabel] = useUpdateLabelMutation();
  const [deleteLabel] = useDeleteLabelMutation();

  const labelInputRef = useRef(null);

  const handleUpdateLabel = async (labelId, inputRef) => {
    if (
      label.name !== inputRef.current.value ||
      inputRef.current.value !== ''
    ) {
      await updateLabel({
        labelId,
        body: {
          name: inputRef.current.value,
        },
      }).unwrap();
      setLabelToEditId(null);
    }
    setLabelToEditId(null);
  };

  const handleEditMode = (labelId) => {
    if (labelToEditId !== labelId) {
      setLabelToEditId(labelId);
    }
  };

  const handleDeleteLabel = async (labelId) => {
    await deleteLabel(labelId).unwrap();
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
