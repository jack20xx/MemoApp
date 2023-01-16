import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Hello from './src/components/Hello';

export default function App() {
  return (
    <View style={styles.container}>
      {/* bangは！を表す。propsを指定して、Helloで使えるようにする。
          trueであれば省略可能。 */}
      <Hello bang>World</Hello>
      <Hello bang style={{ fontSize: 16}}>Small World</Hello>
      <Text>Open up App.js to start working on your app!</Text>
      {/* eslint-disable-next-line */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
