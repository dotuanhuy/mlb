import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/loading/Loading';
import Navbar from '../../../components/server/navbar/Navbar';
import Sidebar from '../../../components/server/sidebars/Sidebar';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import avatart_male_none from '../../../assets/avatar/avatar_male_none.jpg'
import * as actions from '../../../store/actions'
import { formatDateVN } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function UserManageDetail() {
    const dispatch = useDispatch()
    const { users, isLoading } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [params] = useSearchParams()

    useEffect(() => {
        document.title = 'Chi tiết người dùng'
        dispatch(actions.getUserById(params.get('id')))
    }, [])

    const handleEdit = (user) => {
        navigate(
            {
                pathname: path.MANAGE_USER_EDIT,
                search: createSearchParams({
                    id: user.id,
                    page: params.get('page')
                }).toString()
            }
        )
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
                                <Sidebar active={'user'} />
                            </div>
                            <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                                <div className='d-flex justify-content-between'>
                                    <h2>Chi tiết người dùng</h2>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-4'>
                                        {
                                            users?.avatar ? ''
                                                :
                                                <img className='rounded' src={avatart_male_none} width='100%' />
                                        }
                                    </div>
                                    <div className='col-8 text-muted border rounded'>
                                        <div className='my-2'>
                                            <span className='fs-6 fw-500 text-muted'>Họ và tên: <span className='text-black'>{users?.firstName} {users?.lastName}</span></span>
                                        </div>
                                        <div className='mb-2'>
                                            <span className='fs-6 fw-500 '>Email: <span className='text-black'>{users?.email}</span></span>
                                        </div>
                                        <div className='mb-2'>
                                            <span className='fs-6 fw-500'>Số điện thoại: <span className='text-black'>{users?.phone}</span></span>
                                        </div>
                                        <div className='mb-2'>
                                            <span className='fs-6 fw-500'>Địa chỉ: <span className='text-black'>{users?.address}</span></span>
                                        </div>
                                        <div className='mb-2'>
                                            <span className='fs-6 fw-500'>Giới tính: <span className='text-black'>{users?.gender}</span></span>
                                        </div>
                                        <div className='mb-2'>
                                            <span className='fs-6 fw-500'>Quyền: <span className='text-black'>{users?.dataRole?.name}</span></span>
                                        </div>
                                        <div className='mb-2'>
                                            <span className='fs-6 fw-500'>Ngày khởi tạo: <span className='text-black'>{formatDateVN(users?.createdAt)}</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <button className='btn btn-root btn-add me-2'>
                                        <Link
                                            className='text-white fw-500'
                                            to={path.MANAGE_USER}
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
                                        </Link>
                                    </button>
                                    <button
                                        className='btn btn-root-2 btn-add fw-500'
                                        onClick={() => handleEdit(users)}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} /> Chỉnh sửa người dùng
                                    </button>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManageDetail);
