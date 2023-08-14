import React from 'react';
import { connect } from 'react-redux';
import './nav.scss'
import { Link } from 'react-router-dom';
import { path } from '../../../utils'

function Nav() {

    return (
        <div className='nav-system'>
            <div className='nav-container'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light bg-nav">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-white" to={path.MANAGE}>Home</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown nav-manage">
                                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Manage
                                    </a>
                                    <ul className="dropdown-menu manage-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link 
                                                className="dropdown-item" 
                                                to={path.MANAGE_CREATE}
                                            >
                                                Create New User
                                            </Link>
                                        </li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><hr className="dropdown-divider"></hr></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active text-white" aria-current="page" href="#">Dropdown</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
