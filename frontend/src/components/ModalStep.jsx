import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import Cart from './Cart';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CheckoutForm from './CheckoutForm';
import Summary from './Summary';
import { useUser } from '../context/UserContext';

const ModalStep = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [showRegister, setShowRegister] = useState(false); // alternar entre login/registro

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const handleAuthSuccess = () => {
    setShowRegister(false);
    next();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Cart onNext={() => (user ? next() : setStep(2))} onClose={onClose} />;
      case 2:
        return showRegister ? (
          <RegisterForm onLoginSwitch={() => setShowRegister(false)} onSuccess={handleAuthSuccess} />
        ) : (
          <LoginForm onRegisterSwitch={() => setShowRegister(true)} onSuccess={handleAuthSuccess} />
        );
      case 3:
        return <CheckoutForm onNext={next} onBack={prev} />;
      case 4:
        return <Summary onBack={prev} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {renderStep()}
    </ModalWrapper>
  );
};

export default ModalStep;
