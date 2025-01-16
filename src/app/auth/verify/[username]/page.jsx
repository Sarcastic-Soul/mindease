'use client';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (element, index) => {
    const value = element.value;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if a digit is entered
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] === '' && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const verifyCode = otp.join('');
      const response = await axios.post(`/api/users/verify-code`, { username: params.username, verifyCode });
      console.log('Verification success', response.data);
      router.replace('/auth/login');
    } catch (error) {
      console.error('Verification failed', error.message);
      setErrorMessage('Invalid username or verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #e0f7fa, #e3f2fd, #f3e5f5, #fce4ec)",
        animation: "gradient 10s ease infinite",
      }}
      className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden"
    >
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="max-w-lg w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:shadow-xl">
          <div className="py-6 px-8">
            <h2 className="text-center text-3xl font-bold text-blue-800">
              Verify Your Account
            </h2>
            <p className="mt-4 text-center text-blue-600">
              Please enter the 6-digit Verification Code sent to your email
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="flex justify-between space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-2xl border text-blue-800 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  />
                ))}
              </div>
              {errorMessage && <p className="text-sm text-red-500 mt-4">{errorMessage}</p>}
              <button
                type="submit"
                disabled={isLoading || otp.includes('')}
                className={`w-full py-3 px-4 text-white font-semibold rounded-md shadow-md ${isLoading || otp.includes('')
                  ? "bg-gradient-to-r from-blue-300 to-blue-400 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-500 to-teal-500 hover:scale-105 hover:shadow-lg transition duration-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                {isLoading ? "Verifying..." : "Verify Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
