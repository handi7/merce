import { PUBLIC_URL } from "../../lib/constants";

export const getProductImg = (imageName) => {
  if (!imageName) {
    imageName = "product.png";
  }
  return `${PUBLIC_URL}/products/${imageName}`;
};

export const getProfileImg = (imageName) => {
  if (!imageName) {
    imageName = "product.png";
  }
  return `${PUBLIC_URL}/profiles/${imageName}`;
};
