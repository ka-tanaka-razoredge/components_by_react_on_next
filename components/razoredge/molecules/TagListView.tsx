export default (props) => {
  return (
    <>
      <style>
      {
        `
          .tag-list-view {
            display: flex;
            gap: 0.25rem;
            flex-wrap: wrap;

            border: 1px solid black;
            background-color: white;
            padding: 0.25rem;
            height: auto;
          }
        `
      }
      </style>
      <div
        className="tag-list-view"
        onDoubleClick={props.addTag}
      >
        {props.children}
      </div>
    </>
  );
};
