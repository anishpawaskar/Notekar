import { useGetLabelsQuery } from '../../app/services/api';
import { LabelsPresentation } from './Presentation';

export const Labels = () => {
  const { data, isLoading } = useGetLabelsQuery();
  if (isLoading) {
    return <p>Loading....</p>;
  }
  return <LabelsPresentation labels={data.labels} />;
};
