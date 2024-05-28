import { useRef, useState } from 'react';
import { EditLabelsPresentation } from './Presentation';
import {
  useAddNewLabelMutation,
  useGetLabelsQuery,
} from '../../app/services/api';

export const EditLabels = () => {
  const [labelToEditId, setLabelToEditId] = useState(null);
  const [isCreatingLabel, setIsCreatingLabel] = useState(true);

  const { data, isLoading } = useGetLabelsQuery();
  const [addNewLabel] = useAddNewLabelMutation();

  const createLabelInputRef = useRef(null);

  const handleToggle = () => {
    setIsCreatingLabel((prevState) => !prevState);
    setLabelToEditId(null);
  };

  const handleLabelCreation = async () => {
    if (createLabelInputRef.current.value !== '') {
      await addNewLabel({
        name: createLabelInputRef.current.value,
      }).unwrap();

      createLabelInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <EditLabelsPresentation
      createLabelInputRef={createLabelInputRef}
      labels={data.labels}
      labelToEditId={labelToEditId}
      setLabelToEditId={setLabelToEditId}
      isCreatingLabel={isCreatingLabel}
      setIsCreatingLabel={setIsCreatingLabel}
      handleToggle={handleToggle}
      handleLabelCreation={handleLabelCreation}
    />
  );
};
