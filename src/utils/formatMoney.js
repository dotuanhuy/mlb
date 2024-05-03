
export const formatVND= (money) => {
    return money || money === 0 ? money.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'}) : ''
} 