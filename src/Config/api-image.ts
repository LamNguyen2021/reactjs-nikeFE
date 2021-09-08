import axios from "axios";
import * as URL from "./url";

export default function API_IMAGE(formData: FormData) {
  return axios({
    method: "POST",
    url: `${URL.API_IMGBB}`,
    data: formData,
  });
}
