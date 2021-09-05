import React from "react";
import ModalCode from "../../../Component/ModalCode";
import codeService from "../../../Service/CodeService";
import userService from "../../../Service/UserService";

export default function CodePage() {
  const [listUser, setUser] = React.useState([]);
  React.useEffect(() => {
    const token = userService.getAccessToken();
    const callAPI = async () => {
      const res = await codeService.getListCode(token);
      setUser(res.data);
    };
    callAPI();
  }, []);

  return (
    <div>
      <h1>Management Code</h1>

      <ModalCode />
    </div>
  );
}
