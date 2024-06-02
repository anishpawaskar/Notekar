import { Link } from 'react-router-dom';

export const NotesActionsPresentation = ({
  notesActions,
  handleActions,
  imageHandler,
}) => {
  const actions = notesActions.map((action) => {
    const isLinkBtn = action?.usedFor ? (
      <button onClick={(e) => handleActions(e, action.actionType)}>
        <img
          className="h-[1.12rem] hover:scale-125"
          src={action.imgUrl}
          alt={action.name}
        />
      </button>
    ) : (
      <Link to="/notes">
        <button onClick={(e) => handleActions(e, action.actionType)}>
          <img
            className="h-[1.12rem] hover:scale-125"
            src={action.imgUrl}
            alt={action.name}
          />
        </button>
      </Link>
    );

    return (
      <div
        className={action.type === 'input' ? 'self-baseline' : 'self-auto'}
        key={action.id}
      >
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
              onChange={(e) => imageHandler(e)}
              id="upload"
              type="file"
              accept="image/png, image/jpeg"
              hidden
            />
          </>
        ) : (
          isLinkBtn
        )}
      </div>
    );
  });
  return <div className="flex gap-3 items-center">{actions}</div>;
};
