import React from 'react';

export const ChatWidget = () => {
  return (
    <div className="fixed bottom-8 right-8 flex items-end space-x-3 z-20 cursor-pointer">
      <div className="bg-[#293e53] text-white p-3 rounded-xl rounded-br-none shadow-lg max-w-xs">
        <p className="text-sm font-medium">Olá! Preciso de ajuda?</p>
      </div>
      <div className="w-16 h-16 rounded-full bg-[#2d2d37] flex items-center justify-center border-4 border-[#e4e6ea] shadow-lg">
        <img
          alt="Chatbot avatar"
          className="w-12 h-12"
          src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png"
        />
      </div>
    </div>
  );
};