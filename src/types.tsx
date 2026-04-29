// src/types.tsx

export interface ImageItem {
  mediaItemUrl: string;
  altText?: string;
}

export interface HomePageData {
  homePageTitle: string;
  presentingText: string;
  buttonText: string;
  buttonUrl: string;
  homePageGallery: ImageItem[];
  homePageGallery2: ImageItem[];
}

export interface PageNode {
  id: string;
  title: string;
  uri: string;
}

export interface NavHit {
  node: PageNode;
}
