import React, { useState } from "react";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Flag from "./Flag";

const App = () => {
  const [page, setPage] = useState("login");
  const [flag, setFlag] = useState("");

  return (
    <div>
      {page === "login" && <Login onLogin={() => alert("登入成功！")} onForgotPassword={() => setPage("reset")} />}
      {page === "reset" && <ResetPassword onShowFlag={(flag) => { setFlag(flag); setPage("flag"); }} />}
      {page === "flag" && <Flag flag={flag} />}
    </div>
  );
};

export default App;
