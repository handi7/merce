import { PUBLIC_URL } from "../../lib/constants";

export default function getProfileImg(imageName) {
  if (!imageName) {
    imageName = "product.png";
  }
  return `${PUBLIC_URL}/profiles/${imageName}`;
}
