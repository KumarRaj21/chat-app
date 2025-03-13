import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock } from 'lucide-react';
import { useState } from 'react';

const ChatBubble = ({ message }) => {
  const [showOptions, setShowOptions] = useState(false);
  
  const getReadStatus = () => {
    // This would be dynamic in a real application
    if (message.type === 'sent') {
      // You can expand this to show different statuses
      return 'read'; // Options: 'sending', 'sent', 'delivered', 'read'
    }
    return null;
  };
  
  const readStatus = getReadStatus();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'} group`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div
        className={`relative max-w-xs sm:max-w-md md:max-w-lg break-words rounded-2xl px-4 py-2 shadow-sm ${
          message.type === 'sent'
            ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-none mr-2'
            : 'bg-card border border-border/20 text-card-foreground rounded-tl-none ml-2'
        }`}
      >
        {message.type === 'received' && (
          <span className="text-xs text-muted-foreground font-medium mb-1 block">
            {message.sender}
          </span>
        )}
        
        <p className="text-sm">{message.text}</p>
        
        <div className="flex items-center justify-end space-x-1 mt-1">
          <span className={`text-xs ${
            message.type === 'sent' ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            {message.timestamp}
          </span>
          
          {message.type === 'sent' && (
            <span className="text-primary-foreground/70">
              {readStatus === 'sending' && <Clock className="h-3 w-3" />}
              {readStatus === 'sent' && <Check className="h-3 w-3" />}
              {readStatus === 'delivered' && <CheckCheck className="h-3 w-3" />}
              {readStatus === 'read' && <CheckCheck className="h-3 w-3 text-blue-300" />}
            </span>
          )}
        </div>
        
        {/* Message options on hover */}
        {showOptions && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute bottom-full ${
              message.type === 'sent' ? 'right-0 mb-1' : 'left-0 mb-1'
            } bg-background shadow-md rounded-lg p-1 flex space-x-1 border border-border/30`}
          >
            <button className="p-1 rounded hover:bg-muted transition-colors text-xs">
              Reply
            </button>
            <button className="p-1 rounded hover:bg-muted transition-colors text-xs">
              Forward
            </button>
            <button className="p-1 rounded hover:bg-muted transition-colors text-xs text-destructive">
              Delete
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBubble;