import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSize: Size[];
  onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({
  availableSize,
  selectedSize,
  onSizeChange,
}: Props) => {
  return (
    <div className="my-5">
      <div className="font-semibold mb-1.5">Size</div>
      <div className="flex  flex-wrap gap-2">
        {availableSize.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={clsx(
              "hover:border-black text-lg py-2 px-4 rounded-lg border border-solid border-gray-300",
              {
                "bg-gray-300 underline": size === selectedSize,
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
