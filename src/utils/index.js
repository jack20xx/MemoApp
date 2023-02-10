import { format } from 'date-fns';

export function dateToString(date) {
    // データがない場合は、空を返す。
    if (!date) { return ''; }
    return format(date, 'yyyy年M月d日 HH時mm分');
}
