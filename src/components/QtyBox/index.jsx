import React, { useState } from "react";

const QtyBox = ({ min = 1, max = 99, onChange }) => {
  const [qty, setQty] = useState(min);

  const updateQty = (value) => {
    const clamped = Math.max(min, Math.min(max, value));
    setQty(clamped);
    if (onChange) onChange(clamped);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-[100px] h-[40px]">
      <button
        className="w-[30px] h-full bg-gray-100 hover:bg-gray-200 text-lg font-semibold"
        onClick={() => updateQty(qty - 1)}
        disabled={qty <= min}
      >
        -
      </button>
      <input
        type="number"
        className="w-full text-center outline-none text-sm"
        value={qty}
        min={min}
        max={max}
        onChange={(e) => updateQty(Number(e.target.value))}
      />
      <button
        className="w-[30px] h-full bg-gray-100 hover:bg-gray-200 text-lg font-semibold"
        onClick={() => updateQty(qty + 1)}
        disabled={qty >= max}
      >
        +
      </button>
    </div>
  );
};

export default QtyBox;
