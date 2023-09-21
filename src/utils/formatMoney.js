
export const formatVND= (money) => {
    let input = ''
    if (money) {
        input = money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
    return input
} 