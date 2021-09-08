import API from "../Config/api";

class GenderService {
  getAllGenders = () => {
    return API("gender", "GET", "", "");
  };
}
const genderService = new GenderService();
export default genderService;
