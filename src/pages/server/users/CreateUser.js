import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import TableUser from './TableUser';
import { useSearchParams } from 'react-router-dom';
import { CustomToast, path } from '../../../utils';
import { validate, validateRequire } from '../../../validate/valiedate';
import Sidebar from '../../../components/server/sidebars/Sidebar';
import Navbar from '../../../components/server/navbar/Navbar';
import DatePicker from "react-datepicker";
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const initState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
}

function CreateUser() {
    const dispatch = useDispatch()
    const { provinces, roles, message, errCode } = useSelector(state => state.user)
    const [dataInput, setDataInput] = useState(initState)
    const [selectProvine, setSelectProvince] = useState({})
    const [selectGender, setSelectGender] = useState({})
    const [selectRole, setSelectRole] = useState({})
    const [selectBirthDate, setSelectBirthDate] = useState('')
    const [listProvinces, setListProvinces] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [errors, setErrors] = useState({})
    const [params] = useSearchParams()

    // ComponentDidMount
    useEffect(() => {
        document.title = 'Thêm mới người dùng'
        dispatch(actions.getAllAddress())
        dispatch(actions.getAllRoles())
    }, [])


    // ComponentDidUpdate
    useEffect(() => {
        let dataProvinces = BuildOptionSelectSame(provinces)
        let dataGenders = [
            {
                value: 'Nam',
                label: 'Nam'
            },
            {
                value: 'Nữ',
                label: 'Nữ'
            },
            {
                value: 'Khác',
                label: 'Khác'
            }
        ]
        let dataRole = BuildOptionSelect(roles)
        setListProvinces(dataProvinces)
        setListGenders(dataGenders)
        setListRoles(dataRole)
    }, [provinces, roles])

    useEffect(() => {
        if (message) {
            if (errCode === 0) {
                toast.success(CustomToast(message), { autoClose: 2000 })
                setDataInput(initState)
                setSelectProvince({})
                setSelectGender({})
                setSelectRole({})
                setSelectBirthDate('')
            }
            else {
                toast.error(CustomToast(message), { autoClose: 2000 })
            }
            dispatch(actions.refreshInfoResponse())

        }
    }, [message])

    const handleOnchangeAddress = (selectProvine) => {
        setErrors({
            ...errors,
            province: ''
        })
        setSelectProvince(selectProvine)
    }

    const handleOnchangeGender = (selectGender) => {
        setErrors({
            ...errors,
            gender: ''
        })
        setSelectGender(selectGender)
    }

    const handleOnchangeRole = (selectRole) => {
        setErrors({
            ...errors,
            role: ''
        })
        setSelectRole(selectRole)
    }

    const handleCreateNewUser = () => {
        const error = validate(dataInput)
        const errorProvine = validateRequire('Địa chỉ', selectProvine?.label)
        const errorGender = validateRequire('Giới tính', selectGender?.value)
        const errorRole = validateRequire('Quyền', selectRole?.value)
        const errDate = validateRequire('Ngày sinh', selectBirthDate)
        if (Object.keys(error).length > 0 || errorProvine || errorGender || errorRole || errDate) {
            setErrors({
                ...error,
                provine: errorProvine,
                gender: errorGender,
                role: errorRole,
                date: errDate
            })
        }
        else {
            const newUser = {
                email: dataInput.email,
                password: dataInput.password,
                firstName: dataInput.firstName,
                lastName: dataInput.lastName,
                phone: dataInput.phone,
                address: selectProvine.label,
                gender: selectGender.value,
                roleId: selectRole.value,
                avatar: '',
                birthDate: selectBirthDate
            }
            dispatch(actions.createNewUser(newUser, params.get('page') || 1))
        }
    }

    return (
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active={'user'} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <h2>Thêm mới người dùng</h2>
                    <hr />
                    <div className='user-manage-form my-4 mb-5'>
                        <div className='row'>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Họ<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ"
                                    value={dataInput.firstName}
                                    onChange={e => {
                                        setDataInput({
                                            ...dataInput,
                                            firstName: e.target.value
                                        })
                                        setErrors({
                                            ...errors,
                                            firstName: ''
                                        })
                                    }}
                                />
                                {
                                    errors && errors.firstName ? <span className='error'>{errors.firstName}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Tên<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ"
                                    value={dataInput.lastName}
                                    onChange={e => {
                                        setDataInput({
                                            ...dataInput,
                                            lastName: e.target.value
                                        })
                                        setErrors({
                                            ...errors,
                                            lastName: ''
                                        })
                                    }}
                                />
                                {
                                    errors && errors.lastName ? <span className='error'>{errors.lastName}</span> : ''
                                }
                            </Form.Group>
                            <div className="mb-3 col-6">
                                <label htmlFor="exampleInputReleaseDate" className="form-label text-muted fw-500">Ngày sinh<span className='text-danger'>*</span></label>
                                <br></br>
                                <DatePicker
                                    className='form-control'
                                    dateFormat='MM/dd/yyyy'
                                    placeholderText='Nhập hoặc chọn (MM/dd/yyyy)'
                                    selected={selectBirthDate}
                                    onChange={date => {
                                        setSelectBirthDate(date)
                                        setErrors({
                                            ...errors,
                                            date: ''
                                        })
                                    }}
                                />
                                <br></br>
                                {
                                    errors && errors.date ? <span className='error'>{errors.date}</span> : ''
                                }
                            </div>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Số điện thoại<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    value={dataInput.phone}
                                    onChange={e => {
                                        setDataInput({
                                            ...dataInput,
                                            phone: e.target.value
                                        })
                                        setErrors({
                                            ...errors,
                                            phone: ''
                                        })
                                    }}
                                />
                                {
                                    errors && errors.phone ? <span className='error'>{errors.phone}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Email<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập email"
                                    value={dataInput.email}
                                    onChange={e => {
                                        setDataInput({
                                            ...dataInput,
                                            email: e.target.value
                                        })
                                        setErrors({
                                            ...errors,
                                            email: ''
                                        })
                                    }}
                                />
                                {
                                    errors && errors.email ? <span className='error'>{errors.email}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Mật khẩu<span className='text-danger'>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={dataInput.password}
                                    onChange={e => {
                                        setDataInput({
                                            ...dataInput,
                                            password: e.target.value
                                        })
                                        setErrors({
                                            ...errors,
                                            password: ''
                                        })
                                    }}
                                />
                                {
                                    errors && errors.password ? <span className='error'>{errors.password}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Quyền<span className='text-danger'>*</span></Form.Label>
                                <Select
                                    placeholder='Chọn quyền'
                                    // value={selectRole}
                                    onChange={handleOnchangeRole}
                                    options={listRoles}
                                />
                                {
                                    errors && errors.role ? <span className='error'>{errors.role}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Địa chỉ<span className='text-danger'>*</span></Form.Label>
                                <Select
                                    placeholder="Chọn địa chỉ"
                                    // value={selectProvine}
                                    onChange={handleOnchangeAddress}
                                    options={listProvinces}
                                />
                                {
                                    errors && errors.provine ? <span className='error'>{errors.provine}</span> : ''
                                }
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                <Form.Label className='text-muted fw-500'>Giới tính<span className='text-danger'>*</span></Form.Label>
                                <Select
                                    placeholder='Chọn giới tính'
                                    // value={selectGender}
                                    onChange={handleOnchangeGender}
                                    options={listGenders}
                                />
                                {
                                    errors && errors.gender ? <span className='error'>{errors.gender}</span> : ''
                                }
                            </Form.Group>
                        </div>
                        <button
                            className="btn btn-root text-white fw-500"
                            onClick={handleCreateNewUser}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Tạo mới
                        </button>
                    </div>

                    <TableUser pathPage={path.MANAGE_USER_CREATE} />
                </div>
            </div>
        </>

    );
}

const mapStateToProps = state => {
    return {
        roles: state.user.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
