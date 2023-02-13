import React, { useEffect, useState } from 'react';
import {
    View, StyleSheet, Alert, Text,
} from 'react-native';
import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props) {
    const { navigation } = props;
    const [memos, setMemos] = useState([]);
    const [isLoading, setLoading] = useState(false);

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
            setLoading(true);
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
                setLoading(false);
            }, (error) => {
                console.log(error);
                setLoading(false);
                Alert.alert('データの読み込みに失敗しました。');
            });
        }
        return unsubscribe;
    }, []);

    // memoが何もなかった場合の処理を書く。
    // lengthで配列の数がいくつかを判別。
    // ifが実行された場合、memoがあった場合の後者のreturnは実行されない。
    if (memos.length === 0) {
        return (
            <View style={emptyStyles.container}>
                <Loading isLoading={isLoading} />
                <View style={emptyStyles.inner}>
                    <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
                    <Button
                        style={emptyStyles.button}
                        label="作成する"
                        onPress={() => { navigation.navigate('MemoCreate'); }}
                    />
                </View>
            </View>
        );
    }

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

const emptyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontsize: 18,
        marginBottom: 24,
    },
    button: {
        alignSelf: 'center',
    },
});

