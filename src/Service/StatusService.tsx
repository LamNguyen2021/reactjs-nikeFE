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
  updateStatus = (id: string, data: any, token: string) => {
    return API(`status/${id}`, "PATCH", data, token);
  };
}
const statusService = new StatusService();
export default statusService;
