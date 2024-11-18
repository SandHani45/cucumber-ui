import React, { memo, useEffect } from "react";

const Terminal = ({ logs }) => {
  useEffect(() => {
    var elem = document.getElementById("scroll");
    elem.scrollTop = elem?.scrollHeight;
    return () => {
      elem.scrollTop = 0;
    };
  }, [logs]);

  return (
    <div className="flex-[0] mockup-code rounded-none text-sm overflow-hidden h-48 min-h-48 p-2 bg-[#000000] text-blue-300 font-['Open_Sans']">
      <pre
        id="scroll"
        data-prefix=">"
        className="h-[10rem] text overflow-scroll"
      >
        {!!logs ? logs : ">"}
      </pre>
    </div>
  );
};
export default memo(Terminal);
