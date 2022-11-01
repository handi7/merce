import { PUBLIC_URL } from "../../lib/constants";

export default function getProductImg(imageName) {
  if (!imageName) {
    imageName = "product.png";
  }
  return `${PUBLIC_URL}/products/${imageName}`;
}
