import { useState } from "react";
import { Validation } from "../utils/validations";

export interface HelpText {
  email?: string;
  paddword?: string;
  firstname?: string;
  lastname?: string;
}

export interface SignUpForm {
  firstname: string,
  lastname: string,
  email: string;
  password: string;
}

const useAuth = (navigation: any) => {
  const [helpText, setHelpText] = useState<HelpText | undefined>({
    email: '',
    paddword: '',
    firstname: '',
    lastname: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = ({
    firstname, lastname, email, password
  }: SignUpForm) => {
    setIsLoading(true);
    navigation.navigate('VerifyEmail', { email, type: 'confirm' });
    setIsLoading(false);
  };

  const handleCheckFirstname = (value: string) => {
    if (!value) {
      setHelpText({
        ...helpText,
        firstname: 'Please enter your first name!'
      });
    } else {
      setHelpText({
        ...helpText,
        firstname: ''
      });
    }


  };

  const handleCheckLastname = (value: string) => {
    if (!value) {
      setHelpText({
        ...helpText,
        lastname: 'Please enter your last name!'
      });
    } else {
      setHelpText({
        ...helpText,
        lastname: ''
      });
    }


  };

  const handleCheckEmail = (email: string) => {
    if (email) {
      const isValid = Validation.email(email);

      if (!isValid) {
        setHelpText({ ...helpText, email: 'Please enter a valid email address' });
      } else {
        setHelpText({ ...helpText, email: '' });
      }
    } else {
      setHelpText({
        ...helpText,
        email: 'Please enter your email!',
      });
    }
  };

  const handleCheckPass = (password: string) => {
    if (password) {
      if (password.length < 6) {
        setHelpText({
          ...helpText,
          paddword: 'Password must be at least 6 characters',
        });
      } else {
        setHelpText({ ...helpText, paddword: '' });
      }
    } else {
      setHelpText({
        ...helpText,
        paddword: 'Please enter your password!',
      });
    }
  };

  return {
    helpText,
    isLoading,
    handleCheckFirstname,
    handleCheckLastname,
    handleCheckEmail,
    handleCheckPass,
    handleLogin
  };
};

export default useAuth;