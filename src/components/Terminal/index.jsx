import React, { memo, useEffect } from "react";

const Terminal = ({ logs }) => {
  useEffect(() => {
    var elem = document.getElementById("scroll");
    window.setInterval(function () {
      elem.scrollTop = elem?.scrollHeight;
    }, 5000);
    return ()=> {
      elem.scrollTop = 0
    }
  }, [logs]);   

  return (
    <div
      id="scroll"
      className="flex-[0] mockup-code rounded-none text-sm overflow-hidden h-48 min-h-48 p-2 bg-[#000000] text-blue-300 font-['Open_Sans']"
    >
       <pre data-prefix="1">{!!logs ? logs : ">"}</pre>
    </div>
  );
};
export default memo(Terminal);
