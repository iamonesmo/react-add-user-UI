import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values",
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please positive values for age",
      });
      return;
    }
    // console.log(enteredAge, enteredUsername);
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredAge("");
    setEnteredUsername("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  function errorHandler() {
    setError(null);
  }

  return (
    <div>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            value={enteredUsername}
            id="username"
            type="text"
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            value={enteredAge}
            id="age"
            type="number"
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
