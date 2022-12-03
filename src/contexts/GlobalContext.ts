import React from 'react';

const GlobalContext = React.createContext<AppContext>({
  setProductId: () => {},
  productId: '',
});

export default GlobalContext;
