import cancelIcon from './assets/cancel-icon.png';
import checkIcon from './assets/check-icon.png';
import { LabelsList } from './components/LabelsList';

export const EditLabelsPresentation = ({
  createLabelInputRef,
  labels,
  labelToEditId,
  setLabelToEditId,
}) => {
  return (
    <div className="border w-72 m-auto mt-6">
      <div className="p-4 flex flex-col gap-4">
        <p className="mt-0 text-md font-medium">Edit labels</p>
        <div className="flex items-center justify-between">
          <button>
            <img className="h-4" src={cancelIcon} alt="cancel edit" />
          </button>
          <input
            ref={createLabelInputRef}
            className="focus:outline-none focus:border-b focus:border-b-[#afafaf] placeholder:text-sm"
            type="text"
            placeholder="Create new label"
          />
          <button>
            <img className="h-4" src={checkIcon} alt="create label" />
          </button>
        </div>
      </div>
      <ul className="p-4 pt-0 flex flex-col gap-2 max-h-96">
        {labels.map((label) => {
          return (
            <LabelsList
              key={label._id}
              label={label}
              labelToEditId={labelToEditId}
              setLabelToEditId={setLabelToEditId}
            />
          );
        })}
      </ul>
    </div>
  );
};
