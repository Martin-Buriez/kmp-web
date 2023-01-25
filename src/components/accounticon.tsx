import React from 'react';

type AccountIconProps = {
  username: string;
}; 

function AccountIcon({ username }: AccountIconProps) {
  return (
    <div className="accountIcon">
      <img src={`./${username}-profilepicture.png`} alt={`${username}`}/>
      <p>{username}</p>
    </div>
  );
}

export default AccountIcon;