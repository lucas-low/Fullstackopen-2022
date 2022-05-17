import React from 'react';

const Notification=({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes("failed")) {
        return <div className="error-message">{message}</div>;
      }

    return (
    <div className={`notification notification--${message.type}`}>
      {message.text}
    </div>
      )
    }


export default Notification