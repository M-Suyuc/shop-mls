export interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Category;
}

export interface Product {
  // id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Category;
}

export type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";

export interface Facet {
  code: string;
  priority: number;
  category: boolean;
  multiSelect: boolean;
  visible: boolean;
  values: Value[];
}

export interface Value {
  code: string;
  count: number;
  selected: boolean;
}

export interface Pagination {
  pageSize: number;
  currentPage: number;
  sort: string;
  numberOfPages: number;
  totalNumberOfResults: number;
  totalNumberOfResultsUnfiltered: number;
}

export interface RangeFacet {
  code: string;
  range: Range;
}

export interface Range {
  min: number;
  max: number;
  minSelected: number;
  maxSelected: number;
}

// export interface Result {
//   code: string;
//   name: string;
//   stock: Stock;
//   price: Price;
//   images: GalleryImage[];
//   categories: any[];
//   pk: string;
//   whitePrice: Price;
//   yellowPrice?: Price;
//   promotionMarker?: PromotionMarker;
//   articles: Article[];
//   visible: boolean;
//   numbersOfPieces: number;
//   defaultArticle: Article;
//   sale: boolean;
//   variantSizes: VariantSize[];
//   swatches: any[];
//   articleCodes: string[];
//   ticket: string;
//   searchEngineProductId: string;
//   dummy: boolean;
//   linkPdp: string;
//   categoryName: CategoryName;
//   rgbColors: string[];
//   articleColorNames: string[];
//   ecoTaxValue: number;
//   swatchesTotal: number;
//   showPriceMarker: boolean;
//   redirectToPdp: boolean;
//   mainCategoryCode: string;
//   comingSoon: boolean;
//   brandName: BrandName;
//   galleryImages: GalleryImage[];
//   allArticleCodes: string[];
//   allArticleImages: string[];
//   allArticleBaseImages: string[];
//   markers?: Marker[];
//   concept?: string[];
//   sellingAttributes?: string[];
//   redPrice?: Price;
// }

// export interface Article {
//   code: string;
//   name: string;
//   images: GalleryImage[];
//   pk: string;
//   whitePrice: Price;
//   yellowPrice?: Price;
//   logoPicture: GalleryImage[];
//   normalPicture: GalleryImage[];
//   visible: boolean;
//   numbersOfPieces: number;
//   ticket: string;
//   dummy: boolean;
//   ecoTaxValue: number;
//   redirectToPdp: boolean;
//   comingSoon: boolean;
//   color: Color;
//   rgbColor: string;
//   genArticle?: string;
//   turnToSku: string;
//   markers?: Marker[];
//   sellingAttributes?: string[];
//   flexiPLPLayout?: FlexiPLPLayout;
//   redPrice?: Price;
//   percentageDiscount?: string;
//   comparativePrice?: ComparativePrice;
//   quantity?: string;
// }

export interface Color {
  code: string;
  text: string;
  filterName: string;
  hybrisCode: string;
}

export interface ComparativePrice {
  formattedPrice: string;
  multipack: boolean;
}

export interface FlexiPLPLayout {
  type: string;
}

// export interface GalleryImage {
//   url: string;
//   baseUrl: string;
// }

export interface Marker {
  text: BrandName;
  type: string;
}

export type BrandName = "H&M" | "benuta";

export interface Price {
  currencyIso: CurrencyISO;
  value: number;
  priceType: PriceType;
  formattedValue: string;
  type: Type;
}

export type CurrencyISO = "EUR";

export type PriceType = "BUY";

// export type Type = "RED" | "WHITE" | "YELLOW";

export type CategoryName = "kid" | "women" | "men";

export interface PromotionMarker {
  code: string;
  text: string;
  legalText?: string;
}

export interface Stock {
  stockLevel: number;
}

export interface VariantSize {
  orderFilter: number;
  filterCode: string;
}
