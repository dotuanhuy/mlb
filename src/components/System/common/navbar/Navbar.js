import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { faBell, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom';
import OutsideAlerter from '../../../../utils/OutSide';
import { path } from '../../../../utils';
import Notification from '../../Bells/Notification';
import { AES, enc } from 'crypto-js';
import Cookies from 'js-cookie';

function Navbar() {
    const navigate = useNavigate()
    const [nameUser, setNameUser] = useState('')
    const [active, setActive] = useState({
        user: false
    })

    useEffect(() => {
        const infoUser = Cookies.get('info')
        if (!infoUser) {
            navigate(path.LOGIN)
        }
        else {
            const infoDecoded = JSON.parse(AES.decrypt(infoUser, process.env.REACT_APP_KEY_AES).toString(enc.Utf8))
            setNameUser(infoDecoded?.firstName + ' ' + infoDecoded?.lastName)
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

    return (
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a
                class="navbar-brand col-md-3 col-lg-2 me-0 px-3"
                href="#"
            >
                MLB
            </a>
            <div className='col-2'>
                <input class="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search" />
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
                            >
                                <Link
                                    to={path.LOG_OUT}
                                >
                                    <FontAwesomeIcon className='me-1' icon={faRightFromBracket} />
                                    Logout
                                </Link>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
