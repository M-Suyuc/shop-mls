"use client";

import { Size } from "@/interfaces";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  selectedSize: Size;
  availableSize: Size[];
}

export const SizeSelector = ({ availableSize, selectedSize }: Props) => {
  const [sizeSelected, setsizeSelected] = useState(selectedSize);

  const handleChange = (size: Size) => {
    setsizeSelected(size);
  };

  return (
    <div className="my-5">
      <div className="font-semibold mb-1.5">Size</div>
      <div className="flex  flex-wrap gap-2">
        {availableSize.map((size) => (
          <button
            key={size}
            onClick={() => handleChange(size)}
            className={clsx(
              "hover:border-black text-lg py-2 px-4 rounded-lg border border-solid border-gray-300",
              {
                "bg-gray-300 underline": size === sizeSelected,
              }
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
