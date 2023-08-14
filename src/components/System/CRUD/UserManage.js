import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav';
import Select from 'react-select';
import './UserManage.scss'
import * as actions from '../../../store/actions'
import TableUser from '../TableUsers/TableUser';

const initState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
}

function UserManage({provinces, genders, roles, fetchAllProvincesRedux, fetchAllCodeByTypeRedux, createNewUserRedux}) {
    const [dataInput, setDataInput] = useState(initState)
    const [selectProvine, setSelectProvince] = useState([])
    const [selectGender, setSelectGender] = useState([])
    const [selectRole, setSelectRole] = useState([])
    const [listProvinces, setListProvinces] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listRoles, setListRoles] = useState([])


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
        fetchAllProvincesRedux()
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
        setSelectProvince(selectProvine)
    }
    
    const handleOnchangeGender = (selectGender) => {
        setSelectGender(selectGender)
    }

    const handleOnchangeRole = (selectRole) => {
        setSelectRole(selectRole)
    }

    const handleCreateNewUser = (e) => {
        e.preventDefault()
        createNewUserRedux({
            email: dataInput.email,
            password: dataInput.password,
            firstName: dataInput.firstName,
            lastName: dataInput.lastName,
            phoneNumber: dataInput.phoneNumber,
            address: selectProvine.label,
            gender: selectGender.value,
            roleId: selectRole.value,
            avatar: ''
        })
        setDataInput(initState)
    }

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
                                    onChange={(e) => setDataInput({
                                        ...dataInput,
                                        password: e.target.value
                                    })}
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
                                    options={listProvinces}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label class="form-label">Gender</label>
                                <Select
                                    defaultValue={selectGender}
                                    onChange={handleOnchangeGender}
                                    options={listGenders}
                                />
                            </div>
                            <div class="mb-3 col-3">
                                <label class="form-label">Role</label>
                                <Select
                                    defaultValue={selectRole}
                                    onChange={handleOnchangeRole}
                                    options={listRoles}
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                            onClick={(e) => handleCreateNewUser(e)}
                        >
                            Tạo
                        </button>
                    </form>
                </div>
                <div className='user-manage-table'>
                    <TableUser />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        provinces: state.provinces,
        genders: state.genders,
        roles: state.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProvincesRedux: () => dispatch(actions.fetchAllProvinces()),
        fetchAllCodeByTypeRedux: (type) => dispatch(actions.fetchAllCodeByType(type)),
        createNewUserRedux: (data) =>  dispatch(actions.createNewUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
