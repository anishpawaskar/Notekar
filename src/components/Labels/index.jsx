import { useGetLabelsQuery } from '../../app/services/api';
import { LabelsPresentation } from './Presentation';

export const Labels = ({ handleLabel, labelsToAdd, closeLabels }) => {
  const { data, isLoading } = useGetLabelsQuery();
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
