import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import Loading from '../../../components/loading/Loading';
import Navbar from '../../../components/server/navbar/Navbar';
import Sidebar from '../../../components/server/sidebars/Sidebar';
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { validate, validateRequire } from '../../../validate/valiedate';
import DatePicker from "react-datepicker";
import moment from 'moment';

const initDataInput = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
}

function EditUser() {
    const dispatch = useDispatch()
    const { users, provinces, roles, isLoading, message, errCode } = useSelector(state => state.user)
    const [dataInput, setDataInput] = useState(initDataInput)
    const [selectProvine, setSelectProvince] = useState({})
    const [selectGender, setSelectGender] = useState({})
    const [selectRole, setSelectRole] = useState({})
    const [selectBirthDate, setSelectBirthDate] = useState('')
    const [listProvinces, setListProvinces] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listRoles, setListRoles] = useState([])
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [errors, setErrors] = useState({})

    // ComponentDidMount
    useEffect(() => {
        document.title = 'Chỉnh sửa người dùng'
        dispatch(actions.refreshIsloadingState())
        dispatch(actions.getAllAddress())
        dispatch(actions.getAllRoles())
        dispatch(actions.getUserById(params.get('id')))
    }, [])

    // ComponentDidUpdate
    useEffect(() => {
        const dataProvinces = BuildOptionSelectSame(provinces)
        const dataGenders = [
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
        const dataRole = BuildOptionSelect(roles)
        setDataInput({
            email: users?.email,
            firstName: users?.firstName,
            lastName: users?.lastName,
            phone: users?.phone
        })
        setSelectProvince({
            label: users?.address ? users.address : '',
            value: users?.address ? users.address : ''
        })
        setSelectGender({
            label: users?.gender ? users.gender : '',
            value: users?.gender ? users.gender : ''
        })
        setSelectRole({
            label: users?.dataRole?.name ? users.dataRole?.name : '',
            value: users?.dataRole?.id ? users.dataRole?.id : ''
        })
        setListProvinces(dataProvinces)
        setListGenders(dataGenders)
        setListRoles(dataRole)
        setSelectBirthDate(users?.birthDate)
    }, [users, provinces, roles])

    useEffect(() => {
        if (message) {
            if (errCode === 0) {
                navigate(
                    {
                        pathname: path.MANAGE_USER,
                        search: createSearchParams({ page: params.get('page') || 1 }).toString(),
                    }
                )
            }
            else {
                dispatch(actions.refreshInfoResponse())
            }
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

    const handleUpdateUser = () => {
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
                id: dataInput.id,
                firstName: dataInput.firstName,
                lastName: dataInput.lastName,
                phone: dataInput.phone,
                address: selectProvine.label,
                gender: selectGender.value,
                roleId: selectRole.value,
                avatar: '',
                birthDate: selectBirthDate
            }
            dispatch(actions.updateUser(newUser, params.get('id'), params.get('page') || 1))
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
                    <div className='d-flex justify-content-between'>
                        <h2>Chỉnh sửa người dùng</h2>
                    </div>
                    <hr />
                    {
                        isLoading ?
                            <Loading />
                            :
                            <div className='user-manage'>
                                <div className='user-manage-container'>
                                    <div className='user-manage-form mx-2 my-4'>
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
                                                    selected={moment(selectBirthDate).toDate()}
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
                                                <Form.Label className='text-muted fw-500'>Quyền<span className='text-danger'>*</span></Form.Label>
                                                <Select
                                                    placeholder='Chọn quyền'
                                                    value={selectRole}
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
                                                    value={selectProvine}
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
                                                    value={selectGender}
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
                                            onClick={handleUpdateUser}
                                        >
                                            <FontAwesomeIcon icon={faBookmark} /> Lưu
                                        </button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
