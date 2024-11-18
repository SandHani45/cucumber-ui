import React, { useEffect, useState } from "react";

const Toast = ({
    message ="Success! Your action was completed.",
    isOpen = false,
    onClear,
    status = "success",
}) => {
  const [showMessage, setShowMessage] = useState(isOpen);

  useEffect(()=>{
    // setShowMessage(true); // Show the success message
    setTimeout(() => {
      setShowMessage(false); // Hide the message after 3 seconds
      onClear({
        message: "",
        status: ""
      })
    }, 3000); // 3-second timer
  },[isOpen])
  let statusClass = ""
  statusClass = status === 'success' && "alert-success"
  return (
    <div className="toast toast-end toast-end">
      {showMessage && (
        <div className={`alert ${statusClass} shadow-lg mt-4 flex`}>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span> {message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toast;