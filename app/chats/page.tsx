"use client";

import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Navbar/Nav';
import { FaPaperPlane, FaSearch, FaEllipsisV, FaCircle } from 'react-icons/fa';
import Image from 'next/image';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [activeContact, setActiveContact] = useState<any>(null);

  const contacts = [
    { id: "1", name: "Alice Johnson", lastMsg: "Let me know if you need...", online: true, image: "https://i.pravatar.cc/150?u=alice" },
    { id: "2", name: "Support Team", lastMsg: "Your issue has been resolved.", online: false, image: "https://i.pravatar.cc/150?u=support" },
    { id: "3", name: "Study Group A", lastMsg: "Meeting at 5 PM today.", online: true, image: "https://i.pravatar.cc/150?u=group" },
  ];

  useEffect(() => {
    setActiveContact(contacts[0]);
    const saved = localStorage.getItem('chat_messages');
    if (saved) setMessages(JSON.parse(saved));
    else {
      setMessages([
        { id: 1, text: "Hey! How is the MERN course going?", sender: "Alice", time: "10:30 AM", isMe: false, contactId: "1" },
        { id: 2, text: "It's going great! Just finished the React section.", sender: "Me", time: "10:32 AM", isMe: true, contactId: "1" },
      ]);
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "Me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      contactId: activeContact?.id
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem('chat_messages', JSON.stringify(updated));
    setInput("");

    // Try to send to API if DB is connected
    try {
      await fetch('/api/chats/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: input, 
          senderId: 'temp-user-id',
          conversationId: activeContact?.id 
        }),
      });
    } catch (err) {
      console.log("DB disconnected, using local state only");
    }
  };

  const filteredMessages = messages.filter(m => m.contactId === activeContact?.id);

  return (
    <div className="flex bg-gray-50 h-screen overflow-hidden">
      <Sidebar />
      <div className="ml-24 flex-1 flex flex-col">
        <div className="p-8 pb-0">
          <TopBar />
        </div>
        
        <div className="flex-1 m-8 bg-white rounded-3xl shadow-xl border border-gray-100 flex overflow-hidden">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search chats..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact, index) => (
                <div 
                  key={index} 
                  onClick={() => setActiveContact(contact)}
                  className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-blue-50 transition-colors ${activeContact?.id === contact.id ? 'bg-blue-50' : ''}`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl overflow-hidden relative">
                      <Image src={contact.image} alt={contact.name} fill className="object-cover" />
                    </div>
                    {contact.online && <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs border-2 border-white rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 truncate">{contact.name}</h4>
                    <p className="text-sm text-gray-500 truncate">{contact.lastMsg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col bg-gray-50/50">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center px-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden relative">
                  {activeContact && <Image src={activeContact.image} alt="Active" fill />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{activeContact?.name || "Select a contact"}</h4>
                  <span className={`text-xs ${activeContact?.online ? 'text-green-500' : 'text-gray-400'} font-medium`}>
                    {activeContact?.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <FaEllipsisV className="text-gray-400 cursor-pointer" />
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {filteredMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-4 rounded-2xl shadow-sm ${
                    msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${msg.isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 px-6 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button type="submit" className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
