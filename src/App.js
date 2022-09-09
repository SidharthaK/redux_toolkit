import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "./store/reducers/userSlice";
import { AddUser } from "./store/reducers/userSlice";
import { fetchTodoDetails } from "./store/reducers/todoSlice";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  // form values
  const [newUser, setUser] = useState({ name: "", username: "", email: "" });

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(fetchTodoDetails());
  }, []);

  const { data, isLoading, errors } = useSelector((state) => state?.userSlice);
  const { isLoadingTodo, todoErrors, todoData } = useSelector(
    (state) => state?.todoSlice
  );
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const newUsers = {
      id: uuidv4(),
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    };
    if (
      newUser.name !== "" &&
      newUser.username !== "" &&
      newUser.email !== ""
    ) {
      setError(false);
      dispatch(AddUser(newUsers));
      setUser({ name: "", username: "", email: "" });
    } else {
      setError(true);
      setUser({ name: "", username: "", email: "" });
    }
  };

  return (
    <div className="main_container">
      <h2 className="heading">Redux-Toolkit</h2>
      <div className="split_container">
        <div className="container">
          <h3 className="heading">User Details</h3>
          {errors && <p>No user Found</p>}
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="row_container">
              <div className="addUser">
                <h3>
                  Total No.of users:
                  <span className="colour">
                    {data?.length > 0 ? data?.length : " 0"}
                  </span>
                </h3>
                <h3>List of users :</h3>
              </div>
              <div>
                <h3>
                  Add user :{" "}
                  <span className="colour">
                    {error ? "Please Enter Details Correctly" : null}
                  </span>
                </h3>
                <span>Name: </span>
                <input
                  value={newUser.name}
                  onChange={(e) =>
                    setUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter name"
                />
                <span>Username: </span>
                <input
                  value={newUser.username}
                  onChange={(e) =>
                    setUser({ ...newUser, username: e.target.value })
                  }
                  placeholder="Enter username"
                />
                <span>Email: </span>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Enter emailid"
                />
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="submit_button"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          <div className="user_main_container">
            {data?.map((each) => (
              <div className="user_container" key={each.id}>
                <h4>Name: {each.name}</h4>
                <h4>Username: {each.username}</h4>
                <h4>Email Id: {each.email}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <h3 className="heading">Todo Data</h3>
          {todoErrors && <p>No todo Item found</p>}
          {isLoadingTodo ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="user_main_container">
              {todoData?.length > 10
                ? todoData?.slice(0, 11).map((each) => (
                    <div className="todo_container" key={each.id}>
                      <h4>Title: {each.title}</h4>
                      <h4>Completed: {each.completed}</h4>
                    </div>
                  ))
                : todoData?.map((each) => (
                    <div className="todo_container" key={each.id}>
                      <h4>Title: {each.title}</h4>
                      <h4>Completed: {each.completed}</h4>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
