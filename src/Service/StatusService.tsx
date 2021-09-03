import API from "../Config/api";

class StatusService {
  getAllStatus = () => {
    return API("status", "GET", "", "");
  };
  createStatus = (data: any, token: any) => {
    return API("status", "POST", data, token);
  };
  deleteStatus = (id: string, token: string) => {
    return API(`status/${id}`, "DELETE", "", token);
  };
}
const statusService = new StatusService();
export default statusService;
