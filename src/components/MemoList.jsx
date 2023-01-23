import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Alert, FlatList,
} from 'react-native';
// navigationが設定されていないcomponentsで使えるようにする設定。
import { useNavigation } from '@react-navigation/native';
// memosはobjectの配列が入るのでarrayOfとshape、bodyTextは文字列なのでstring、updatedAtはデータ型なのでinstanceOf
import {
    shape, string, instanceOf, arrayOf,
} from 'prop-types';

import Icon from './Icon';

export default function MemoList(props) {
    const { memos } = props;
    const navigation = useNavigation();

    function renderItem({ item }) {
        return (
            <TouchableOpacity
                // リストが重複しないように、idをkeyにする必要がある。
                // ただし今回は下のkeyExtractorで指定しているので不要。
                // key={item.id}
                style={styles.memoListItem}
                onPress={() => { navigation.navigate('MemoDetail'); }}
            >
                <View>
                    <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{String(item.updatedAt)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.memoDelete}
                    onPress={() => { Alert.alert('Are you sure?'); }}
                >
                    <Icon name="delete" size={24} color="#B0B0B0" />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {/* FlatListを使うことで画面に表示される項目のみの表示に限定できる。
                使用しないと全てのデータが常にスクロール外にも表示されていることになり
                データが多い場合パフォーマンスが落ちてしまう。 */}
            <FlatList
                data={memos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

MemoList.propTypes = {
    memos: arrayOf(shape({
        id: string,
        bodyText: string,
        updatedAt: instanceOf(Date),
    })).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    memoListItem: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        // borderWidth: 1, この場合、四辺すべてにボーダーが引かれてしまう。
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
    },
    memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32,
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: '#848484',
    },
    memoDelete: {
        padding: 8,
    },
});
