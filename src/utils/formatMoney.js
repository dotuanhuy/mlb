
export const formatVND= (money) => {
    let input = ''
    if (money) {
        input = money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})
    }
    return input
} 