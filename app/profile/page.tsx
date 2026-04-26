import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Navbar/Nav';
import { FaGraduationCap, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaEdit } from 'react-icons/fa';
import Image from 'next/image';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Benjamin Benja",
    role: "Senior Software Developer & Lead Instructor",
    email: "benja@smartprogrammers.com",
    location: "Dar es Salaam, Tanzania",
    company: "Smart Programmers Ltd",
    education: "BSc in Computer Science",
    about: "Passionate developer with over 8 years of experience in full-stack development. Specialized in React, Node.js, and Cloud Architecture. Dedicated to teaching the next generation of developers in Tanzania and across Africa."
  });

  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, userId: 'temp-user-id' }),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setProfile({ ...profile, ...updatedUser });
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="ml-24 flex-1 p-8">
        <TopBar />
        <div className="mt-8 max-w-5xl mx-auto">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-3xl shadow-lg"></div>
          
          {/* Profile Header */}
          <div className="bg-white px-8 pb-8 rounded-b-3xl shadow-sm border border-gray-100 relative">
            <div className="flex flex-col md:flex-row items-end -mt-16 md:space-x-6">
              <div className="relative w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gray-200">
                <Image 
                  src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4Gv869B.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0 pb-2">
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-gray-500 font-medium">{profile.role}</p>
              </div>
              <div className="pb-2">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  <FaEdit /> <span>Edit Profile</span>
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Information</h3>
                <div className="space-y-4">
                  <InfoItem icon={<FaEnvelope />} text={profile.email} />
                  <InfoItem icon={<FaMapMarkerAlt />} text={profile.location} />
                  <InfoItem icon={<FaBriefcase />} text={profile.company} />
                  <InfoItem icon={<FaGraduationCap />} text={profile.education} />
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">About Me</h3>
                <p className="text-gray-600 leading-relaxed">
                  {profile.about}
                </p>
                
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 pt-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'UI/UX Design'].map(skill => (
                    <span key={skill} className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Role</label>
                  <input 
                    value={editForm.role}
                    onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input 
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <input 
                    value={editForm.location}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">About Me</label>
                <textarea 
                  rows={4}
                  value={editForm.about}
                  onChange={(e) => setEditForm({...editForm, about: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
              <div className="flex space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center space-x-3 text-gray-600">
    <div className="text-blue-500 w-5">{icon}</div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default ProfilePage;
