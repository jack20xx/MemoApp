import React, { useState } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function SignUpScreen(props) {
    const { navigation } = props;
    // 下記も分割代入。保持したいemailとsetEmailで上書きする、('')は初期値。
    // 保持したい値ごとに設定が必要。
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // アロー関数は不要なので削除
    function handlePress() {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            // 会員登録に成功した場合
            .then((userCredential) => {
                const { user } = userCredential;
                console.log(user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MemoList' }],
                });
            })
            // 会員登録に失敗した場合
            .catch((error) => {
                console.log(error.code, error.message);
                Alert.alert(error.code);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    // コールバック関数、イベントが起こるたびに実行される。
                    // この場合は入力されたtextがそのままsetEmailに入るようになっている。
                    onChangeText={(text) => { setEmail(text); }}
                    // 自動的に最初の文字が大文字にならないようにする。
                    autoCapitalize="none"
                    // @がキーボードで使いやすくなる設定。
                    keyboardType="email-address"
                    placeholder="Email Address"
                    // iOSでの自動保存機能。キャメルケースに注意。
                    textContentType="emailAddress"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => { setPassword(text); }}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <Button
                    label="Submit"
                    // 長くなるので下記を切り出す。
                    onPress={handlePress}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'LogIn' }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Log in.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    inner: {
        paddingHorizontal: 27,
        paddingVertical: 24,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        fontSize: 16,
        // lineHeight: 32,
        height: 48,
        borderColor: '#dddddd',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        backgroundColor: '#467fd3',
        borderRadius: 4,
        // テキストに合わせてボックスが調整される。
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    buttonLabel: {
        fontSize: 16,
        lineHeight: 32,
        paddingHorizontal: 32,
        paddingVertical: 8,
        color: '#ffffff',
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467fd3',
    },
    footer: {
        flexDirection: 'row',
    },
});
