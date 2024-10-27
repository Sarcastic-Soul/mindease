'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      setToken(urlToken); // Store the token in state for later use
    }
  }, []);

  const handleVerifyClick = async () => {
    if (!token) {
      setVerificationStatus('Invalid or missing token.');
      return;
    }

    try {
      const response = await axios.post('/api/users/verifyEmail', { token });
      if (response.status === 200) {
        setVerificationStatus('Email successfully verified!');
        // Redirect to dashboard after a brief delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500); // 1.5-second delay for the user to see the success message
      } else {
        setVerificationStatus('Email verification failed. Try again.');
      }
    } catch (error) {
      setVerificationStatus('Error verifying email. Please try again.');
    }
  };

  return (
    <div>
      <h1>Email Verification</h1>
      {verificationStatus ? (
        <p>{verificationStatus}</p>
      ) : (
        <div>
          <p>Click the button below to verify your email:</p>
          <button onClick={handleVerifyClick} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
            Verify Email
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
