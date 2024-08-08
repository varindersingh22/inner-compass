import
 React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] =
 useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://varindersingh.pythonanywhere.com/books/with_descriptions/');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data.books);
        setDescriptions(data.descriptions); 
      } catch (error) {
        setError(error.message
);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center my-4">
        Latest Books 📚
      </h1> 
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div> 
        </div>
      )}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {books.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {books.map((book, index) => (
            <li key={index} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
              <p className="font-bold">{book}</p>
              {descriptions[index] && <p className="text-gray-600">{descriptions[index]}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;