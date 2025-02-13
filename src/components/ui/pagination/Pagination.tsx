"use client"

import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers"
import clsx from "clsx"
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

interface PaginationProps {
  totalPages: number
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const pageString = searchParams.get("page") ?? 1

  const currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString)
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname)
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`
    }

    if (+pageNumber <= 0) {
      return `${pathname}`
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <>
      <div className="flex text-center mt-10 mb-32 justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item disabled">
              <Link
                className={clsx(
                  `page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`,
                  {
                    "pointer-events-none text-slate-400": currentPage === 1,
                  }
                )}
                href={createPageUrl(currentPage - 1)}
              >
                <IoChevronBackOutline size={30} />
              </Link>
            </li>
            {allPages.map((page, index) => (
              <li key={index} className="page-item">
                <Link
                  className={clsx(
                    `page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`,
                    {
                      "bg-blue-600 shadow-md text-white hover:text-white hover:bg-blue-700":
                        currentPage === page,
                      "text-blue-500": page === "...",
                    }
                  )}
                  href={createPageUrl(page)}
                >
                  {page}
                </Link>
              </li>
            ))}
            <li className="page-item">
              <Link
                className={clsx(
                  `page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`,
                  {
                    "pointer-events-none text-slate-400":
                      currentPage === totalPages,
                  }
                )}
                href={createPageUrl(currentPage + 1)}
              >
                <IoChevronForwardOutline size={30} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
export default Pagination
