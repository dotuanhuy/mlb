import { passwordLength } from "../utils"

export const validate = (obj, value) => {
    let arrKeys = Object.keys(obj)
    let errors = {}
    arrKeys.forEach((item, index) => {
        if (obj[item].length === 0) {
            errors[item] = `Trường không được để trống`
        }
        else if (item === 'price' && (typeof obj[item] === 'string' || obj[item] <= 0)) {
            errors[item] = `${item} phải là số nguyên`
        }
        else if (item === 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj[item]))) {
            errors[item] = `Email không hợp lệ`
        }
        else if (item === 'phone' && !(/^0[0-9]{9}$/.test(obj[item]))) {
            errors[item] = `Số điện thoại không hợp lệ`
        }
        else if ((item === 'password' || item === 'newPassword' || item === 'rePassword') && (obj[item].length < passwordLength.minLength || obj[item] > passwordLength.maxLength)) {
            errors[item] = `Password tối thiểu ${passwordLength.minLength}, tối đa ${passwordLength.maxLength}`
        } 
        else if (item === 'rePassword' && obj[item] !== obj['newPassword']) {
            errors[item] = 'Mật khẩu không khớp'
        }
    })
    return errors
}

export const validateSelect = (select) => {
    return select.length === 0 ? 'Trường này không bỏ trống' : ''
}
