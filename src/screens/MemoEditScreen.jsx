import React from 'react';
import {
    View, TextInput, StyleSheet, KeyboardAvoidingView,
} from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function MemoEditScreen() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <AppBar />
            {/* TextInputで文字入力可能、multilneで複数行を許可 */}
            <View style={styles.inputContainer}>
                <TextInput value="買い物リスト" multiline style={styles.input} />
            </View>
            <CircleButton name="check" />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    // 親も子もflexを有効にしないと適用できない。
    inputContainer: {
        flex: 1,
        paddingHorizontal: 27,
        paddingVertical: 32,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
    },
});
