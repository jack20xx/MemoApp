import { format } from 'date-fns';

export function dateToString(date) {
    // データがない場合は、空を返す。
    if (!date) { return ''; }
    return format(date, 'yyyy年M月d日 HH時mm分');
}

export function translateErrors(code) {
    const error = { title: 'エラー', description: '時間をおいてお試しください' };
    // 条件分岐が多いので、switchを使うといい。
    switch (code) {
        case 'auth/invalid-email':
            error.description = 'メールアドレスが不正です。';
            // breakを書かないと、処理を区別できない。
            break;
        case 'auth/user-disabled':
            error.description = 'アカウントが無効です。';
            break;
        case 'auth/user-not-found':
            error.description = 'ユーザーが見つかりませんでした。';
            break;
        case 'auth/wrong-password':
            error.description = 'パスワードが間違っています。';
            break;
        case 'auth/email-already-in-use':
            error.description = 'すでに使用されているメールアドレスです。';
            break;
        case 'auth/operation-not-allowed':
            error.description = '開発者にお問い合わせください';
            break;
        case 'auth/weak-password':
            error.description = 'パスワードが簡単すぎます';
            break;
        // どの条件にも当てはまらない場合のデフォルト値を決める。特に指定がなければ、const errorの初期値が返される。
        default:
    }
    return error;
}
