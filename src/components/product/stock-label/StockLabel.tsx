"use client"

import { getStockBySlug } from "@/actions/products/get-stock-by-slug"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock()
  }, [slug])

  const getStock = async () => {
    const stock = await getStockBySlug(slug)
    setStock(stock)
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} text-lg font-semibold antialiased animate-pulse bg-gray-200`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} text-lg font-semibold antialiased`}
        >
          Stock: {stock}
        </h1>
      )}
    </>
  )
}
