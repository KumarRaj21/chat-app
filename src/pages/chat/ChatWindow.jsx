import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Image, Smile, Search, Phone, Info,Plus, ListOrdered, Flag, Code, Mic, GripHorizontal, Sparkles, Clock, Pin, Reply, Edit } from 'lucide-react';
import { toast } from 'sonner';
import ChatBubble from './ChatBubble';

const ChatWindow = ({ activeChat, darkMode }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedTools, setExpandedTools] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [viewMode, setViewMode] = useState('standard'); // standard, compact, focused
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hey, how are you?',
      sender: 'Jane Smith',
      timestamp: '10:30 AM',
      type: 'received',
      status: 'read',
      reactions: [],
    },
    {
      id: 2,
      text: 'I\'m good, thanks! How about you?',
      sender: 'me',
      timestamp: '10:31 AM',
      type: 'sent',
      status: 'delivered',
      reactions: ['👍'],
    },
    {
      id: 3,
      text: 'Working on the new design. It\'s coming along nicely!',
      sender: 'Jane Smith',
      timestamp: '10:32 AM',
      type: 'received',
      status: 'read',
      reactions: [],
    },
    {
      id: 4,
      text: 'That\'s great to hear! Can\'t wait to see it.',
      sender: 'me',
      timestamp: '10:33 AM',
      type: 'sent',
      status: 'delivered',
      reactions: [],
    },
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  // Focus input when replying
  useEffect(() => {
    if (replyingTo) {
      inputRef.current?.focus();
    }
  }, [replyingTo]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
      status: 'sending',
      reactions: [],
      replyTo: replyingTo,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setReplyingTo(null);

    // Simulate message status changes
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
      
      // Simulate received message with typing indicator
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const response = {
            id: messages.length + 2,
            text: `Thanks for your message! This is a simulated response from ${activeChat.name}.`,
            sender: activeChat.name,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'received',
            status: 'read',
            reactions: [],
          };
          setMessages(prev => [...prev, response]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  const addReaction = (messageId, emoji) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, reactions: [...new Set([...msg.reactions, emoji])] } 
          : msg
      )
    );
    setShowReactions(false);
  };

  const handleReply = (message) => {
    setReplyingTo(message);
    inputRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  // Message input height auto-adjustment
  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(120, e.target.scrollHeight) + 'px';
  };

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '👏'];

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header with active chat info */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-3 border-b border-border/40 bg-card/90 backdrop-blur-sm sticky top-0 z-20 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center shadow-md">
              <span className="text-lg font-semibold text-primary-foreground">{activeChat?.name?.[0] || '?'}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card"></div>
          </div>
          <div>
            <h3 className="font-medium flex items-center">
              {activeChat?.name || 'Chat'}
              {activeChat?.verified && (
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="ml-1 text-blue-500"
                >
                  ✓
                </motion.div>
              )}
            </h3>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
            onClick={() => setViewMode(viewMode === 'standard' ? 'compact' : viewMode === 'compact' ? 'focused' : 'standard')}
            title={`Switch to ${viewMode === 'standard' ? 'compact' : viewMode === 'compact' ? 'focused' : 'standard'} view`}
          >
            <GripHorizontal className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
            onClick={() => toast.info('Search in conversation feature coming soon!')}
            title="Search in conversation"
          >
            <Search className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
            onClick={() => toast.info('Call feature coming soon!')}
            title="Start call"
          >
            <Phone className="h-5 w-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
            onClick={() => toast.info('Chat info and settings coming soon!')}
            title="Chat info"
          >
            <Info className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto p-4 custom-scrollbar bg-muted/20 ${viewMode === 'focused' ? 'max-w-3xl mx-auto' : ''}`}>
        {/* Date separator */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6 sticky top-0 z-10"
        >
          <div className="px-3 py-1 rounded-full bg-muted/80 backdrop-blur-sm text-xs text-muted-foreground shadow-sm flex items-center space-x-2">
            <Clock className="h-3 w-3" />
            <span>Today</span>
          </div>
        </motion.div>

        {/* Message bubbles */}
        <div className={`space-y-${viewMode === 'compact' ? '2' : '4'}`}>
          <AnimatePresence>
            {messages.map((msg, index) => (
              <div key={msg.id} className="relative group">
                <ChatBubble 
                  message={msg} 
                  viewMode={viewMode}
                  previousMessage={index > 0 ? messages[index - 1] : null}
                  onReply={() => handleReply(msg)}
                  onReaction={() => setShowReactions(msg.id)}
                />
                
                {/* Message actions (on hover) */}
                <AnimatePresence>
                  {showReactions === msg.id && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className={`absolute ${msg.type === 'sent' ? 'right-0' : 'left-0'} -top-10 bg-card shadow-lg rounded-full p-1 z-30 flex`}
                    >
                      {reactions.map(emoji => (
                        <motion.button
                          key={emoji}
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 flex items-center justify-center text-lg hover:bg-muted rounded-full"
                          onClick={() => addReaction(msg.id, emoji)}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="bg-card border border-border/20 text-muted-foreground rounded-2xl rounded-tl-none px-4 py-3 shadow-sm ml-2 flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`p-4 border-t border-border/40 bg-card ${viewMode === 'focused' ? 'max-w-3xl mx-auto w-full' : ''}`}
      >
        {/* Reply indicator */}
        <AnimatePresence>
          {replyingTo && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-2 pl-4 border-l-2 border-primary flex justify-between items-center"
            >
              <div className="text-sm">
                <span className="text-muted-foreground">Replying to </span>
                <span className="font-medium">{replyingTo.sender}</span>: 
                <span className="text-muted-foreground ml-1 truncate">{replyingTo.text.substring(0, 40)}{replyingTo.text.length > 40 ? '...' : ''}</span>
              </div>
              <button 
                className="p-1 hover:bg-muted rounded-full text-muted-foreground"
                onClick={cancelReply}
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSendMessage} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                onClick={() => setExpandedTools(!expandedTools)}
                aria-label="Expand tools"
              >
                <Plus className={`h-5 w-5 transition-transform duration-300 ${expandedTools ? 'rotate-45' : ''}`} />
              </motion.button>
              
              <AnimatePresence>
                {expandedTools && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, originY: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="absolute bottom-full left-0 mb-2 p-1 bg-card shadow-lg rounded-lg z-20 flex flex-col items-center space-y-1"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Schedule message"
                      onClick={() => toast.info('Schedule message feature coming soon!')}
                    >
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Pin important message"
                      onClick={() => toast.info('Pin message feature coming soon!')}
                    >
                      <Pin className="h-5 w-5 text-muted-foreground" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="AI suggestions"
                      onClick={() => toast.info('AI message suggestions coming soon!')}
                    >
                      <Sparkles className="h-5 w-5 text-muted-foreground" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              onClick={() => toast.info('Attachment feature coming soon!')}
              aria-label="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              onClick={() => toast.info('Image upload feature coming soon!')}
              aria-label="Upload image"
            >
              <Image className="h-5 w-5" />
            </motion.button>
          
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-muted rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none max-h-32 custom-scrollbar"
                rows={1}
                style={{ minHeight: '44px' }}
              />
            </div>
            
            <div className="flex items-center space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                onClick={() => toast.info('Emoji picker coming soon!')}
                aria-label="Add emoji"
              >
                <Smile className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                onClick={() => toast.info('Voice message feature coming soon!')}
                aria-label="Record voice message"
              >
                <Mic className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`p-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-300 ${!message.trim() ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
          
          {/* Message format options */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <div className="flex space-x-1 text-xs text-muted-foreground">
              <button 
                type="button" 
                className="px-2 py-1 hover:bg-muted/50 rounded-md transition-colors flex items-center"
                onClick={() => toast.info('Text formatting coming soon!')}
              >
                <span className="font-bold">B</span>
              </button>
              <button 
                type="button" 
                className="px-2 py-1 hover:bg-muted/50 rounded-md transition-colors flex items-center"
                onClick={() => toast.info('Text formatting coming soon!')}
              >
                <span className="italic">I</span>
              </button>
              <button 
                type="button" 
                className="px-2 py-1 hover:bg-muted/50 rounded-md transition-colors flex items-center"
                onClick={() => toast.info('Text formatting coming soon!')}
              >
                <span className="underline">U</span>
              </button>
              <button 
                type="button" 
                className="px-2 py-1 hover:bg-muted/50 rounded-md transition-colors flex items-center"
                onClick={() => toast.info('Text formatting coming soon!')}
              >
                <Code className="h-3 w-3" />
              </button>
              <button 
                type="button" 
                className="px-2 py-1 hover:bg-muted/50 rounded-md transition-colors flex items-center"
                onClick={() => toast.info('Text formatting coming soon!')}
              >
                <ListOrdered className="h-3 w-3" />
              </button>
              <span className="border-r border-border/30 mx-1"></span>
              <button 
                type="button" 
                className="px-2 py-1 hover:bg-muted/50 rounded-md transition-colors flex items-center space-x-1"
                onClick={() => toast.info('Message priority coming soon!')}
              >
                <Flag className="h-3 w-3 text-amber-500" />
                <span>Priority</span>
              </button>
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatWindow;