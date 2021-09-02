import API from "../Config/api";

class ProductDetailService {
  getProductDetail = (id: string) => {
    return API(`product/${id}/productDetail`, "GET", "", "");
  };
}

const productDetailService = new ProductDetailService();
export default productDetailService;
