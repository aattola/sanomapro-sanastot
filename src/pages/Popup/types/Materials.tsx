interface Material {
  state: string;
  hidden: boolean;
  version: string;
  primaryColor: string;
  language: string;
  bundleId: string;
  bundleTitle: string;
  materialTitle: string;
  materialId: string;
  productId: string;
  updatedAt: string;
  createdAt: string;
  coverImage: string;
  coverImages: MaterialCoverImage;
}

interface MaterialCoverImages {
  height: number;
  width: number;
  url: string;
}

interface MaterialCoverImage {
  large: MaterialCoverImages;
  medium: MaterialCoverImages;
  small: MaterialCoverImages;
}

export { Material, MaterialCoverImage }
