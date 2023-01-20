import React from 'react';
import {
    View, ScrollView, Text, StyleSheet,
} from 'react-native';
// ScrollViewはReact専用のスクロールできるようにするためのタグ。

import CircleButton from '../components/CircleButton';

export default function MemoDetailScreen(props) {
    // MemoDetailScreenのpropsからnavigationを取り出す。
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle}>買い物リスト</Text>
                <Text style={styles.memoDate}>2023年1月16日 10:00</Text>
            </View>

            <ScrollView>
                <Text style={styles.memoBody}>
                    買い物リスト
                    おはようございます。
                </Text>
            </ScrollView>

            <CircleButton
                style={{ top: 60, bottom: 'auto' }}
                name="pencil"
                // App.jsxのnameと対応している。
                onPress={() => { navigation.navigate('MemoEdit'); }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    memoHeader: {
        backgroundColor: '#467fd3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19,
    },
    memoTitle: {
        color: '#ffffff',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold',
    },
    memoDate: {
        color: '#ffffff',
        fontSize: 12,
        lineHeight: 16,
    },
    memoBody: {
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    memoText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
