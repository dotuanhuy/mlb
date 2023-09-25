import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import TableUser from '../TableUsers/TableUser';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { path, Role } from '../../../utils';
import { validate, validateSelect } from '../../../validate/valiedate';


const initState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
}

function UserManage({isLogin, accessToken, provinces, genders, roles, fetchAllProvincesRedux, fetchAllCodeByTypeRedux, createNewUserRedux}) {
    const [dataInput, setDataInput] = useState(initState)
    const [selectProvine, setSelectProvince] = useState([])
    const [selectGender, setSelectGender] = useState([])
    const [selectRole, setSelectRole] = useState([])
    const [listProvinces, setListProvinces] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listRoles, setListRoles] = useState([])
    const [errors, setErrors] = useState({})
    const [errorSelect, setErrorSelect] = useState({})
    const check = false
    const navigate = useNavigate()
    const [params] = useSearchParams() 

    const buildDataSelect = (inputData) => {
        let reslut = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {}
                if (item.nameVi) {
                    obj.label = item.nameVi
                }
                else {
                    obj.label = item.valueVi
                }
                if (item.keyMap) {
                    obj.value = item.keyMap
                }
                else {
                    obj.value = item.id
                }
                reslut.push(obj)
            })
        }
        return reslut
    }

    // ComponentDidMount
    useEffect(() => {

        fetchAllProvincesRedux(accessToken)
        fetchAllCodeByTypeRedux('GENDER')
        fetchAllCodeByTypeRedux('ROLE')
    }, [])
    
    
    // ComponentDidUpdate
    useEffect(() => {
        let dataProvinces = buildDataSelect(provinces)
        let dataGenders = buildDataSelect(genders)
        let dataRole = buildDataSelect(roles)
        setListProvinces(dataProvinces)
        setListGenders(dataGenders)
        setListRoles(dataRole)
    }, [provinces, genders, roles])

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
            phoneNumber: dataInput.phoneNumber,
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
        <div className='user-manage'>
            <div className='user-manage-container'>
                <Nav />
                <div className='user-manage-title m-3'>
                    Thêm Mới Người Dùng
                </div>
                <div className='user-manage-form mx-2 my-4'>
                    <form>
                        <div className='form row'>
                            <div className="mb-3 col-3">
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
                            <div className="mb-3 col-3">
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
                            <div className="mb-3 col-3">
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
                            <div className="mb-3 col-3">
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
                            <div className="mb-3 col-3">
                                <label htmlFor="exampleInputPhoneNumber" className="form-label">Phone number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputPhoneNumber" 
                                    value={dataInput.phoneNumber}
                                    onChange={(e) => setDataInput({
                                        ...dataInput,
                                        phoneNumber: e.target.value
                                    })}
                                    // onBlur={(e) => handleOnBlur(e)}
                                />
                                {
                                    errors && errors.phoneNumber ? <span className='error'>{errors.phoneNumber}</span> : ''
                                }
                            </div>
                            <div className="mb-3 col-3">
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
                            <div className="mb-3 col-3">
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
                            <div className="mb-3 col-3">
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
                            className="btn btn-primary"
                            onClick={(e) => handleCreateNewUser(e)}
                        >
                            Tạo
                        </button>
                    </form>
                </div>
                <div className='user-manage-table'>
                    <TableUser pathPage={path.MANAGE_CREATE}/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        accessToken: state.auth.token,
        provinces: state.user.provinces,
        genders: state.user.genders,
        roles: state.user.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvincesRedux: (accessToken) => dispatch(actions.fetchAllProvinces(accessToken)),
        fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByType(type)),
        createNewUserRedux: (data, accessToken ,page) =>  dispatch(actions.createNewUser(data, accessToken, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
