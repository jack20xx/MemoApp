import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 別のファイルでcomponentフォルダのデータを使いたい場合、exportで抽出できる。
// これにより、App.jsxでimportできる。
export default function AppBar() {
    return (
        <View style={styles.appbar}>
            <View style={styles.appbarInner}>
            <Text style={styles.appbarTitle}>Memo App</Text>
            <Text style={styles.appbarRight}>ログアウト</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appbar: {
        width: '100%',
        height: 104,
        backgroundColor: '#467fd3',
        justifyContent: 'flex-end',
      },
      appbarInner: {
        alignItems: 'center',
      },
      appbarRight: {
        position: 'absolute',
        right: 19,
        bottom: 16,
        color: 'rgba(255, 255, 255, 0.8)',
      },
      appbarTitle: {
        marginBottom: 8,
        fontSize: 22,
        lineHeight: 32,
        color: '#ffffff',
        fontWeight: 'bold',
      },
});
