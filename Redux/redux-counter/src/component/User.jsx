import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchusers } from "../slice/UserSlice";
import { useEffect } from "react";

const User = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  console.log(users)
  if (loading) <p>Loading......</p>;
  if (error) <p>Error Occured</p>;

  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);
  return (
    <>
      <h1>User List</h1>
      {/* <ul>
        {user.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
