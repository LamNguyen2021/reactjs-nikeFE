import API from "../Config/api";

class CategoryService {
  getAllCategory = () => {
    return API("category", "GET", "", "");
  };
  createCategory = (body: { nameCategory: string }) => {
    return API("category", "POST", body, "");
  };
}

const categoryService = new CategoryService();
export default categoryService;
