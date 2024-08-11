import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Dashboard() {
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const [mentalModels, setMentalModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://varindersingh.pythonanywhere.com/books/helpview/',
        { user_input: input }, // using input from the form as user_input
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      // Update state with books and mental models data from API response
      setBooks(response.data.books || []);
      setMentalModels(response.data.mental_model ? [response.data.mental_model] : []);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFetchData = () => {
    if (!input.trim()) return; // Prevent fetching if input is empty

    fetchData();
    setInput(""); 
  };

  return (
    <div className="dashboard-container">
      <div className="section1">
        <div className="intro-section dashboard-row">
          <h1>Welcome to the Dashboard</h1>
          <h3 style={{color: '#284e95'}}>Get Personalized Suggestions</h3>
          <form>
            <input
              type="text"
              placeholder="Search"
              value={input}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleFetchData}>Submit</button>
          </form>
        </div>
      </div>

      <div className="section2">
        <div className="mental-model-section">
          <h2>Recommended Books</h2>
          <div className="mental-model-content">
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : error ? (
              <p className="error-message">Error: {error}</p>
            ) : books.length ? (
              books.map((book, index) => (
                <div className="mental-model-article" key={index}>
                 <img src={`/images/book${index + 1}.png`} alt={`Book ${index + 1}`} className="book-image" />
                   <div className="mental-model-details">
                    <h3>{book["Book Title"]}</h3>
                    <a href={book["Amazon Link"]} target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
                  </div>
                </div>
              ))
            ) : (
              <p>No books found</p>
            )}
          </div>
        </div>

        <div className="content-section dashboard-row-mental">
          <div className="book-section">
            <h2>Recommended Mental Models</h2>
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : error ? (
              <p className="error-message">Error: {error}</p>
            ) :mentalModels.length ? (
              mentalModels.map((model, index) => (
                <div className="book-content" key={index}>
                  <img src="images/Trio-1.svg" alt="Mental Model Cover" />
                  <div className="book-details">
                    <h3>{model.mentalModel}</h3>
                    <p>{model.description}</p>
                    {model.implementationPoints.map((point, idx) => (
                      <div className="implementation-point" key={idx}>
                        <h4>Point {point.number}:{point.point}</h4>
                        <p>{point.info}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No mental models found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
