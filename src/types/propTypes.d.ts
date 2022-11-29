import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp} from 'react-native';

type SplashProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

type CustomButtonProps = {
  onPress: () => void;
  title: string;
  style?: StyleProp;
};

type WeclomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

type FABProps = {
  onPress: () => void;
};

type GroceryListProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GroceryList'>;
};

type InputProps = {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  placeholder: string;
};

type OptionsProps = {
  onPressCamera: () => void;
  onPressGallery: () => void;
};

type GrocerySubListParams = {
  route: StackNavigationProp<RootStackParamList, 'GrocerySubList'>;
  navigation: StackNavigationProp<RootStackParamList, 'GrocerySubList'>;
};
