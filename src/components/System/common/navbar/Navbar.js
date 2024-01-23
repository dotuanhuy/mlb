import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { faBell, faMagnifyingGlass, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.scss'
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Navbar({
    accessToken
}) {
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

    return (
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow py-2">
            <a 
                class="navbar-brand col-md-3 col-lg-2 me-0 px-3" 
                href="#"
            >
                MLB
            </a>
            {/* <button class="navbar-toggler position-absolute d-md-none collapsed">
                <span class="navbar-toggler-icon"></span>
            </button> */}
            <div className='col-2'>
                <input class="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search"/>
            </div>
            <div class="navbar-nav">
                <div class="nav-item text-nowrap position-relative">
                    <button 
                        className='btn'
                        onClick={handleDropDownUser}
                    >
                        <FontAwesomeIcon className='text-white' icon={faUser} />
                    </button>
                    <ul 
                        className={active.user ? 'dropdown-menu position-absolute text-white d-block' : 'dropdown-menu position-absolute text-white'}
                        style={{ 
                            right: '10px'
                        }}
                    >
                        <li className='dropdown-item'>{nameUser}</li>
                        <li className='dropdown-item'>Logout</li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
