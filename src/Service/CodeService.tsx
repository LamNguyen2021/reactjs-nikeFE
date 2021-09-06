import API from "../Config/api";

class CodeService {
  getListCode = (token: string) => {
    return API(`code`, "GET", "", token);
  };
  postCode = (token: string, data: any) => {
    return API(`code`, "POST", data, token);
  };
  updateCode = (id: string, token: string, data: any) => {
    return API(`code/${id}`, "PATCH", data, token);
  };
  removeCode = (id: string, token: string) => {
    return API(`code/${id}`, "DELETE", "", token);
  };
  postCodeDetail = (token: string, data: any) => {
    return API(`code-detail`, "POST", data, token);
  };
  getListCodeDetail = (token: string) => {
    return API(`code-detail`, "GET", "", token);
  };
  updateCodeDetail = (id: string, token: string, data: any) => {
    return API(`code-detail/${id}`, "PATCH", data, token);
  };
}

const codeService = new CodeService();
export default codeService;
