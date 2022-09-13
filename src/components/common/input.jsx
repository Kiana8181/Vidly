import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        autoFocus
        {...rest}
        name={name}
        id={name}
      />
      {items !== null ? (
        <div>
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></button>
          <ul className="dropdown-menu dropdown-menu-end">
            {items.map((item) => (
              <li className="dropdown-item" key={item._id}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
