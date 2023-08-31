import { passwordLength } from "../utils"

export const validate = (type, value) => {
    let errors = {}
    if (value.length === 0) {
        errors.required = `${type} không được để trống`
    }
    if (typeof value === 'string' || value <= 0) {
        errors.isNumber = `${type} phải là số nguyên`
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
        errors.isEmail = `${type} không hợp lệ`
    }
    if (!(/^0[0-9]{9}$/.test(value))) {
        errors.isPhoneNumber = `${type} không hợp lệ`
    }
    if (value.length < passwordLength.minLength || value > passwordLength.maxLength) {
        errors.password = `${type} tối thiểu ${passwordLength.minLength}, tối đa ${passwordLength.maxLength}`
    } 
}