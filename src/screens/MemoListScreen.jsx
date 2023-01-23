import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

export default function MemoListScreen(props) {
    const { navigation } = props;
    const [memos, setMemos] = useState([]);
    useEffect(() => {
        // navigationのAppBarを使っているので、navigationを編集していく。
        navigation.setOptions({
            headerRight: () => <LogOutButton />,
        });
    }, []);

    useEffect(() => {
        const db = firebase.firestore();
        const { currentUser } = firebase.auth();
        // currentUserはログアウトされるとエラーになるためifの処理にする。
        // unsubscribeをif内に入れたため、if外に定義する必要がある。
        // letで定義し、再代入可能な状態にする。
        // すでに定義したためif内でconstは不要になる。
        let unsubscribe = () => {};
        if (currentUser) {
            const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt', 'desc');
            unsubscribe = ref.onSnapshot((snapshot) => {
                const userMemos = [];
                // メモの中にあるそれぞれのリストを参照できる。
                // arrowを並列に並べる時、前者が.then、後者が.catchと同じ扱われ方になる。
                snapshot.forEach((doc) => {
                    console.log(doc.id, doc.data());
                    const data = doc.data();
                    // pushでuserMemosの配列に情報を追加できる。
                    userMemos.push({
                        id: doc.id,
                        bodyText: data.bodyText,
                        updatedAt: data.updatedAt.toDate(),
                    });
                });
                // 一時的に設定したuserMemosをsetMemosに入れる。
                setMemos(userMemos);
            }, (error) => {
                console.log(error);
                Alert.alert('データの読み込みに失敗しました。');
            });
        }
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <MemoList memos={memos} />
            <CircleButton
                name="plus"
                onPress={() => { navigation.navigate('MemoCreate'); }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
});
