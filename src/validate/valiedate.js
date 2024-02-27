import { passwordLength } from "../utils"

export const validate = (obj, value) => {
    let arrKeys = Object.keys(obj)
    let errors = {}
    arrKeys.forEach((item, index) => {
        if (obj[item].length === 0) {
            errors[item] = `Trường này không được để trống`
        }
        else if ((item === 'firstName' || item === 'lastName') && (/^\d/.test(obj[item]))) {
            if (item === 'firstName')
                errors[item] = 'Họ không đúng định dạng'
            else 
                errors[item] = 'Tên không đúng định dạng'
        }
        else if (item === 'price' && (typeof obj[item] === 'string' || obj[item] <= 0)) {
            errors[item] = 'Giá bán không đúng định dạng'
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
        else if (item === 'rePassword' && obj[item] !== obj['newPassword']) {
            errors[item] = 'Mật khẩu không khớp'
        }
    })
    return errors
}

export const validateSelect = (select) => {
    return select.length === 0 ? 'Trường này không bỏ trống' : ''
}
