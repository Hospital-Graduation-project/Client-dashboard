import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatMessage = ({ message }) => {
  const navigate = useNavigate();

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if the message contains Arabic text
  const isArabic = /[\u0600-\u06FF]/.test(message.text);

  const handleLinkClick = (e) => {
    if (message.link) {
      e.preventDefault();
      navigate(message.link);
    }
  };

  const renderMessageText = () => {
    if (!message.text) return null;

    // Split the text by markdown-style links
    const parts = message.text.split(/\[([^\]]+)\]\(([^)]+)\)/);
    
    return parts.map((part, index) => {
      // If this is a link text (odd indices)
      if (index % 3 === 1) {
        return (
          <button
            key={index}
            onClick={handleLinkClick}
            className="text-emerald-600 hover:text-emerald-700 underline font-medium"
          >
            {part}
          </button>
        );
      }
      // If this is a link URL (even indices after 0)
      if (index % 3 === 2) {
        return null;
      }
      // Regular text
      return part;
    });
  };

  return (
    <div className={`flex items-start space-x-2 ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
      {message.isBot && (
        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] ${message.isBot ? '' : 'flex flex-col items-end'}`}>
        <div
          className={`p-3 rounded-2xl shadow-sm ${
            message.isBot
              ? 'bg-white text-gray-700 rounded-tl-md'
              : 'bg-emerald-500 text-white rounded-tr-md'
          }`}
        >
          <p 
            className="text-sm leading-relaxed whitespace-pre-line"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {renderMessageText()}
          </p>
        </div>
        <span className="text-xs text-gray-500 mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;