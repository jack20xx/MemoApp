import React from 'react';
import {
    View, TextInput, StyleSheet,
} from 'react-native';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoEditScreen(props) {
    const { navigation } = props;
    return (
        <KeyboardSafeView style={styles.container}>
            {/* TextInputで文字入力可能、multilneで複数行を許可 */}
            <View style={styles.inputContainer}>
                <TextInput value="買い物リスト" multiline style={styles.input} />
            </View>
            <CircleButton
                name="check"
                onPress={() => { navigation.goBack(); }}
            />
        </KeyboardSafeView>
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
