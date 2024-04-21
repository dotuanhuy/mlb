import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { faBell, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.scss'
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import OutsideAlerter from '../../../../utils/OutSide';
import * as actions from '../../../../store/actions'
import { path } from '../../../../utils';
import Notification from '../../Bells/Notification';

function Navbar({
    fetLogoutRedux
}) {
    const accessToken = window.localStorage.getItem('accessToken')
    const navigate = useNavigate()
    const [nameUser, setNameUser] = useState('')
    const [active, setActive] = useState({
        user: false
    })

    useEffect(() => {
        if (accessToken) {
            let user = jwtDecode(accessToken)
            setNameUser(user?.firstName +' '+ user?.lastName)
        }
    }, [])

    const handleDropDownUser = () => {
        setActive(prev => {
            active.user = !active.user
            return {
                ...prev
            }
        })
    }

    const handleDrop = () => {
        setActive({
            user: false
        })
    }

    const handleLogout = async () => {
        fetLogoutRedux()
        navigate(path.HOMEPAGE)
    }

    return (
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a 
                class="navbar-brand col-md-3 col-lg-2 me-0 px-3" 
                href="#"
            >
                MLB
            </a>
            <div className='col-2'>
                <input class="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search"/>
            </div>
            <div class="d-flex align-items-center gap-1 py-2">
                <Notification />
                <div class="nav-item text-nowrap position-relative">
                    <OutsideAlerter handleDrop={handleDrop}>
                        <button 
                            className='btn'
                            onClick={handleDropDownUser}
                        >
                            <FontAwesomeIcon className='border rounded-circle text-white p-2' icon={faUser} />
                        </button>
                        <ul 
                            className={active.user ? 'dropdown-menu position-absolute text-white d-block' : 'dropdown-menu position-absolute text-white'}
                            style={{ 
                                right: '10px'
                            }}
                        >
                            <li className='dropdown-item'>{nameUser}</li>
                            <li 
                                className='dropdown-item fw-500 pe-auto' 
                                style={{ cursor: 'pointer' }}
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon className='me-1' icon={faRightFromBracket} />
                                Logout
                            </li>
                        </ul>
                    </OutsideAlerter>
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetLogoutRedux: () => dispatch(actions.fetLogout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
