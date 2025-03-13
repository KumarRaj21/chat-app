import { motion } from 'framer-motion';

const ChatItem = ({ chat, isActive, onClick }) => {
  // Time formatting helper
  const formatTime = (timestamp) => {
    if (timestamp === 'Yesterday') return timestamp;
    return timestamp;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground shadow-md'
          : 'hover:bg-muted/80'
      }`}
    >
      <div className="relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? 'bg-primary-foreground/20' : 'bg-primary/10'
        }`}>
          <span className="text-lg">{chat.avatar}</span>
        </div>
        {chat.online && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" 
          />
        )}
      </div>
      
      <div className="flex-1 text-left overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium truncate ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
            {chat.name}
          </h3>
          <span className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {formatTime(chat.timestamp)}
          </span>
        </div>
        <p className={`text-sm truncate ${
          isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
        }`}>
          {chat.type === 'group' ? '👥 ' : ''}{chat.lastMessage}
        </p>
      </div>
      
      {chat.unread > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`min-w-5 h-5 rounded-full ${
            isActive ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'
          } text-xs flex items-center justify-center px-1.5`}
        >
          {chat.unread}
        </motion.div>
      )}
    </motion.button>
  );
};

export default ChatItem;