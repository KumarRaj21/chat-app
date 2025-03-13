// mockData.js - Centralized data store for the chat application

export const mockChats = [
  {
    id: 1,
    name: 'Team Project',
    type: 'group',
    lastMessage: 'Great work everyone!',
    timestamp: '10:30 AM',
    unread: 2,
    avatar: '👥',
    members: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    type: 'private',
    lastMessage: 'See you tomorrow!',
    timestamp: '9:45 AM',
    unread: 0,
    avatar: '👩',
    online: true,
    status: 'online'
  },
  {
    id: 3,
    name: 'Design Team',
    type: 'group',
    lastMessage: 'New mockups are ready',
    timestamp: 'Yesterday',
    unread: 5,
    avatar: '🎨',
    members: ['John Doe', 'Sarah Wilson', 'Tom Brown'],
    status: 'active'
  },
  {
    id: 4,
    name: 'Marketing Sync',
    type: 'group',
    lastMessage: 'Campaign results are in!',
    timestamp: 'Yesterday',
    unread: 3,
    avatar: '📊',
    members: ['Alex Johnson', 'Emma Davis', 'Ryan Kim'],
    status: 'active'
  },
  {
    id: 5,
    name: 'Michael Rodriguez',
    type: 'private',
    lastMessage: 'Let me check those numbers',
    timestamp: 'Monday',
    unread: 0,
    avatar: '👨',
    online: false,
    status: 'away',
    lastSeen: '2 hours ago'
  },
  {
    id: 6,
    name: 'Emma Watson',
    type: 'private',
    lastMessage: 'The presentation looks great!',
    timestamp: 'Monday',
    unread: 1,
    avatar: '👱‍♀️',
    online: true,
    status: 'online'
  },
  {
    id: 7,
    name: 'Development Team',
    type: 'group',
    lastMessage: 'Sprint planning tomorrow',
    timestamp: 'Sunday',
    unread: 0,
    avatar: '💻',
    members: ['John Doe', 'Mike Johnson', 'Sophia Chen', 'David Park'],
    status: 'active'
  }
];

export const generateInitialMessages = (chatId) => {
  // Default fallback messages
  const defaultMessages = [
    {
      id: 1,
      text: 'Hey, how are you?',
      sender: 'Jane Smith',
      timestamp: '10:30 AM',
      type: 'received',
    },
    {
      id: 2,
      text: 'I\'m good, thanks! How about you?',
      sender: 'me',
      timestamp: '10:31 AM',
      type: 'sent',
    },
    {
      id: 3,
      text: 'Working on the new design. It\'s coming along nicely!',
      sender: 'Jane Smith',
      timestamp: '10:32 AM',
      type: 'received',
    },
    {
      id: 4,
      text: 'That\'s great to hear! Can\'t wait to see it.',
      sender: 'me',
      timestamp: '10:33 AM',
      type: 'sent',
    },
  ];

  // Chat-specific messages
  const messagesMap = {
    1: [
      {
        id: 1,
        text: 'Welcome to the Team Project channel!',
        sender: 'System',
        timestamp: '9:00 AM',
        type: 'system',
      },
      {
        id: 2,
        text: 'I\'ve uploaded the latest requirements document to the shared folder.',
        sender: 'John Doe',
        timestamp: '9:15 AM',
        type: 'received',
      },
      {
        id: 3,
        text: 'Thanks John, I\'ll take a look.',
        sender: 'me',
        timestamp: '9:20 AM',
        type: 'sent',
      },
      {
        id: 4,
        text: 'We should schedule a review meeting this week.',
        sender: 'Mike Johnson',
        timestamp: '9:45 AM',
        type: 'received',
      },
      {
        id: 5,
        text: 'How about Thursday at 2pm?',
        sender: 'me',
        timestamp: '10:00 AM',
        type: 'sent',
      },
      {
        id: 6,
        text: 'Works for me!',
        sender: 'John Doe',
        timestamp: '10:15 AM',
        type: 'received',
      },
      {
        id: 7,
        text: 'Great work everyone!',
        sender: 'Jane Smith',
        timestamp: '10:30 AM',
        type: 'received',
      },
    ],
    2: defaultMessages,
    3: [
      {
        id: 1,
        text: 'Hey team, I\'ve finished the homepage redesign.',
        sender: 'Sarah Wilson',
        timestamp: 'Yesterday, 3:15 PM',
        type: 'received',
      },
      {
        id: 2,
        text: 'It looks amazing! Great work Sarah.',
        sender: 'John Doe',
        timestamp: 'Yesterday, 3:30 PM',
        type: 'received',
      },
      {
        id: 3,
        text: 'I agree, the new design is much cleaner.',
        sender: 'me',
        timestamp: 'Yesterday, 3:45 PM',
        type: 'sent',
      },
      {
        id: 4,
        text: 'Should we present it to the client tomorrow?',
        sender: 'Tom Brown',
        timestamp: 'Yesterday, 4:00 PM',
        type: 'received',
      },
      {
        id: 5,
        text: 'Yes, I think they\'ll love it.',
        sender: 'me',
        timestamp: 'Yesterday, 4:15 PM',
        type: 'sent',
      },
      {
        id: 6,
        text: 'New mockups are ready for the about page as well!',
        sender: 'Sarah Wilson',
        timestamp: 'Yesterday, 5:30 PM',
        type: 'received',
      },
    ]
  };

  return messagesMap[chatId] || defaultMessages;
};

export const mockUser = {
  id: 'user-123',
  name: 'Alex Taylor',
  email: 'alex.taylor@example.com',
  avatar: '🧑',
  status: 'online',
  role: 'Product Designer'
};

// Export theme settings
export const themeSettings = {
  light: {
    primary: '#4f46e5', // Indigo
    secondary: '#f59e0b', // Amber
    success: '#10b981', // Emerald
    warning: '#f97316', // Orange
    error: '#ef4444', // Red
    background: '#f9fafb',
    card: '#ffffff',
    text: '#1f2937'
  },
  dark: {
    primary: '#6366f1', // Lighter indigo for dark mode
    secondary: '#fbbf24', // Lighter amber for dark mode
    success: '#34d399', // Lighter emerald for dark mode
    warning: '#fb923c', // Lighter orange for dark mode
    error: '#f87171', // Lighter red for dark mode
    background: '#111827',
    card: '#1f2937',
    text: '#f9fafb'
  }
};