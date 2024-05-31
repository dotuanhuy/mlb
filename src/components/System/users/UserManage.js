import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import TableUser from './TableUser';
import { path } from '../../../utils';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, InputGroup } from 'react-bootstrap';

function UserManage() {

    useEffect(() => {
        document.title = 'Quản lý người dùng'
    }, [])

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
                        <div className='col-6'>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Recipient's username"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Button
                                </Button>
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
                    <TableUser pathPage={path.MANAGE_USER} />
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
