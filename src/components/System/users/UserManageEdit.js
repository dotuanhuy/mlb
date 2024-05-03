import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { BuildOptionSelectSame, BuildOptionSelect } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

function UserManageEdit() {
    const dispatch = useDispatch()
    const { users, provinces, roles, isLoading } = useSelector(state => state.user)
    const [dataInput, setDataInput] = useState({})
    const [selectProvine, setSelectProvince] = useState({})
    const [selectGender, setSelectGender] = useState({})
    const [selectRole, setSelectRole] = useState({})
    const [listProvinces, setListProvinces] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listRoles, setListRoles] = useState([])    
    const navigate = useNavigate()
    const [params] = useSearchParams()

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
            firstName: dataInput.firstName,
            lastName: dataInput.lastName,
            phone: dataInput.phone,
            address: selectProvine.label,
            gender: selectGender.value,
            roleId: selectRole.value,
            avatar: ''
        }
        if (params.get('page')) {
            dispatch(actions.updateUser(newUser, params.get('id'), params.get('page')))
            navigate(
                {
                    pathname: path.MANAGE_USER, 
                    search: createSearchParams({page: params.get('page') ? params.get('page') : 1}).toString(),
                }
            )
        }
        else {
            dispatch(actions.updateUser(newUser, params.get('id')))
            navigate({
                pathname: path.MANAGE_USER_DETAIL,
                search: createSearchParams({ id: users?.id }).toString()
            })
        }
    }


    return (
        <>
            <Navbar />
            <div className='row gx-0'>
            <div className='col-2'>
                    <Sidebar active={'user'}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between'>
                        <h2>Chỉnh sửa người dùng</h2>
                    </div>
                    <hr/>
                    {
                        isLoading ? 
                        <Loading />
                        :
                        <div className='user-manage'>
                            <div className='user-manage-container'>
                                <div className='user-manage-form mx-2 my-4'>
                                    <form>
                                        <div className='form row'>
                                            <div className="mb-3 col-4">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Email<span className='text-danger'>*</span></label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    value={dataInput.email}
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-3 col-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu<span className='text-danger'>*</span></label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="exampleInputPassword1" 
                                                    value={dataInput.password}
                                                    disabled
                                                />
                                            </div>
                                            <div className="mb-3 col-4">
                                                <label htmlFor="exampleInputFirstName" className="form-label">Họ<span className='text-danger'>*</span></label>
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
                                                <label htmlFor="exampleInputLastName" className="form-label">Tên<span className='text-danger'>*</span></label>
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
                                                <label htmlFor="exampleInputphone" className="form-label">Số điện thoại<span className='text-danger'>*</span></label>
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
                                                <label className="form-label">Địa chỉ<span className='text-danger'>*</span></label>
                                                <Select
                                                    onChange={handleOnchangeAddress}
                                                    value={selectProvine}
                                                    options={listProvinces}
                                                />
                                            </div>
                                            <div className="mb-3 col-4">
                                                <label className="form-label">Giới tính<span className='text-danger'>*</span></label>
                                                <Select
                                                    value={selectGender}
                                                    onChange={handleOnchangeGender}
                                                    options={listGenders}
                                                />
                                            </div>
                                            <div className="mb-3 col-4">
                                                <label className="form-label">Quyền<span className='text-danger'>*</span></label>
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
                                            <FontAwesomeIcon icon={faBookmark} /> Lưu
                                        </button>
                                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManageEdit);
