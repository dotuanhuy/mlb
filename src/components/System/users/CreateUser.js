import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import TableUser from './TableUser';
import { useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import { validate, validateSelect } from '../../../validate/valiedate';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';

const initState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
}

function CreateUser() {
    const dispatch = useDispatch()
    const { provinces, roles } = useSelector(state => state.user)
    const [dataInput, setDataInput] = useState(initState)
    const [selectProvine, setSelectProvince] = useState([])
    const [selectGender, setSelectGender] = useState([])
    const [selectRole, setSelectRole] = useState([])
    const [listProvinces, setListProvinces] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [errors, setErrors] = useState({})
    const [errorSelect, setErrorSelect] = useState({})
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

    const handleOnchangeAddress = (selectProvine) => {
        if (errorSelect && errorSelect.errorProvine) {
            setErrorSelect({
                ...errorSelect,
                errorProvine: ''
            })
        }
        setSelectProvince(selectProvine)
    }

    const handleOnchangeGender = (selectGender) => {
        if (errorSelect && errorSelect.errorGender) {
            setErrorSelect({
                ...errorSelect,
                errorGender: ''
            })
        }
        setSelectGender(selectGender)
    }

    const handleOnchangeRole = (selectRole) => {
        if (errorSelect && errorSelect.errorRole) {
            setErrorSelect({
                ...errorSelect,
                errorRole: ''
            })
        }
        setSelectRole(selectRole)
    }

    const handleCreateNewUser = (e) => {
        e.preventDefault()
        let error = validate(dataInput)
        let errorProvine = validateSelect(selectProvine)
        let errorGender = validateSelect(selectGender)
        let errorRole = validateSelect(selectRole)
        setErrors(error)
        setErrorSelect({
            errorProvine,
            errorGender,
            errorRole
        })
        let user = {
            email: dataInput.email,
            password: dataInput.password,
            firstName: dataInput.firstName,
            lastName: dataInput.lastName,
            phone: dataInput.phone,
            address: selectProvine.label,
            gender: selectGender.value,
            roleId: selectRole.value,
            avatar: ''
        }

        if (Object.keys(error).length === 0 && errorProvine === '' && errorGender === '' && errorRole === '') {
            dispatch(actions.createNewUser(user, params.get('page') ? params.get('page') : 1))
            setDataInput(initState)
            setSelectProvince([])
            setSelectGender([])
            setSelectRole([])
        }
    }

    useEffect(() => {
        setErrors({})
        setErrorSelect({})
    }, [dataInput, selectGender, selectProvine, selectRole])

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
                    <div className='user-manage mb-5'>
                        <div className='user-manage-container'>
                            <div className='user-manage-form mx-2 my-4'>
                                <form>
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
                                                type="text"
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
                                            <Form.Label className='text-muted fw-500'>Quyền<span className='text-danger'>*</span></Form.Label>
                                            <Select
                                                value={selectRole}
                                                onChange={handleOnchangeRole}
                                                options={listRoles}
                                            />
                                            {
                                                errorSelect && errorSelect.errorRole ? <span className='error'>{errorSelect.errorRole}</span> : ''
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                            <Form.Label className='text-muted fw-500'>Địa chỉ<span className='text-danger'>*</span></Form.Label>
                                            <Select
                                                value={selectProvine}
                                                onChange={handleOnchangeAddress}
                                                options={listProvinces}
                                            />
                                            {
                                                errorSelect && errorSelect.errorProvine ? <span className='error'>{errorSelect.errorProvine}</span> : ''
                                            }
                                        </Form.Group>
                                        <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                            <Form.Label className='text-muted fw-500'>Giới tính<span className='text-danger'>*</span></Form.Label>
                                            <Select
                                                value={selectGender}
                                                onChange={handleOnchangeGender}
                                                options={listGenders}
                                            />
                                            {
                                                errorSelect && errorSelect.errorGender ? <span className='error'>{errorSelect.errorGender}</span> : ''
                                            }
                                        </Form.Group>

                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-root text-white fw-500"
                                        onClick={(e) => handleCreateNewUser(e)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Tạo mới
                                    </button>
                                </form>
                            </div>
                        </div>
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
