import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* stackとはページ遷移の履歴が積み重なっているということ。
          Backボタンを消したいなら履歴を消すことで実現できる。 */}
      <Stack.Navigator
        initialRouteName="SignUp"
        // 元のAppBarを削除し、NavigateのheaderにAppBarのデザインを入れる。
        screenOptions={{
          headerStyle: { backgroundColor: '#467fd3' },
          headerTitleStyle: { color: '#ffffff' },
          headerTitle: 'Memo App',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          // iOSとandroidのページ遷移のアニメーションを横スライドに統一する。
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // androidでもスワイプで遷移できるようにする。
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        {/* React-navigationでは下記のscreenには自動的にnavigationが渡されている
            しかし、screenではない子やcomponentsでは適用できない。 */}
        <Stack.Screen name="MemoList" component={MemoListScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        {/* ログインとサインアップはアニメーションを変えて区別したい。
            ページ遷移を縦方向に統一する。 */}
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
