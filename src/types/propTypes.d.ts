import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp} from 'react-native';

type SplashProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

type CustomButtonProps = {
  onPress: () => void;
  title: string;
  style?: StyleProp;
  textStyle?: StyleProp;
};

type WeclomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

type FABProps = {
  onPress: () => void;
  name: string;
  size: number;
  style?: StyleProp;
};

type GroceryListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GroceryList'>;
};

type InputProps = {
  label?: string;
  value: string;
  onChangeText: (val: string) => void;
  placeholder: string;
  endIcon?: boolean;
  error?: string;
};

type OptionsProps = {
  onPressCamera: () => void;
  onPressGallery: () => void;
};

type GrocerySubListParams = {
  route: RouteProp<RootStackParamList, 'GrocerySubList'>;
  navigation: StackNavigationProp<RootStackParamList, 'GrocerySubList'>;
};

type AddGroceryProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddGroceryist'>;
};

type AddGrocerySubListProps = {
  route: RouteProp<RootStackParamList, 'AddGrocerySubList'>;
  navigation: StackNavigationProp<RootStackParamList, 'AddGrocerySubList'>;
};

type SubListProps = {
  id: string;
  name: string;
  image_url: any;
  selling_price: string;
  buying_price: string;
  last_selling_price: string;
};

type ListProps = {
  name: any;
  image_url: any;
};

type LoaderProps = {
  isLoading: boolean;
};

type FloatingActionsProps = {
  isOpen: boolean;
  onClosed: () => void;
};

type CustomHeaderProps = {
  heading: string;
  onPressBack?: () => void;
  back?: boolean;
  deleteButton?: boolean;
  onPressDelete?: () => void;
};
