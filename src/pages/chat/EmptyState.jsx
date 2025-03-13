import React from 'react';
import { MessageSquare, PlusCircle } from 'lucide-react';

const EmptyState = ({ onCreateChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 dark:bg-gray-950">
      <div className="text-center max-w-md">
        <div className="mb-6 bg-indigo-100 dark:bg-indigo-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <MessageSquare size={36} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          No Conversation Selected
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Select an existing conversation from the sidebar or start a new one to begin messaging.
        </p>
        
        <button
          onClick={onCreateChat}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200 shadow-sm hover:shadow"
        >
          <PlusCircle size={18} className="mr-2" />
          Start New Conversation
        </button>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                <path d="M12 16v-4"></path><path d="M12 8h.01"></path><circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Get Started</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Connect with friends and start messaging right away.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Share Files</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Easily share documents, photos and more with your contacts.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Secure Chats</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your conversations are encrypted and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;