import React, { memo } from 'react';

const Chips = ({ chipsList, onClickChip }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {chipsList && chipsList?.map((chip) => {
        const {isActive, data} = chip
        return (
          <div  className={`cursor-pointer rounded-full py-0.5 px-2.5 border border-transparent text-sm text-slate-600 transition-all shadow-sm ${isActive ? "bg-[#182f7c] text-white" : "bg-slate-100"}`} onClick={()=> onClickChip(chip)}>
            {data}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Chips)
