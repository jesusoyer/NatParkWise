'use client';

import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  description: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<Item[]>([]); // State for all items
  const [loading, setLoading] = useState(false);

  const handlePostRequest = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log('Response from server:', result);

      // Add the new item to the state in real time
      setItems((prevItems) => [
        ...prevItems,
        { id: items.length + 1, name, description },
      ]);

      // Clear input fields
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 min-h-screen bg-gray-50">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border border-gray-300 rounded"
        rows={5}
        cols={40}
      />
      <button
        onClick={handlePostRequest}
        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-2xl">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-gray-300 rounded shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
