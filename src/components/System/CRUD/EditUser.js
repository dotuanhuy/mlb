import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import { useLocation, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

function EditUser({isLogout, users, provinces, genders, roles, fetchUserAllcodeRedux, fetchAllProvincesRedux, fetchAllCodeByTypeRedux, updateUserRedux}) {
    const { state } = useLocation()
    const [dataInput, setDataInput] = useState([])
    const [selectProvine, setSelectProvince] = useState({})
    const [selectGender, setSelectGender] = useState({})
    const [selectRole, setSelectRole] = useState({})
    const [listProvinces, setListProvinces] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listRoles, setListRoles] = useState([])

    const navigate = useNavigate()

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
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
        else {
            let token = cookies.get('userLogin')
            let loginInfor = jwt_decode(token)
            if (loginInfor.role === Role.USER) {
                navigate(path.HOMEPAGE)
            }
        }
        fetchAllProvincesRedux()
        fetchAllCodeByTypeRedux('GENDER')
        fetchAllCodeByTypeRedux('ROLE')
        fetchUserAllcodeRedux(state)
    }, [])
    
    
    // ComponentDidUpdate
    useEffect(() => {
        let dataProvinces = buildDataSelect(provinces)
        let dataGenders = buildDataSelect(genders)
        let dataRole = buildDataSelect(roles)
        setDataInput(users)
        setSelectProvince({
            label: users.Province ? users.Province.nameVi : '',
            value: users.Province ? users.Province.id : ''
        })
        setSelectGender({
            label: users.dataGender ? users.dataGender.valueVi : '',
            value: users.dataGender ? users.dataGender.id : ''
        })
        setSelectRole({
            label: users.dataRole ? users.dataRole.valueVi : '',
            value: users.dataRole ? users.dataRole.id : ''
        })
        setListProvinces(dataProvinces)
        setListGenders(dataGenders)
        setListRoles(dataRole)
    }, [users, provinces, genders, roles])

    useEffect(() => {
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
    }, [isLogout])

    const handleOnchangeAddress = (selectProvine) => {
        setSelectProvince(selectProvine)
    }
    
    const handleOnchangeGender = (selectGender) => {
        setSelectGender(selectGender)
    }

    const handleOnchangeRole = (selectRole) => {
        setSelectRole(selectRole)
    }

    const handleUpdateUser = (e) => {
        e.preventDefault()
        updateUserRedux({
            id: dataInput.id,
            email: dataInput.email,
            firstName: dataInput.firstName,
            lastName: dataInput.lastName,
            phoneNumber: dataInput.phoneNumber,
            address: selectProvine.label,
            gender: selectGender.value,
            roleId: selectRole.value,
            avatar: ''
        })
        // navigate(path.MANAGE)
    }

    return (
        <div className='user-manage'>
            <div className='user-manage-container'>
                <Nav />
                <div className='user-manage-title m-3'>
                    Sửa người dùng
                </div>
                <div className='user-manage-form mx-2 my-4'>
                    <form>
                        <div className='form row'>
                            <div class="mb-3 col-3">
                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                <input 
                                    type="email" 
                                    class="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    value={dataInput.email}
                                    onChange={(e) => setDataInput({
                                        ...dataInput,
                                        email: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    id="exampleInputPassword1" 
                                    value={dataInput.password}
                                    disabled
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label for="exampleInputFirstName" class="form-label">First name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputFirstName" 
                                    value={dataInput.firstName}
                                    onChange={(e) => setDataInput({
                                        ...dataInput,
                                        firstName: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label for="exampleInputLastName" class="form-label">Last name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputLastName" 
                                    value={dataInput.lastName}
                                    onChange={(e) => setDataInput({
                                        ...dataInput,
                                        lastName: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label for="exampleInputPhoneNumber" class="form-label">Phone number</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputPhoneNumber" 
                                    value={dataInput.phoneNumber}
                                    onChange={(e) => setDataInput({
                                        ...dataInput,
                                        phoneNumber: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label class="form-label">Address</label>
                                <Select
                                    defaultValue={selectProvine}
                                    onChange={handleOnchangeAddress}
                                    value={selectProvine}
                                    options={listProvinces}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label class="form-label">Gender</label>
                                <Select
                                    defaultValue={selectGender}
                                    value={selectGender}
                                    onChange={handleOnchangeGender}
                                    options={listGenders}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label class="form-label">Role</label>
                                <Select
                                    defaultValue={selectRole}
                                    value={selectRole}
                                    onChange={handleOnchangeRole}
                                    options={listRoles}
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                            onClick={(e) => handleUpdateUser(e)}
                        >
                            Lưu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        users: state.user.users,
        provinces: state.user.provinces,
        genders: state.user.genders,
        roles: state.user.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvincesRedux: () => dispatch(actions.fetchAllProvinces()),
        fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByType(type)),
        updateUserRedux: (data) =>  dispatch(actions.updateUser(data)),
        fetchUserAllcodeRedux: (id) => dispatch(actions.fetchUserAllcode(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
