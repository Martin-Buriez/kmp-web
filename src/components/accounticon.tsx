import React from 'react';

function AccountIcon() {
  const author = "Jean Jacques"
  return (
    <div className="accountIcon">
      <img src={`./${author}-profilepicture.png`} alt={`${author}`}/>
      <p>{author}</p>
    </div>
  );
}

export default AccountIcon;