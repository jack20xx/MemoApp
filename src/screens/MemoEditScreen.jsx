import React, { useState } from 'react';
import {
    View, TextInput, StyleSheet, Alert,
} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

export default function MemoEditScreen(props) {
    const { navigation, route } = props;
    const { id, bodyText } = route.params;
    const [body, setBody] = useState(bodyText);

    function handlePress() {
        const { currentUser } = firebase.auth();
        if (currentUser) {
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            // setで内容を更新する。setの中で成功時と失敗時の処理を書ける。
            // updatedAtを入れないと更新時間が追加されない。
            ref.set({
                bodyText: body,
                updatedAt: new Date(),
            // 第２引数にmergeを追加することで、createdAtをキープしたままupdatedAtを追加できる。
            }, { merge: true })
                .then(() => {
                    navigation.goBack();
                })
                .catch((error) => {
                    Alert.alert(error.code);
                });
        }
    }

    return (
        <KeyboardSafeView style={styles.container}>
            {/* TextInputで文字入力可能、multilneで複数行を許可 */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={body}
                    multiline
                    style={styles.input}
                    onChangeText={(text) => { setBody(text); }}
                />
            </View>
            <CircleButton
                name="check"
                onPress={handlePress}
            />
        </KeyboardSafeView>
    );
}

MemoEditScreen.propTypes = {
    route: shape({
        params: shape({ id: string, bodyText: string }),
    }).isRequired,
};

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
