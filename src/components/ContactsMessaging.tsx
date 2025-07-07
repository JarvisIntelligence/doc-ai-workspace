
import React, { useState } from 'react';
import { Users, MessageSquare, Plus, Send, Search, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContactsMessaging = () => {
  const [activeContact, setActiveContact] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@university.edu",
      status: "online",
      avatar: "👩‍🎓",
      lastMessage: "Thanks for sharing that ML document!",
      lastActive: "2 min ago",
      unread: 2
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus.j@university.edu", 
      status: "away",
      avatar: "👨‍💼",
      lastMessage: "Can you help me with the chemistry quiz?",
      lastActive: "1 hour ago",
      unread: 0
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.r@university.edu",
      status: "online",
      avatar: "👩‍🔬",
      lastMessage: "The history summary was really helpful",
      lastActive: "5 min ago",
      unread: 1
    },
    {
      id: 4,
      name: "Alex Kim",
      email: "alex.kim@university.edu",
      status: "offline",
      avatar: "👨‍💻",
      lastMessage: "Let's study together this weekend",
      lastActive: "3 hours ago",
      unread: 0
    }
  ]);

  const [conversations, setConversations] = useState({
    1: [
      { id: 1, sender: 'them', content: "Hey! Did you finish reading the ML document?", timestamp: "10:30 AM" },
      { id: 2, sender: 'me', content: "Yes! The summary feature is amazing. Really helped me understand the key concepts.", timestamp: "10:32 AM" },
      { id: 3, sender: 'them', content: "Thanks for sharing that ML document!", timestamp: "10:35 AM" },
      { id: 4, sender: 'them', content: "I used the quiz generator and got 85%! 🎉", timestamp: "10:36 AM" }
    ],
    2: [
      { id: 1, sender: 'them', content: "Can you help me with the chemistry quiz?", timestamp: "9:15 AM" },
      { id: 2, sender: 'me', content: "Sure! I have some great notes. Let me share them with you.", timestamp: "9:20 AM" }
    ],
    3: [
      { id: 1, sender: 'them', content: "The history summary was really helpful", timestamp: "10:25 AM" },
      { id: 2, sender: 'me', content: "Glad it helped! The AI did a great job breaking down the key events.", timestamp: "10:27 AM" }
    ]
  });

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSelect = (contact) => {
    // Clear unread count when opening a chat
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === contact.id ? { ...c, unread: 0 } : c
      )
    );
    setActiveContact(contact);
  };

  const sendMessage = () => {
    if (!message.trim() || !activeContact) return;

    const newMessage = {
      id: Date.now(),
      sender: 'me',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
    }));

    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const shareDocument = () => {
    if (!activeContact) return;
    
    const shareMessage = {
      id: Date.now(),
      sender: 'me',
      content: "📄 Shared: Introduction to Machine Learning.pdf",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isShared: true
    };

    setConversations(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), shareMessage]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[500px] sm:h-[600px]">
        {/* Contacts Sidebar */}
        <div className={`w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r flex flex-col ${
          activeContact ? 'hidden lg:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-3 sm:p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Contacts</h2>
              <Button size="sm" variant="outline" className="text-xs sm:text-sm">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 sm:pl-9 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactSelect(contact)}
                className={`p-3 sm:p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm sm:text-lg">
                      {contact.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white ${
                      contact.status === 'online' ? 'bg-green-400' :
                      contact.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                      {contact.unread > 0 && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium min-w-[20px] sm:min-w-[24px]">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate">{contact.lastMessage}</p>
                    <p className="text-xs text-gray-400">{contact.lastActive}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${
          !activeContact ? 'hidden lg:flex' : 'flex'
        }`}>
          {!activeContact ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center px-4">
                <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Select a Contact</h3>
                <p className="text-sm sm:text-base text-gray-600">Choose a contact to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-3 sm:p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <button
                      onClick={() => setActiveContact(null)}
                      className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      {activeContact.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{activeContact.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 capitalize">{activeContact.status}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={shareDocument} className="text-xs sm:text-sm">
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Share Doc</span>
                    <span className="sm:hidden">Share</span>
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {(conversations[activeContact.id] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                      msg.sender === 'me'
                        ? msg.isShared 
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-xs sm:text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 text-xs sm:text-sm"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 sm:px-4"
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsMessaging;
