import { useState } from 'react';
import { FilterPresentation } from './Presentation';
import { useGetLabelsQuery } from '../../app/services/api';

export const Filter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
  };

  const closeFilterModal = () => {
    setIsFilterOpen(false);
  };

  return (
    <FilterPresentation
      isFilterOpen={isFilterOpen}
      handleFilterToggle={handleFilterToggle}
      closeFilterModal={closeFilterModal}
    />
  );
};
