import API from "../Config/api";

class CategoryService {
  getAllCategory = () => {
    return API("category", "GET", "", "");
  };
}

const categoryService = new CategoryService();
export default categoryService;
