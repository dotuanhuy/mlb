import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import TableUser from './TableUser';
import { path } from '../../../utils';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Form, InputGroup } from 'react-bootstrap';
import * as actions from '../../../store/actions'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

let timerId

function UserManage() {
    const dispatch = useDispatch()
    const [params] = useSearchParams()
    const [textSearch, setTextSearch] = useState('')

    useEffect(() => {
        document.title = 'Quản lý người dùng'
    }, [])

    useEffect(() => {
        if (!textSearch) {
            dispatch(actions.getLimitUsers(params?.get('page') || 1))
        }
        else {
            searchAPI(1000, textSearch)
        }
    }, [textSearch])

    const searchAPI = (delay, userName) => {
        delay = delay || 0
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
        timerId = setTimeout(() => {
            dispatch(actions.searchUser(userName, params.get('page') || 1))
        }, delay)
    }

    const handleClearTextSearch = () => {
        setTextSearch('')
    }

    return (
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active={'user'} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <h2>Quản lý người dùng</h2>
                    <div className='d-flex justify-content-end gap-3'>
                        <div className='col-5'>
                            <InputGroup>
                                <InputGroup.Text><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
                                <Form.Control
                                    value={textSearch}
                                    className='rounded-end position-relative'
                                    placeholder={`Nhập tên người dùng`}
                                    aria-label={`Nhập tên người dùng`}
                                    aria-describedby="basic-addon2"
                                    onChange={e => setTextSearch(e.target.value.trim())}
                                />
                                {
                                    textSearch ?
                                        <FontAwesomeIcon
                                            className='position-absolute'
                                            style={{
                                                cursor: 'pointer',
                                                zIndex: '10',
                                                right: '6px',
                                                top: '10px'
                                            }}
                                            onClick={handleClearTextSearch}
                                            icon={faCircleXmark}
                                        /> : ''
                                }

                            </InputGroup>
                        </div>
                        <Link
                            className='btn btn-root d-flex align-items-center text-white fw-500'
                            to={path.MANAGE_USER_CREATE}
                        >
                            <FontAwesomeIcon icon={faPlus} className='pe-1' />
                            Thêm mới
                        </Link>
                    </div>
                    <hr />
                    <TableUser textSearch={textSearch} pathPage={path.MANAGE_USER} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
