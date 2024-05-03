import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { BACKEND_URL, formatDateTimeVN, path } from '../../../utils';
import avatart_male_none from '../../../assets/avatar/avatar_male_none.jpg'
import { Link } from 'react-router-dom';
import io from 'socket.io-client';


function Notification() {
    const dispatch = useDispatch()
    const { notifications } = useSelector(state => state.notification)
    const [show, setShow] = useState(false)
    const [totalUnread, setTotalUnread] = useState(0)
    const [socket, setSocket] = useState()

    useEffect(() => {
        dispatch(actions.getNotifications())
        const accessToken = window.localStorage.getItem('accessToken')
        const newSocket = io(BACKEND_URL, { autoConnect: true, auth: { token: accessToken } }); // Địa chỉ server
        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('receive_notification', ({ typeText }) => {
                if (typeText) {
                    dispatch(actions.getNotifications())
                    const totalNotifivations = window.localStorage.getItem('notifications')
                    window.localStorage.setItem('notifications', +totalNotifivations + 1)
                    setTotalUnread(window.localStorage.getItem('notifications'))
                }
            })
        }
    }, [socket])

    return (
        <div className='nav-item position-relative' onClick={() => {
            setShow(!show)
            window.localStorage.setItem('notifications', 0)
            setTotalUnread(0)
        }}>
            <FontAwesomeIcon style={{ cursor: 'pointer' }} className='border rounded-circle text-white p-2' icon={faBell} />
            {
                totalUnread === 0 ? '' : 
                <div
                    className='bg-danger rounded-circle text-center position-absolute'
                    style={{
                        width: '25px',
                        height: '25px',
                        top: '-13px',
                        right: '-13px'
                    }}
                >
                    <span className='fs-12 text-white'>{totalUnread}</span>

                </div>
            }
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
                                            className='p-2 d-flex gap-2 mb-1'
                                            style={{ cursor: 'pointer' }}
                                            key={index}
                                            to={item?.typeText === 'order' ? `${path.MANAGE_ORDER_DETAIL}?id=${item?.typeId}` : ''}
                                            state={{ 
                                                notificationId: item?.id
                                            }}
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
