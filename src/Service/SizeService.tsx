import API from "../Config/api";

class SizeService {
  getAllSizes = () => {
    return API("size", "GET", "", "");
  };
}
const sizeService = new SizeService();
export default sizeService;
