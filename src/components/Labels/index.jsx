import { useDispatch, useSelector } from 'react-redux';
import { useGetLabelsQuery } from '../../app/services/api';
import { LabelsPresentation } from './Presentation';
import {
  handleActiveActionModal,
  handleLabelsForAddition,
} from '../NoteForm/noteFormSlice';

export const Labels = () => {
  const { data, isLoading } = useGetLabelsQuery();

  const {
    formData: { labelsToAdd },
  } = useSelector((state) => state.noteForm);

  const dispatch = useDispatch();

  const handleLabel = (label, labelCheckboxRef) => {
    const labelId = label._id;

    labelCheckboxRef.current.checked = !labelCheckboxRef.current.checked;
    const isLabelAlreadyAdded = labelsToAdd.find(
      (label) => label._id === labelId,
    );

    if (isLabelAlreadyAdded) {
      const newLabelsToAdd = labelsToAdd.filter(
        (label) => label._id !== labelId,
      );
      dispatch(handleLabelsForAddition({ labels: newLabelsToAdd }));
    } else {
      dispatch(handleLabelsForAddition({ labels: [...labelsToAdd, label] }));
    }
  };

  const closeLabels = () => {
    dispatch(handleActiveActionModal({ activeActionModal: null }));
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <LabelsPresentation
      labels={data.labels}
      handleLabel={handleLabel}
      labelsToAdd={labelsToAdd}
      closeLabels={closeLabels}
    />
  );
};
