import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import { useLocation, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import Loading from '../../Loading/Loading';

function EditUser({
    accessToken, 
    users, 
    provinces, 
    genders, 
    roles, 
    isLoading, 
    refreshIsloadingStateRedux, 
    fetchUserAllcodeRedux, 
    fetchAllProvincesRedux, 
    fetchAllCodeByTypeRedux, 
    updateUserRedux
}) {
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
        refreshIsloadingStateRedux()
        fetchAllProvincesRedux(accessToken)
        fetchAllCodeByTypeRedux('GENDER')
        fetchAllCodeByTypeRedux('ROLE')
        fetchUserAllcodeRedux(state.id, accessToken)
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
            value: users.dataGender ? users.dataGender.keyMap : ''
        })
        setSelectRole({
            label: users.dataRole ? users.dataRole.valueVi : '',
            value: users.dataRole ? users.dataRole.keyMap : ''
        })
        setListProvinces(dataProvinces)
        setListGenders(dataGenders)
        setListRoles(dataRole)
    }, [users, provinces, genders, roles])

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
        let newUser = {
            id: dataInput.id,
            email: dataInput.email,
            firstName: dataInput.firstName,
            lastName: dataInput.lastName,
            phoneNumber: dataInput.phoneNumber,
            address: selectProvine.label,
            gender: selectGender.value,
            roleId: selectRole.value,
            avatar: ''
        }
        updateUserRedux(newUser, accessToken, state.pageCurrent)
        navigate(path.MANAGE)
    }

    return (
        <>
            {
                isLoading ? 
                <Loading />
                :
                <div className='user-manage'>
                    <div className='user-manage-container'>
                        <Nav />
                        <div className='user-manage-title m-3'>
                            Sửa người dùng
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
                                        />
                                    </div>
                                    <div className="mb-3 col-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="exampleInputPassword1" 
                                            value={dataInput.password}
                                            disabled
                                        />
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
                                        />
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
                                        />
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
                                        />
                                    </div>
                                    <div className="mb-3 col-3">
                                        <label className="form-label">Address</label>
                                        <Select
                                            onChange={handleOnchangeAddress}
                                            value={selectProvine}
                                            options={listProvinces}
                                        />
                                    </div>
                                    <div className="mb-3 col-3">
                                        <label className="form-label">Gender</label>
                                        <Select
                                            value={selectGender}
                                            onChange={handleOnchangeGender}
                                            options={listGenders}
                                        />
                                    </div>
                                    <div className="mb-3 col-3">
                                        <label className="form-label">Role</label>
                                        <Select
                                            value={selectRole}
                                            onChange={handleOnchangeRole}
                                            options={listRoles}
                                        />
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    onClick={(e) => handleUpdateUser(e)}
                                >
                                    Lưu
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        accessToken: state.auth.token,
        users: state.user.users,
        provinces: state.user.provinces,
        genders: state.user.genders,
        roles: state.user.roles,
        isLoading: state.user.isLoadingUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvincesRedux: (accessToken) => dispatch(actions.fetchAllProvinces(accessToken)),
        fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByType(type)),
        updateUserRedux: (data, accessToken, page) =>  dispatch(actions.updateUser(data, accessToken, page)),
        fetchUserAllcodeRedux: (id, accessToken) => dispatch(actions.fetchUserAllcode(id, accessToken)),
        refreshIsloadingStateRedux: () => dispatch(actions.refreshIsloadingState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
