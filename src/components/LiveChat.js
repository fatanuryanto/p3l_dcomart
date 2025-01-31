import React, { useState } from "react";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        💬
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-[400px] h-[600px] bg-white border border-gray-300 shadow-lg rounded-lg">
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <span>Live Chat</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <iframe
            src="https://depokcooperativemart-38270.chipp.ai"
            title="Chat Room"
            width="100%"
            height="100%"
            className="border-0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LiveChat;

