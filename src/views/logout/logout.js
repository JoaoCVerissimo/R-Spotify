import React, { useEffect } from "react";

function Logout(props) {
  useEffect(() => {
    localStorage.removeItem("token");
    props.history.push("/");
  }, [])

  return (
    <> </>
  );
};

export default Logout;
