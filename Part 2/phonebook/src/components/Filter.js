import React from 'react';
/**
 * Show filtered 'persons' by input value 'name'
 * input value output string passed from onChange handler function every time user enters something...
 * into the input field while user input value is present in the event.target.value property...
 * with setFilter parameter to be retrived
 */
const Filter = ({ setFilter }) => {
    return (
      <div>
        filter shown with <input 
        onChange={({target}) => setFilter(target.value)}
        />
      </div>
    );
  };
  
  export default Filter;