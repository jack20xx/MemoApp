import React, { useState } from 'react';
import {
    View, TextInput, StyleSheet,
} from 'react-native';

import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoCreateScreen(props) {
    const { navigation } = props;
    const [bodyText, setBodyText] = useState('');

    function handlePress() {
        const { currentUser } = firebase.auth();
        const db = firebase.firestore();
        // collection → documents → data
        // ユーザーごとに保存できるようにする。バッククォート必要。
        const ref = db.collection(`users/${currentUser.uid}/memos`);
        // documentの追加。
        ref.add({
            bodyText,
            updatedAt: new Date(),
        })
            .then((docRef) => {
                console.log('Created!', docRef.id);
                // goBackする前にデータを保存する処理を入れる。
                navigation.goBack();
            })
            .catch((error) => {
                console.log('Error!', error);
            });
    }

    return (
        <KeyboardSafeView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={bodyText}
                    multiline
                    style={styles.input}
                    onChangeText={(text) => { setBodyText(text); }}
                    autoFocus
                />
            </View>
            <CircleButton
                name="check"
                onPress={handlePress}
            />
        </KeyboardSafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
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
