import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavItem = () => {
  const [navItem, setNavItem] = useState<string>('HOME');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setNavItem('HOME');
        break;
    case '/shirts':
        setNavItem('SHIRTS');
        break;
      case '/login':
        setNavItem('LOGIN');
        break;
      case '/register':
        setNavItem('REGISTER');
        break;
      // Add other cases as needed
      default:
        setNavItem('HOME'); // or 'DEFAULT' or any other default case you prefer
    }
  }, [location.pathname]);

  return navItem;
};
