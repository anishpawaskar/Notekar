import { Link } from 'react-router-dom';
import labelIcon from '../../assets/label-icon.png';
import cancelIcon from '../../assets/cancel-icon.png';

export const FilterExpandedPresentation = ({
  labels,
  closeFilterModal,
  activeLink,
}) => {
  return (
    <>
      <div
        onClick={closeFilterModal}
        className="w-full h-full fixed top-0 left-0 z-10"
      ></div>
      <div className="absolute w-52 top-12 left-0 z-50 bg-white rounded-md shadow-lg border">
        <div className="flex items-center justify-between font-medium border-b-[#afafaf] border-b px-2 py-[2px]">
          <p>Filter</p>
          <button onClick={closeFilterModal}>
            <img className="h-4" src={cancelIcon} alt="cancel-icon" />
          </button>
        </div>
        <ul>
          <Link
            className={`${activeLink === 'Notes' && 'bg-[#e0e0e0]'} block`}
            to="/notes"
          >
            <li className="w-full hover:bg-[#e0e0e0]">
              <button
                onClick={closeFilterModal}
                className="w-full px-2 py-[2px] flex gap-4 items-center text-sm"
              >
                <img className="h-4" src={labelIcon} alt="label-icon" />
                <span>All</span>
              </button>
            </li>
          </Link>
          {labels.map((label) => {
            return (
              <Link
                className={`${activeLink === label.name && 'bg-[#e0e0e0]'} block`}
                to={`/notes/?label=${label.name}`}
                key={label._id}
              >
                <li className="w-full hover:bg-[#e0e0e0]">
                  <button
                    onClick={closeFilterModal}
                    className="w-full px-2 py-[2px] flex gap-4 items-center text-sm"
                  >
                    <img className="h-4" src={labelIcon} alt="label-icon" />
                    <span>{label.name}</span>
                  </button>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};
