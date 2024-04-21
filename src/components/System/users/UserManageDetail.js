import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import avatart_male_none from '../../../assets/avatar/avatar_male_none.jpg'
import * as actions from '../../../store/actions'
import { formatDateVN } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

function UserManageDetail() {
    const dispatch = useDispatch()
    const {users, isLoading} = useSelector(state => state.user)
    const navigate = useNavigate()   
    const [params] = useSearchParams()

    useEffect(() => {
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
                            <Sidebar active={'user'}/>
                        </div> 
                        <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                            <div className='d-flex justify-content-between'>
                                <h2>User detail</h2>
                            </div>
                            <hr/>
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
                                        <span className='fs-6 fw-500 text-muted'>Full name: <span className='text-black'>{users?.firstName} {users?.lastName}</span></span>    
                                    </div>
                                    <div className='mb-2'>
                                        <span className='fs-6 fw-500 '>Email: <span className='text-black'>{users?.email}</span></span>
                                    </div>
                                    <div className='mb-2'>
                                        <span className='fs-6 fw-500'>Phone: <span className='text-black'>{users?.phone}</span></span>
                                    </div>
                                    <div className='mb-2'>
                                        <span className='fs-6 fw-500'>Address: <span className='text-black'>{users?.address}</span></span>
                                    </div>
                                    <div className='mb-2'>
                                        <span className='fs-6 fw-500'>Gender: <span className='text-black'>{users?.gender}</span></span>
                                    </div>
                                    <div className='mb-2'>
                                        <span className='fs-6 fw-500'>Role: <span className='text-black'>{users?.dataRole?.name}</span></span>
                                    </div>
                                    <div className='mb-2'>
                                        <span className='fs-6 fw-500'>Create at: <span className='text-black'>{formatDateVN(users?.createdAt)}</span></span>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <button className='btn btn-root btn-add me-2'>
                                    <Link 
                                        className='text-white fw-500' 
                                        to={path.MANAGE_USER}
                                    >
                                        <FontAwesomeIcon className='pe-2' icon={faBackward} />
                                        Back
                                    </Link>
                                </button>
                                <button 
                                    className='btn btn-root-2 btn-add fw-500'
                                    onClick={() => handleEdit(users)}
                                >
                                    <FontAwesomeIcon className='pe-2' icon={faPenToSquare} />
                                    Edit user
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
