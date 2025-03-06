// TODO: Para correr el Comando seed en Dev
export interface ProductDev {
  // id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  title: string
  type: Type

  gender: Category
}

// TODO: Para usar la bd ya en tablePlus
export interface Product {
  id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: Size[]
  slug: string
  tags: string[]
  title: string
  // type: Type

  gender: Category
}

// TODO:  interface for cart
export interface CartProduct {
  id: string
  slug: string
  title: string
  price: number
  quantity: number
  size: Size
  image: string
}

export type Category = "men" | "women" | "kid" | "unisex"
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL"
export type Type = "shirts" | "pants" | "hoodies" | "hats"
