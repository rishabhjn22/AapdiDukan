import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
// import Splash from './src/view/Splash';
import Welcome from './src/view/Welcome';
import GroceryList from './src/view/GroceryList';
import AddGrocery from './src/view/AddGrocery';
import GrocerySubList from './src/view/GrocerySubList';
import AddGrocerySubList from './src/view/AddGrocerySubList';
import GlobalContext from './src/contexts/GlobalContext';

function App() {
  const RootStack = createStackNavigator();
  const [productId, setProductId] = useState('');
  return (
    <GlobalContext.Provider value={{setProductId, productId}}>
      <View style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator>
            {/* <RootStack.Screen
              options={{headerShown: false}}
              name="Splash"
              component={Splash}
            /> */}
            <RootStack.Screen
              options={{headerShown: false}}
              name="Welcome"
              component={Welcome}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="GroceryList"
              component={GroceryList}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AddGrocery"
              component={AddGrocery}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="GrocerySubList"
              component={GrocerySubList}
            />
            <RootStack.Screen
              options={{headerShown: false}}
              name="AddGrocerySubList"
              component={AddGrocerySubList}
            />
          </RootStack.Navigator>
        </NavigationContainer>
        <Toast />
      </View>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
