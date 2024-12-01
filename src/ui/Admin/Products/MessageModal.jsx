import React, { useEffect } from 'react';

const MessageModal = ({ message, onClose }) => {
  useEffect(() => {
    // Automatically close the modal after 3 seconds
    const timer = setTimeout(() => {
      onClose(); // This will trigger closing the modal
    }, 3000);

    // Cleanup timer when the component is unmounted or the effect is triggered again
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-72"
      style={{
        zIndex: 1000, // Ensure it appears above other elements
      }}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default MessageModal;
