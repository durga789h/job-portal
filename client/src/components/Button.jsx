// Button.jsx
import React from 'react';

const Button = ({ buttonText, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className='tbutton' type="submit" onClick={handleClick}>
      {buttonText}
    </button>
  );
}

export default Button;
