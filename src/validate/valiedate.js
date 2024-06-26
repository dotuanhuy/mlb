import { passwordLength, VARIABLE } from "../utils"

export const validate = (obj) => {
    let arrKeys = Object.keys(obj)
    let errors = {}
    arrKeys.forEach((item, index) => {
        if (!obj[item]) {
            errors[item] = VARIABLE[item] ? `${VARIABLE[item]} không được để trống` : `Trường này không được để trống`
        }
        else if ((item === 'firstName' || item === 'lastName') && !(/[a-zA-Z]{2,}/.test(obj[item]))) {
            if (item === 'firstName')
                errors[item] = 'Họ không đúng định dạng'
            else
                errors[item] = 'Tên không đúng định dạng'
        }
        else if ((item === 'fullName') && !(/[a-zA-Z]{2,}/.test(obj[item]))) {
            errors[item] = 'Họ và tên không đúng định dạng'
        }
        else if ((item === 'price' || item === 'originalPrice' || item === 'quantity') && !(/^(?!0(\.0+)?$)\d+(\.\d+)?$/).test(obj[item])) {
            errors[item] = `${VARIABLE[item]} không đúng định dạng`
        }
        else if (item === 'email' && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj[item]))) {
            errors[item] = `Email không hợp lệ`
        }
        else if (item === 'phone' && !(/^0[0-9]{9}$/.test(obj[item]))) {
            errors[item] = `Số điện thoại không hợp lệ`
        }
        else if ((item === 'password' || item === 'newPassword' || item === 'rePassword') && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(obj[item]))) {
            errors[item] = `Mật khẩu phải có ít nhất 1 chữ thường, 1 chữ hoa, 1 số, 1 ký tự đặc biệt và độ dài tối thiểu ${passwordLength.minLength}`
        }
        else if (item === 'rePassword') {
            if (obj['newPassword'] && obj[item] !== obj['newPassword']) {
                errors[item] = 'Mật khẩu không khớp'
            }
            else if (obj['password'] && obj[item] !== obj['password']) {
                errors[item] = 'Mật khẩu không khớp'
            }
        }
        else if (item === 'value' && !(/^(100|[1-9]?[0-9])$/).test(obj[item])) {
            errors[item] = `Mã giảm giá không hợp lệ, vui lòng nhập số (0-100)`
        }
    })
    return errors
}

export const validateSelect = (select) => {
    return select.length === 0 ? 'Trường này không bỏ trống' : ''
}

export const validateRequire = (name, value) => {
    return !value ? `${name} không được để trống` : ''
}
