import React, { useState } from 'react';

function Profile() {
  const [name, setName] = useState('Name Surname');
  const [password, setPassword] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="w-3/4 md:w-1/2 lg:w-2/3 bg-white p-8 rounded-lg shadow-lg grid gap-6"
           style={{ gridTemplateRows: 'auto 1fr', gridTemplateColumns: '1fr', gridTemplateAreas: `"header" "body"` }}>
        
        <div className="p-4 bg-gray-500 text-white rounded-md" style={{ gridArea: 'header' }}>
          <h1 className="text-2xl font-bold text-center">Hello {name}</h1>
          <p className="text-gray-200 text-center">You can update and manage your personal information here.</p>
        </div>
        
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gridArea: 'body' }}>
         
          <div className="flex-grow">
            
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              {isEditingName ? (
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <div 
                  className="w-full p-2 border rounded-md bg-white cursor-pointer"
                  onClick={() => setIsEditingName(true)}
                >
                  {name}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <div className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed">
                email.address@example.com
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              {isEditingPassword ? (
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setIsEditingPassword(false)}
                  className="w-full p-2 border rounded-md"
                />
              ) : (
                <div 
                  className="w-full p-2 border rounded-md bg-white cursor-pointer"
                  onClick={() => setIsEditingPassword(true)}
                >
                  {password ? '••••••••' : 'Click to set password'}
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
              <button className="px-4 py-2 bg-gray-400 text-white rounded-md">Reset</button>
            </div>
          </div>


          <div className="flex-shrink-0 flex flex-col items-center justify-center">
            <div className="w-40 h-40 bg-gray-300 rounded-full mb-4"></div>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
              Change Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
