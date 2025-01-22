'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Address {
  line1: string;
  city: string;
  stateCode: string;
  countryCode: string;
}

// Define the structure of a single data item
interface Item {
  id: number;
  name: string;
  description: string;
  addresses: Address[];
  images: { url: string }[]; // Array of image objects
  url: string;
  fullName: string;
}

export default function FetchDataComponent() {
  const [data, setData] = useState<Item[]>([]); // State to hold fetched data
  const [loading, setLoading] = useState(false); // State to track loading status
  const [imageIndex, setImageIndex] = useState<number[]>([]); // Track current image index for each item

  // Function to handle fetching data
  const handleFetchData = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch('/api/parks/'); // Replace with your actual API URL and API key
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await res.json();
      setData(result.data || []); // Update the data state (adjust based on the actual response structure)
      setImageIndex(new Array(result.data.length).fill(0)); // Initialize the image index array
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Reset data on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Automatically fetch data when the component is mounted
  useEffect(() => {
    handleFetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to go to the next image
  const nextImage = (index: number) => {
    setImageIndex((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      const nextIndex = (newIndexes[index] + 1) % data[index].images.length;
      newIndexes[index] = nextIndex;
      return newIndexes;
    });
  };

  // Function to go to the previous image
  const prevImage = (index: number) => {
    setImageIndex((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      const prevIndex =
        (newIndexes[index] - 1 + data[index].images.length) % data[index].images.length;
      newIndexes[index] = prevIndex;
      return newIndexes;
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8 min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item: Item, index: number) => (
            <div
              key={item.id}
              className="p-4 border border-gray-300 rounded shadow-md bg-white flex flex-col space-y-4 w-full max-w-full"
            >
              <h3 className="text-lg font-semibold">{item.fullName}</h3>

              {/* Image Carousel */}
              {item.images.length > 0 && (
                <div className="relative">
                  <Image
                    src={item.images[imageIndex[index]].url} // Display current image
                    alt={item.name}
                    width={400}
                    height={300}
                    className="object-cover rounded-md w-full h-full brightness-125"
                  />

                  {/* Navigation buttons */}
                  <button
                    onClick={() => prevImage(index)}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                  >
                    &#60;
                  </button>
                  <button
                    onClick={() => nextImage(index)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
                  >
                    &#62;
                  </button>
                </div>
              )}

              <p className="text-sm text-gray-700">{item.description}</p>
              <p className="text-sm text-gray-700">
                {item.addresses[0].line1}, {item.addresses[0].city},{' '}
                {item.addresses[0].stateCode}, {item.addresses[0].countryCode}
              </p>
              <p className="mt-2">
  <Link
    href={item.url}
    className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors duration-200 flex items-center"
    target="_blank" // Opens the link in a new tab
    rel="noopener noreferrer" // Ensures security for external links
  >
    Learn More
    <span className="ml-2">&#x279C;</span> {/* Arrow icon */}
  </Link>
</p>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
}

