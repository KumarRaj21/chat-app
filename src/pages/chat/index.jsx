import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';
import { Menu, X, Sun, Moon, Send, PlusCircle, Paperclip, Smile, Settings, LogOut, Search, User, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Import components
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import EmptyState from './EmptyState';
// Import mock data
import { mockChats, mockUser, generateInitialMessages } from './mockData';

const Chat = () => {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(mockChats);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  
  // Load initial data
  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0].id);
      setMessages(generateInitialMessages(chats[0].id));
    }
  }, [chats]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  // Filter chats based on search query
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle chat selection
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    setMessages(generateInitialMessages(chatId));
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  
  // Handle send message
  const handleSendMessage = (e) => {
    e?.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Simulate response
    setIsTyping(true);
    setTimeout(() => {
      const responseMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Response to: ${newMessage}`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Create new chat
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `New Chat ${chats.length + 1}`,
      lastMessage: 'Start a new conversation',
      timestamp: new Date().toISOString(),
      unread: 0,
    };
    
    setChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat.id);
    setMessages([]);
    toast.success('New chat created!');
  };
  
  // Handle key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
      e.preventDefault();
    }
  };
  
  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-1/4 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-full z-20 md:relative absolute"
          >
            {/* Chat List */}
            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {filteredChats.length > 0 ? (
                <ChatList
                  chats={filteredChats}
                  activeChat={selectedChat}
                  setActiveChat={setSelectedChat}
                  user={mockUser}
                  darkMode={darkMode}
                  toggleTheme={toggleDarkMode}
                />
              ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  No conversations found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full bg-gray-50 dark:bg-gray-950 w-2/3">
        {/* Chat Window */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {selectedChat ? (
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
          ) : (
            <EmptyState onCreateChat={createNewChat} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;