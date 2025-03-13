import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, CheckCircle, XCircle } from 'lucide-react';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'error'
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isVerifying) return;
    
    // Only accept numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    if (isVerifying) return;
    
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.split('').slice(0, 6);
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(v => v === '');
    if (nextEmptyIndex >= 0) {
      inputRefs.current[nextEmptyIndex].focus();
    } else if (inputRefs.current[5]) {
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return;
    
    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      // For demo purposes, let's say '123456' is a valid OTP
      if (otpValue === '123456') {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('error');
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setTimer(30);
    setCanResend(false);
    setVerificationStatus(null);
    setOtp(['', '', '', '', '', '']);
    
    // Focus first input after resend
    setTimeout(() => {
      inputRefs.current[0].focus();
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-xl"></div>
          <div className="absolute -bottom-14 -left-14 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
          
          <Link
            to="/signin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors duration-200 relative z-10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>
          
          <div className="flex justify-center mb-6 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="bg-primary/10 p-4 rounded-full"
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 relative z-10"
          >
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Verify Your Account
            </h1>
            <p className="text-muted-foreground text-sm">
              We've sent a 6-digit verification code to your email.
              Enter the code below to confirm your account.
            </p>
          </motion.div>
          
          <div className="space-y-6 relative z-10">
            {/* OTP Input Field */}
            <div>
              <div className="flex justify-center gap-2 mb-2">
                {otp.map((digit, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="relative"
                  >
                    <input
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className={`w-10 h-12 text-center font-bold text-lg rounded-lg border-2 
                                focus:ring-2 focus:ring-primary/50 focus:border-primary 
                                outline-none transition-all duration-200
                                ${verificationStatus === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                  verificationStatus === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                                  'border-gray-200 dark:border-gray-700 dark:bg-gray-800'}`}
                      disabled={isVerifying || verificationStatus === 'success'}
                    />
                    {index < 5 && (
                      <div className="hidden sm:block absolute top-1/2 -right-2 transform -translate-y-1/2 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <AnimatePresence>
                {verificationStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-xs flex items-center justify-center mt-2"
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    Invalid verification code. Please try again.
                  </motion.p>
                )}
                {verificationStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-500 text-xs flex items-center justify-center mt-2"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verification successful!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            {/* Verify Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 relative
                        ${otp.join('').length !== 6 || isVerifying ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} 
                        ${verificationStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : ''} 
                        text-white shadow-sm`}
              onClick={handleVerify}
              disabled={otp.join('').length !== 6 || isVerifying || verificationStatus === 'success'}
            >
              {isVerifying ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : verificationStatus === 'success' ? (
                <span className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verified
                </span>
              ) : (
                'Verify Code'
              )}
            </motion.button>
            
            {/* Resend Section */}
            <div className="text-sm text-center">
              <p className="text-muted-foreground mb-1">
                Didn't receive the code?
              </p>
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-primary hover:underline transition-colors duration-200 font-medium"
                >
                  Resend Code
                </button>
              ) : (
                <div className="text-muted-foreground text-xs">
                  You can request a new code in <span className="font-medium text-primary">{timer}s</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs text-muted-foreground relative z-10"
          >
            <p className="flex items-center justify-center">
              <Shield className="h-3 w-3 mr-1 text-primary" />
              This is a secure, encrypted verification process
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VerifyOTP;