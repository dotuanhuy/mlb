import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { path, Role } from '../../../utils';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';

function UserManageEdit({
    accessToken, 
    users, 
    provinces, 
    roles, 
    isLoading, 
    refreshIsloadingStateRedux, 
    getUserByIdRedux, 
    getAllAddressRedux, 
    getAllRolesRedux,
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
    
    // ComponentDidMount
    useEffect(() => {
        refreshIsloadingStateRedux()
        getAllAddressRedux(accessToken)
        getAllRolesRedux(accessToken)
        getUserByIdRedux(state.id, accessToken)
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
        setDataInput(users)
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
    }, [users, provinces, roles])
    
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
            phone: dataInput.phone,
            address: selectProvine.label,
            gender: selectGender.value,
            roleId: selectRole.value,
            avatar: ''
        }
        if (state?.pageCurrent) {
            updateUserRedux(newUser, accessToken, state?.pageCurrent)
            navigate(path.MANAGE_USER)
        }
        else {
            updateUserRedux(newUser, accessToken)
            navigate(path.MANAGE_USER_DETAIL, { state: { userId: users?.id } })
        }
    }


    return (
        <>
            {
                isLoading ? 
                <Loading />
                :
                <>
                    <Navbar />
                    <div className='row gx-0'>
                    <div className='col-2'>
                            <Sidebar active={'user'}/>
                        </div> 
                        <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                            <div className='d-flex justify-content-between'>
                                <h2>Update user</h2>
                            </div>
                            <hr/>

                            <div className='user-manage'>
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
                                                    />
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                                    <input 
                                                        type="password" 
                                                        className="form-control" 
                                                        id="exampleInputPassword1" 
                                                        value={dataInput.password}
                                                        disabled
                                                    />
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
                                                    />
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
                                                    />
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
                                                    />
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <label className="form-label">Address</label>
                                                    <Select
                                                        onChange={handleOnchangeAddress}
                                                        value={selectProvine}
                                                        options={listProvinces}
                                                    />
                                                </div>
                                                <div className="mb-3 col-4">
                                                    <label className="form-label">Gender</label>
                                                    <Select
                                                        value={selectGender}
                                                        onChange={handleOnchangeGender}
                                                        options={listGenders}
                                                    />
                                                </div>
                                                <div className="mb-3 col-4">
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
                                                className="btn btn-root text-white fw-500"
                                                onClick={(e) => handleUpdateUser(e)}
                                            >
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
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
        roles: state.user.roles,
        isLoading: state.user.isLoadingUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllAddressRedux: (accessToken) => dispatch(actions.getAllAddress(accessToken)),
        getAllRolesRedux: (accessToken) => dispatch(actions.getAllRoles(accessToken)),
        updateUserRedux: (data, accessToken, page) =>  dispatch(actions.updateUser(data, accessToken, page)),
        getUserByIdRedux: (id, accessToken) => dispatch(actions.getUserById(id, accessToken)),
        refreshIsloadingStateRedux: () => dispatch(actions.refreshIsloadingState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManageEdit);
