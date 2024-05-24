import downArrorIcon from './assets/down-arrow-icon.png';
import upArrowIcon from './assets/up-arrow-icon.png';
import { FilterExpanded } from './components/FilterExpanded';

export const FilterPresentation = ({
  isFilterOpen,
  handleFilterToggle,
  closeFilterModal,
}) => {
  return (
    <div className="relative">
      <button
        onClick={handleFilterToggle}
        className="flex gap-2 items-center py-2 px-3 shadow-lg rounded border"
      >
        <span>Filter</span>
        <img
          className="h-3"
          src={isFilterOpen ? upArrowIcon : downArrorIcon}
          alt="filter-icon"
        />
      </button>
      {isFilterOpen && <FilterExpanded closeFilterModal={closeFilterModal} />}
    </div>
  );
};
