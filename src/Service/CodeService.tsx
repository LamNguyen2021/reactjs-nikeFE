import API from "../Config/api";

class CodeService {
  getListCode = (token: string) => {
    return API(`code`, "GET", "", token);
  };
}

const codeService = new CodeService();
export default codeService;
