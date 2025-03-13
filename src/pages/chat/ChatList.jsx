import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Settings, LogOut, Plus, Filter, Star, Archive, Bell, Moon, Sun, Check, User, UserPlus, Clock, BadgeCheck, X } from 'lucide-react';
import { toast } from 'sonner';
import ChatItem from './ChatItem';

const ChatList = ({ chats, activeChat, setActiveChat, user, darkMode, toggleTheme }) => {
  const [filterOption, setFilterOption] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('recent');
  const [favoriteChats, setFavoriteChats] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter and sort chats based on current options
  const filteredChats = (chats || [])
    .filter(chat => {
      if (searchTerm) {
        return chat.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (filterOption === 'unread') return chat.unreadCount > 0;
      if (filterOption === 'favorites') return favoriteChats.includes(chat.id);
      if (filterOption === 'groups') return chat.isGroup;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'recent') {
        return new Date(b.lastActivity || 0) - new Date(a.lastActivity || 0);
      } else if (sortOrder === 'unread') {
        return (b.unreadCount || 0) - (a.unreadCount || 0);
      } else if (sortOrder === 'alphabetical') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const toggleFavorite = (chatId) => {
    setFavoriteChats(prev => 
      prev.includes(chatId) 
        ? prev.filter(id => id !== chatId) 
        : [...prev, chatId]
    );
    toast.success(
      favoriteChats.includes(chatId) 
        ? 'Removed from favorites'
        : 'Added to favorites'
    );
  };

  // Nav items with animation
  const navItems = [
    { icon: <Users className="h-4 w-4" />, label: 'Chats', value: 'chats' },
    { icon: <Star className="h-4 w-4" />, label: 'Favorites', value: 'favorites' },
    { icon: <Archive className="h-4 w-4" />, label: 'Archived', value: 'archived' },
    { icon: <Settings className="h-4 w-4" />, label: 'Settings', value: 'settings' },
  ];
  
  const [activeNav, setActiveNav] = useState('chats');
  
  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
      setShowFilters(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-full border-r border-border/40 bg-card shadow-md h-full flex flex-col"
    >
      {/* User Profile */}
      <div className="p-4 border-b border-border/40 backdrop-blur-sm bg-card/90 sticky top-0 z-10"> 
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowUserMenu(!showUserMenu);
            }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center shadow-inner ring-2 ring-background cursor-pointer"
            >
              <span className="text-lg font-semibold text-primary-foreground">{user?.name?.[0] || '?'}</span>
              
              {/* Status indicator */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card z-10"
              ></motion.div>
            </motion.div>
            
            <div>
              <h3 className="font-medium flex items-center">
                {user?.name || 'User'}
                <BadgeCheck className="h-4 w-4 ml-1 text-primary" />
              </h3>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            
            {/* User menu popup */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-card shadow-lg rounded-lg overflow-hidden z-50 border border-border/40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2 border-b border-border/20">
                    <div className="flex items-center p-2 space-x-2 hover:bg-muted rounded-md cursor-pointer">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>View Profile</span>
                    </div>
                    <div className="flex items-center p-2 space-x-2 hover:bg-muted rounded-md cursor-pointer">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span>Account Settings</span>
                    </div>
                  </div>
                  <div className="p-2 border-b border-border/20">
                    <div className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <span>Notifications</span>
                      </div>
                      <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                        <motion.div 
                          className="w-3 h-3 bg-primary rounded-full" 
                          layout
                          animate={{ x: 16 }}
                        />
                      </div>
                    </div>
                    <div 
                      className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        {darkMode ? (
                          <Moon className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Sun className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>Dark Mode</span>
                      </div>
                      <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                        <motion.div 
                          className="w-3 h-3 bg-primary rounded-full" 
                          layout
                          animate={{ x: darkMode ? 16 : 0 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div 
                    className="p-2 text-destructive hover:bg-destructive/10 flex items-center space-x-2 cursor-pointer"
                    onClick={() => {
                      toast.success('Successfully signed out');
                      localStorage.removeItem('user');
                      setTimeout(() => {
                        window.location.href = '/signin';
                      }, 1500);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center space-x-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-all duration-300 hover:rotate-12"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 0 : 180 }}
                transition={{ duration: 0.5 }}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-700" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
            aria-label="Search chats"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>
        
        {/* Filter buttons */}
        <div className="flex items-center mt-3 space-x-2 overflow-x-auto custom-scrollbar pb-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${filterOption === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => setFilterOption('all')}
          >
            All Chats
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${filterOption === 'unread' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => setFilterOption('unread')}
          >
            Unread
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${filterOption === 'favorites' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => setFilterOption('favorites')}
          >
            Favorites
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${filterOption === 'groups' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            onClick={() => setFilterOption('groups')}
          >
            Groups
          </motion.button>
          
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowFilters(!showFilters);
              }}
            >
              <Filter className="h-3 w-3" />
              <span>More</span>
            </motion.button>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-card shadow-lg rounded-lg overflow-hidden z-20 border border-border/40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 px-2">Sort By</h4>
                    <div 
                      className={`flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer ${sortOrder === 'recent' ? 'text-primary' : ''}`}
                      onClick={() => setSortOrder('recent')}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Most Recent</span>
                      </div>
                      {sortOrder === 'recent' && <Check className="h-4 w-4" />}
                    </div>
                    <div 
                      className={`flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer ${sortOrder === 'unread' ? 'text-primary' : ''}`}
                      onClick={() => setSortOrder('unread')}
                    >
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Unread First</span>
                      </div>
                      {sortOrder === 'unread' && <Check className="h-4 w-4" />}
                    </div>
                    <div 
                      className={`flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer ${sortOrder === 'alphabetical' ? 'text-primary' : ''}`}
                      onClick={() => setSortOrder('alphabetical')}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="h-4 w-4 flex items-center justify-center">A</span>
                        <span>Alphabetical</span>
                      </div>
                      {sortOrder === 'alphabetical' && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 pb-2">
        <ul className="flex space-x-1 border-b border-border/30 pb-2">
          {navItems.map((item) => (
            <li key={item.value} className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeNav === item.value
                    ? 'text-primary bg-primary/10 hover:bg-primary/20 font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setActiveNav(item.value)}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Chat List */}
      <div className="px-4 pt-2 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground flex items-center">
            {activeNav === 'chats' && 'Recent Conversations'}
            {activeNav === 'favorites' && 'Favorite Chats'}
            {activeNav === 'archived' && 'Archived Chats'}
            {activeNav === 'settings' && 'Chat Settings'}
            
            {filterOption !== 'all' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full"
              >
                {filterOption === 'unread' && 'Unread'}
                {filterOption === 'favorites' && 'Favorites'}
                {filterOption === 'groups' && 'Groups'}
              </motion.div>
            )}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toast.info('New chat feature coming soon!')}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-primary"
            aria-label="Create new chat"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
        
        {activeNav === 'settings' ? (
          <div className="space-y-4 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-muted/50 rounded-lg"
            >
              <h3 className="font-medium mb-2">Chat Display</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Message Previews</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                    <motion.div className="w-3 h-3 bg-primary rounded-full" layout animate={{ x: 16 }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Timestamps</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                    <motion.div className="w-3 h-3 bg-primary rounded-full" layout animate={{ x: 16 }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Read Receipts</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                    <motion.div className="w-3 h-3 bg-primary rounded-full" layout animate={{ x: 16 }} />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-muted/50 rounded-lg"
            >
              <h3 className="font-medium mb-2">Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Message Notifications</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                    <motion.div className="w-3 h-3 bg-primary rounded-full" layout animate={{ x: 16 }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sound Effects</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                    <motion.div className="w-3 h-3 bg-primary rounded-full" layout animate={{ x: 16 }} />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-muted/50 rounded-lg"
            >
              <h3 className="font-medium mb-2">Privacy</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Online Status</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                    <motion.div className="w-3 h-3 bg-primary rounded-full" layout animate={{ x: 16 }} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Read Receipts</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full flex items-center p-0.5">
                    <motion.div className="w-3 h-3 bg-primary rounded-full" layout animate={{ x: 16 }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-2 pb-4">
            <AnimatePresence>
              {filteredChats.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                    {activeNav === 'favorites' ? (
                      <Star className="h-8 w-8 text-muted-foreground" />
                    ) : activeNav === 'archived' ? (
                      <Archive className="h-8 w-8 text-muted-foreground" />
                    ) : (
                      <Search className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-medium">No chats found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {activeNav === 'favorites' 
                      ? 'You have no favorite chats' 
                      : activeNav === 'archived' 
                        ? 'No archived chats' 
                        : 'Try adjusting your filters'}
                  </p>
                  {activeNav === 'chats' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-primary rounded-lg text-primary-foreground flex items-center space-x-2"
                      onClick={() => toast.info('New chat feature coming soon!')}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Start a new chat</span>
                    </motion.button>
                  )}
                </motion.div>
              ) : (
                filteredChats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative group"
                  >
                    <ChatItem 
                      chat={chat}
                      isActive={activeChat?.id === chat.id}
                      onClick={() => setActiveChat(chat)}
                      onOptionsClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(chat.id);
                      }}
                      isFavorite={favoriteChats.includes(chat.id)}
                    />
                    
                    {/* Quick actions on hover */}
                    <AnimatePresence>
                      {activeChat?.id !== chat.id && (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex bg-card/80 backdrop-blur-sm rounded-md p-0.5 border border-border/30 shadow-sm"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 hover:bg-muted rounded-md transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(chat.id);
                            }}
                            title={favoriteChats.includes(chat.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Star className={`h-3.5 w-3.5 ${favoriteChats.includes(chat.id) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 hover:bg-muted rounded-md transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('Archive feature coming soon!');
                            }}
                            title="Archive chat"
                          >
                            <Archive className="h-3.5 w-3.5 text-muted-foreground" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info('Mute feature coming soon!');
                            }}
                            title="Mute notifications"
                          >
                            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-border/40 mt-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            toast.success('Successfully signed out');
            localStorage.removeItem('user');
            setTimeout(() => {
              window.location.href = '/signin';
            }, 1500);
          }}
                   className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatList;