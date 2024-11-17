import React from "react";

const StringInput = ({ text }) => {
  // Split the text by quotes
  const parts = text.split(/(".*?")/);
  return (
    <div className="flex items-center gap-2">
      {parts.map((part, index) => {
        // Check if the part is quoted
        const isQuoted = part.startsWith('"') && part.endsWith('"');
        const displayText = isQuoted ? part.slice(1, -1) : part;

        return isQuoted ? (
          <input
            key={index}
            type="text"
            value={displayText}
            readOnly
            style={{ margin: "0 4px" }}
            class="input input-bordered input-xs max-w-xs"
          />
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </div>
  );
};

export default StringInput;
