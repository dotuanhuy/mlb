import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import TableUser from '../TableUsers/TableUser';
import { useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import { validate, validateSelect } from '../../../validate/valiedate';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';

const initState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
}

function UserManageCreate({
    accessToken, 
    provinces, 
    roles, 
    getAllAddressRedux, 
    getAllRolesRedux, 
    createNewUserRedux
}) {
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
        getAllAddressRedux(accessToken)
        getAllRolesRedux(accessToken)
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
            createNewUserRedux(user, accessToken, params.get('page') ? params.get('page') : 1)
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
                    <Sidebar active={'user'}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <h2>Create new user</h2>
                    <hr/>
                    <div className='user-manage mb-5'>
                        <div className='user-manage-container'>
                            <div className='user-manage-form mx-2 my-4'>
                                <form>
                                    <div className='form row'>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                id="exampleInputEmail1" 
                                                aria-describedby="emailHelp" 
                                                value={dataInput.email}
                                                onChange={(e) => setDataInput({
                                                    ...dataInput,
                                                    email: e.target.value
                                                })}
                                                // onBlur={(e) => handleOnBlur(e)}
                                            />
                                            {
                                                errors && errors.email ? <span className='error'>{errors.email}</span> : ''
                                            }
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                id="exampleInputPassword1" 
                                                value={dataInput.password}
                                                onChange={(e) => setDataInput({
                                                    ...dataInput,
                                                    password: e.target.value
                                                })}
                                                // onBlur={(e) => handleOnBlur(e)}
                                            />
                                            {
                                                errors && errors.password ? <span className='error'>{errors.password}</span> : ''
                                            }
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputFirstName" className="form-label">First name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputFirstName" 
                                                value={dataInput.firstName}
                                                onChange={(e) => setDataInput({
                                                    ...dataInput,
                                                    firstName: e.target.value
                                                })}
                                                // onBlur={(e) => handleOnBlur(e)}
                                            />
                                            {
                                                errors && errors.firstName ? <span className='error'>{errors.firstName}</span> : ''
                                            }
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputLastName" className="form-label">Last name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputLastName" 
                                                value={dataInput.lastName}
                                                onChange={(e) => setDataInput({
                                                    ...dataInput,
                                                    lastName: e.target.value
                                                })}
                                                // onBlur={(e) => handleOnBlur(e)}
                                            />
                                            {
                                                errors && errors.lastName ? <span className='error'>{errors.lastName}</span> : ''
                                            }
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputphone" className="form-label">Phone number</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputphone" 
                                                value={dataInput.phone}
                                                onChange={(e) => setDataInput({
                                                    ...dataInput,
                                                    phone: e.target.value
                                                })}
                                                // onBlur={(e) => handleOnBlur(e)}
                                            />
                                            {
                                                errors && errors.phone ? <span className='error'>{errors.phone}</span> : ''
                                            }
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label className="form-label">Address</label>
                                            <Select
                                                value={selectProvine}
                                                onChange={handleOnchangeAddress}
                                                options={listProvinces}
                                            />
                                            {
                                                errorSelect && errorSelect.errorProvine ? <span className='error'>{errorSelect.errorProvine}</span> : ''
                                            }
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label className="form-label">Gender</label>
                                            <Select
                                                value={selectGender}
                                                onChange={handleOnchangeGender}
                                                options={listGenders}
                                            />     
                                            {
                                                errorSelect && errorSelect.errorGender ? <span className='error'>{errorSelect.errorGender}</span> : ''
                                            }                          
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label className="form-label">Role</label>
                                            <Select
                                                value={selectRole}
                                                onChange={handleOnchangeRole}
                                                options={listRoles}
                                            />
                                            {
                                                errorSelect && errorSelect.errorRole ? <span className='error'>{errorSelect.errorRole}</span> : ''
                                            }
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-root text-white fw-500"
                                        onClick={(e) => handleCreateNewUser(e)}
                                    >
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <TableUser pathPage={path.MANAGE_USER_CREATE}/>
                </div>
            </div>
        </>

    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        accessToken: state.auth.token,
        provinces: state.user.provinces,
        roles: state.user.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllAddressRedux: (accessToken) => dispatch(actions.getAllAddress(accessToken)),
        getAllRolesRedux: (accessToken) => dispatch(actions.getAllRoles(accessToken)),
        createNewUserRedux: (data, accessToken ,page) =>  dispatch(actions.createNewUser(data, accessToken, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManageCreate);
