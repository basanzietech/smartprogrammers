"use client";

import React from 'react';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Navbar/Nav';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="ml-24 flex-1 p-8">
        <TopBar />
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Have questions about our courses or need technical support? We're here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <ContactCard 
                icon={<FaEnvelope />} 
                title="Email Us" 
                detail="support@smartprogrammers.com"
                subDetail="We'll respond within 24 hours"
              />
              <ContactCard 
                icon={<FaPhone />} 
                title="Call Us" 
                detail="+255 123 456 789"
                subDetail="Mon-Fri from 8am to 5pm"
              />
              <ContactCard 
                icon={<FaMapMarkerAlt />} 
                title="Visit Us" 
                detail="Smart Plaza, 4th Floor"
                subDetail="Dar es Salaam, Tanzania"
              />
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2">
                    <FaPaperPlane /> <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, detail, subDetail }: { icon: React.ReactNode, title: string, detail: string, subDetail: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl">{icon}</div>
    <div>
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-blue-600 font-semibold text-sm mt-1">{detail}</p>
      <p className="text-gray-400 text-xs mt-1">{subDetail}</p>
    </div>
  </div>
);

export default ContactPage;
