import React from 'react';

const GoogleAuthButton = () => {
  const handleGoogleAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <button onClick={handleGoogleAuth} className="google-auth-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 48 48"
        className="google-icon"
      >
        {/* Google アイコンの SVG パス */}
      </svg>
      Agestアカウント でログイン
    </button>
  );
};

export default GoogleAuthButton;
