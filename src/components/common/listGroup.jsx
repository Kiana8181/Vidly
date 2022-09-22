import React from "react";

const ListGroup = ({
  onClick,
  genres,
  currentListGroup,
  valueProperty,
  textProperty,
}) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          onClick={() => onClick(genre)}
          key={genre[valueProperty]}
          className={
            currentListGroup === genre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
