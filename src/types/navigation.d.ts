type RootStackParamList = {
  Voice: undefined;
  Splash: undefined;
  Welcome: undefined;
  GroceryList: undefined;
  GrocerySubList: {
    name: string;
  };
  AddGrocery: undefined;
  AddGrocerySubList: {
    do: 'Add' | 'Edit';
    data?: {id: string; name: string; image_url: any};
  };
};
