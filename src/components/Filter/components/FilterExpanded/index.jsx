import { useGetLabelsQuery } from '../../../../app/services/api';
import { useGetActiveLink } from '../../../../hooks/useGetActiveLink';
import { FilterExpandedPresentation } from './Presentation';

export const FilterExpanded = ({ closeFilterModal }) => {
  const { data, isLoading } = useGetLabelsQuery();
  const [activeLink] = useGetActiveLink();

  if (isLoading) {
    return <p>Loading.....</p>;
  }
  return (
    <FilterExpandedPresentation
      labels={data.labels}
      closeFilterModal={closeFilterModal}
      activeLink={activeLink}
    />
  );
};
