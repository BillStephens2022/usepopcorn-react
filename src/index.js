import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import StarRating from './components/StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} messages={["Terrible", "Bad", "OK", "Good", "Amazing"]}/>
    <StarRating maxRating={10} />
    <StarRating size={24} color="red" className="test" defaultRating={3} /> */}
    <App />
  </React.StrictMode>
);


