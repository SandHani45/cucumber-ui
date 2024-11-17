import React, { memo } from "react";
import Header from "../Header";
import Terminal from "../Terminal";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen gap-2">
      <Header />
      <main className="flex flex-col justify-between flex-1">
        {children} 
        <Terminal  logs={"logs"} />
      </main>
    </div>
  );
};

export default memo(Layout);
