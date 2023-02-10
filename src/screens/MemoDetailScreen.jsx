import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
// ScrollViewはReact専用のスクロールできるようにするためのタグ。
import {
    View, ScrollView, Text, StyleSheet,
} from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
// index.jsは特殊なファイルで、位置を指定しなくても自動的に読み込まれる。
import { dateToString } from '../utils';

export default function MemoDetailScreen(props) {
    // MemoDetailScreenのpropsからnavigationを取り出す。
    // routeもnavigationと同じく全てのscreenにある。
    // routeでメモのidを受け取る。routeの中のparamsの中にidが入っている構造。
    const { navigation, route } = props;
    const { id } = route.params;
    console.log(id);
    const [memo, setMemo] = useState(null);

    useEffect(() => {
        const { currentUser } = firebase.auth();
        let unsubscribe = () => {};
        if (currentUser) {
            const db = firebase.firestore();
            // 今回は単一のドキュメントに対するrefを作るので.doc(id)が要る。
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            // (snapshot)だとdocの一覧取得になってしまう。
            unsubscribe = ref.onSnapshot((doc) => {
                console.log(doc.id, doc.data());
                const data = doc.data();
                setMemo({
                    id: doc.id,
                    bodyText: data.bodyText,
                    updatedAt: data.updatedAt.toDate(),
                });
            });
        }
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                {/* 初期値をnullに設定しているので、memo.bodyTextとした場合、
                    データがない場合はエラーが起きてしまう。memo &&とすることで
                    もしデータがない場合は空のmemoを開くという設定にできる。 */}
                <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
                <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
            </View>

            <ScrollView>
                <Text style={styles.memoBody}>
                    {memo && memo.bodyText}
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

MemoDetailScreen.propTypes = {
    route: shape({
        params: shape({ id: string }),
    }).isRequired,
};

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
