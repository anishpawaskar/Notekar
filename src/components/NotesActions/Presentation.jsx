import { Link } from 'react-router-dom';

export const NotesActionsPresentation = ({ notesActions, handleActions }) => {
  const actions = notesActions.map((action) => {
    return (
      <div key={action.id}>
        {action.type === 'input' ? (
          <>
            <label htmlFor="upload">
              <img
                className="h-[1.12rem] hover:scale-125"
                src={action.imgUrl}
                alt={action.name}
              />
            </label>
            <input
              id="upload"
              type="file"
              accept="image/png, image/jpeg"
              hidden
            />
          </>
        ) : (
          <Link to="/">
            <button onClick={() => handleActions(action.actionType)}>
              <img
                className="h-[1.12rem] hover:scale-125"
                src={action.imgUrl}
                alt={action.name}
              />
            </button>
          </Link>
        )}
      </div>
    );
  });
  return <div className="flex gap-3 items-center">{actions}</div>;
};
