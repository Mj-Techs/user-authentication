import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const Logout = (props) => {
  const { LoginStatus } = props;
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .delete("http://dct-user-auth.herokuapp.com/users/logout", {
        headers: { "x-auth": token },
      })
      .then((response) => {
        const data = response.data;
        localStorage.removeItem("token");
        if (data.notice) {
          LoginStatus();
          history.push("/");
          swal("Hey!", "You have successfully logged out", "success");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [history]);
  return null;
};

export default Logout;
