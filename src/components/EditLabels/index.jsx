import { useRef, useState } from 'react';
import { EditLabelsPresentation } from './Presentation';
import { useGetLabelsQuery } from '../../app/services/api';

export const EditLabels = () => {
  const [labelToEditId, setLabelToEditId] = useState(null);

  const { data, isLoading } = useGetLabelsQuery();
  const createLabelInputRef = useRef(null);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <EditLabelsPresentation
      createLabelInputRef={createLabelInputRef}
      labels={data.labels}
      labelToEditId={labelToEditId}
      setLabelToEditId={setLabelToEditId}
    />
  );
};
