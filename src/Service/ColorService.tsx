import API from "../Config/api";

class ColorService {
  getAllColors = () => {
    return API("color", "GET", "", "");
  };
}
const colorService = new ColorService();
export default colorService;
