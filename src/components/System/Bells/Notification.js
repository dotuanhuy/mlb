import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { formatDateTimeVN, path } from '../../../utils';
import avatart_male_none from '../../../assets/avatar/avatar_male_none.jpg'
import { Link } from 'react-router-dom';

function Notification() {
    const dispatch = useDispatch()
    const { notifications } = useSelector(state => state.notification)
    const [show, setShow] = useState(false) 

    useEffect(() => {
        dispatch(actions.getNotifications())
    }, [])

    return (
        <div className='nav-item position-relative' onClick={() => setShow(!show)}>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} className='border rounded-circle text-white p-2' icon={faBell} />
            <div 
                className='bg-danger rounded-circle text-center position-absolute' 
                style={{ 
                    width: '25px', 
                    height: '25px',
                    top: '-13px',
                    right: '-13px'
                }}
            >
                <span className='fs-12 text-white'>2</span>
            </div>
            {
                show ?
                    <div
                        className='position-absolute z-index-1000'
                        style={{
                            right: '-16px',
                            top: '40px'
                        }}
                    >
                        <div className='rounded bg-dark overflow-auto custom-scroll'
                            style={{
                                maxHeight: 'calc(100vh - 80px)',
                                width: '350px',
                            }}
                        >
                            <div className='text-white ps-2 fs-4 fw-500 mb-3 mt-2'>Thông báo</div>
                            {
                                notifications && notifications.length > 0 &&
                                notifications.map((item, index) => {
                                    return (
                                        <Link 
                                            className='p-2 d-flex gap-1 mb-1' 
                                            style={{ cursor: 'pointer' }} 
                                            key={index}
                                            to={item?.typeText === 'order' ? `${path.MANAGE_ORDER_DETAIL}?id=${item?.typeId}` : ''}
                                        >
                                            <div className='col-2 pe-0'>
                                                {
                                                    item?.avatar ? 
                                                    <img src={item?.avatar} className='rounded-circle w-100' height='54px' />
                                                    :
                                                    <img src={avatart_male_none} className='rounded-circle w-100' height='54px' />
                                                }
                                            </div>
                                            <div className={item?.isRead ? 'col-10 text-secondary' : 'col-10 text-white'}>
                                                <p className='text-break fs-14 line-limit-3 mb-0'>
                                                    {item?.content}
                                                </p>
                                                <span className='fs-12'>{formatDateTimeVN(item?.createdAt)}</span>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    : ''
            }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
