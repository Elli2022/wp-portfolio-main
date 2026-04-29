// src/types.tsx

export interface ImageItem {
  mediaItemUrl: string;
  altText?: string;
  uri: any;
}

export interface HomePageData {
  homePage: any;
  homePageTitle: string;
  presentingText: string;
  buttonText: string;
  buttonUrl: string;
  homePageGallery: ImageItem[];
}

export interface PageNode {
  id: string;
  title: string;
  uri: string;
}

export interface NavHit {
  node: PageNode;
  title: string;
  uri: any;
  navHits: any;
  id: any;
}

export interface initialImages {
  initialImages: number;
}

export interface getImages {
  page: number;
  perImage: number;
}

export interface Home {
  data: any;
  navlinks: any;
  hit: any;
}
