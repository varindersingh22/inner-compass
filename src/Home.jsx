import React, { useState, useEffect } from 'react';
import './Home.css';
import homebg from '../public/images/homebg.jpg'; 


function Home() {
  const [mentalModelData, setMentalModelData] = useState(null);
  const [booksData, setBooksData] = useState([]); // State for books data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch mental model data
        const mentalModelResponse = await fetch('https://varindersingh.pythonanywhere.com/books/self-mental');
        if (!mentalModelResponse.ok) {
          throw new Error('Failed to fetch mental model');
        }
        const mentalModelData = await mentalModelResponse.json();
        setMentalModelData(JSON.parse(mentalModelData.mentalmodel[0]));

        // Fetch books data
        const booksResponse = await fetch('https://varindersingh.pythonanywhere.com/books/self-help'); // Update with the correct API URL
        if (!booksResponse.ok) {
          throw new Error('Failed to fetch books');
        }
        const booksData = await booksResponse.json();
        setBooksData(JSON.parse(booksData.books[0]).books); // Assuming the books data is structured similarly

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="section1"
      style={{
        backgroundImage: `url(${homebg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}>
        <div className="intro-section dashboard-row">
          <h1>Transform Your Life with InnerCompass</h1>
          <p>Explore self-help books and mental models designed for your personal growth.</p>
        </div>
      </div>

      <div className="section2">
        <div className="mental-model-section">
          <h2>Featured Books</h2>
          <div className="mental-model-content">
            {booksData.map((book, index) => (
              <div key={index} className="mental-model-article">
                <img src={`/images/book${index + 1}.png`} alt={`Book ${index + 1}`} className="book-image" />
                <div className="mental-model-details">
                  <h3>{book['Book Title']}</h3>
                  <p><a href={book['Amazon Link']} target="_blank" rel="noopener noreferrer">Buy on Amazon</a></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}

        {error && <p className="text-red-500 text-center">Error: {error}</p>}

        {mentalModelData && (
          <div className="content-section dashboard-row-mental">
            <div className="book-section">
              <h2>Today's Mental Model</h2>
              <div className="book-content">
                <img src="images/Trio-1.svg" alt="Mental Model Cover" />
                <div className="book-details">
                  <h3>{mentalModelData.mentalModel}</h3>
                  <p>{mentalModelData.description}</p>
                  {mentalModelData.implementationPoints.map((point, index) => (
                    <div key={index} className="implementation-point">
                      <h4>Point {point.number}: {point.point}</h4>
                      <p>{point.info}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
