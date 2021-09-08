import API from "../Config/api";

class ProductDetailService {
  getAccessToken = () => {
    return localStorage.getItem("accessToken") || "";
  };
  getProductDetail = (id: string) => {
    return API(`product/${id}/productDetail`, "GET", "", "");
  };
  createProductDetail = (
    id: string,
    body: {
      statusId: string;
      colorId: string;
      genderId: string;
      quantities: {
        quantity: number;
        sizeId: string;
        price: number;
      }[];
      imageUrls: string[];
    }
  ) => {
    return API(
      `product/${id}/productDetail`,
      "POST",
      body,
      this.getAccessToken()
    );
  };

  editProductDetail = (
    id: string,
    body: {
      statusId: string;
      colorId: string;
      genderId: string;
      quantities: {
        quantity: number;
        sizeId: string;
        price: number;
      }[];
      imageUrls: string[];
    }
  ) => {
    return API(
      `product/productDetail/${id}`,
      "PATCH",
      body,
      this.getAccessToken()
    );
  };

  deleteProductDetail = (id: string) => {
    return API(
      `product/productDetail/${id}`,
      "DELETE",
      "",
      this.getAccessToken()
    );
  };
}

const productDetailService = new ProductDetailService();
export default productDetailService;
