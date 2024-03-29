// useEffectでログインした時に処理を走らせ、ログイン状態を監視する。
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';
import Loading from '../components/Loading';
import { translateErrors } from '../utils';

export default function LogInScreen(props) {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // userの状態を監視する。LogInScreenが消えたら監視しないようにするため、unsubscribeを関数に設定し、監視をキャンセルしている。
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            // ログインしていれば、下記の処理を走らせる。
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MemoList' }],
                });
            } else {
                setLoading(false);
            }
        });
        // LogInScreenが消える瞬間にだけ監視が実行されるため、結果的にそれ以降は監視がキャンセルされる。
        return unsubscribe;
    // propsが変更されるたびにuseEffectが実行されるため、空の[]を入れることで、
    // １回だけ処理が行われるようにしている。もし監視したい対象があれば、[]の中に入れる。
    }, []);

    function handlePress() {
        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const { user } = userCredential;
                console.log(user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MemoList' }],
                });
            })
            .catch((error) => {
                // 翻訳を入れる。
                const errorMsg = translateErrors(error.code);
                Alert.alert(errorMsg.title, errorMsg.description);
            })
            // ログインに成功しても失敗しても下記を行う。
            .then(() => {
                setLoading(false);
            });
    }

    return (
        <View style={styles.container}>
            <Loading isLoading={isLoading} />
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => { setEmail(text); }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email Address"
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
                    // resetで、現在の履歴に関係なく、routesで上書きする。
                    // index: 0で最初のページであることを示している。０より前はない。
                    onPress={handlePress}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'SignUp' }],
                            });
                        }}
                    >
                        <Text style={styles.footerLink}>Sign up here!</Text>
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
