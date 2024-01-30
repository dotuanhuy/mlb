import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Sidebar.css'
import { faCaretDown, faCartShopping, faChartSimple, faHouse, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Active, categorieType, path } from '../../../../utils';

const initActive = {
    dashboard: false,
    report: false,
    product: false,
    customer: false,
    user: false
}

function Sidebar({active='dashboard', activeChild = ''}) {
    // const [active, setActive] = useState({
    //     dashboard: true,
    //     report: false,
    //     product: false,
    //     customer: false,
    //     user: false
    // })


    return (
        <nav id="sidebarMenu" class="d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li 
                        class="nav-item"
                    >   
                        <Link 
                            className={active === 'dashboard' ? "nav-link active_sm"  : "nav-link text-muted opacity-7 text-size-14 fw-500"}
                            aria-current="page" 
                            href="#"
                        >
                            <FontAwesomeIcon className='pe-2' icon={faHouse} />
                            Dashboard
                        </Link>
                    </li>
                    <li 
                        class="nav-item"
                    >   
                        <a 
                            className={active === 'report' ? "nav-link active_sm"  : "nav-link text-muted opacity-7 text-size-14 fw-500"}
                            href="#"
                        >
                            <FontAwesomeIcon className='pe-2' icon={faChartSimple} />
                            Report
                        </a>
                    </li>
                    <li 
                        class="nav-item"
                    >   
                        <Link 
                            className={active === 'product' ? "nav-link active_sm"  : "nav-link text-muted opacity-7 text-size-14 fw-500"}
                            to={path.MANAGE_PRODUCTS}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faCartShopping} />
                            Products
                            <FontAwesomeIcon className='ps-2' icon={faCaretDown} />
                        </Link>
                        {/* <button
                            className={active === 'product' ? "nav-link active_sm"  : "nav-link text-muted opacity-7 text-size-14 fw-500"}
                            onClick={handleShowProductItem}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faCartShopping} />
                            Products
                            <FontAwesomeIcon className='ps-2' icon={faCaretDown} />
                        </button> */}

                        <ul className={active === 'product' ? 'dbloc' : 'd-none'}>
                            <li className='border-bottom pb-2'>
                                <Link 
                                    className={activeChild === Active.SHOSE ? 'text-muted opacity-7 text-size-14 fw-500 active-text' : 'text-muted opacity-7 text-size-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_SHOES}
                                    // state={{ categoryType: categorieType.SHOES_SANDAL }}
                                >
                                    Shoes
                                </Link>
                            </li>
                            <li className='border-bottom pb-2'>
                                <Link 
                                    className={activeChild === Active.BAG_BALO ? 'text-muted opacity-7 text-size-14 fw-500 active-text' : 'text-muted opacity-7 text-size-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_BAG_BALO}
                                >
                                    Backpack-Bag
                                </Link>
                            </li>
                            <li className='border-bottom pb-2'>
                                <Link 
                                    className={activeChild === Active.HAT ? 'text-muted opacity-7 text-size-14 fw-500 active-text' : 'text-muted opacity-7 text-size-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_HAT}
                                >
                                    Hat
                                </Link>
                            </li>
                            <li className='border-bottom pb-2'>
                                <Link 
                                    className={activeChild === Active.CLOTHES ? 'text-muted opacity-7 text-size-14 fw-500 active-text' : 'text-muted opacity-7 text-size-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_CLOTHES}
                                >
                                    Clothes
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li 
                        class="nav-item"
                    >   
                        <a 
                            className={active === 'customer' ? "nav-link active_sm"  : "nav-link text-muted opacity-7 text-size-14 fw-500"}
                            href="#"
                        >
                            <FontAwesomeIcon className='pe-2' icon={faUsers} />
                            Customers
                        </a>
                    </li>
                    <li 
                        class="nav-item"
                    >   
                        <Link
                            className={active === 'user' ? "nav-link active_sm"  : "nav-link text-muted opacity-7 text-size-14 fw-500"}
                            to={path.MANAGE_USER}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faUser} />
                            User
                        </Link>
                    </li>
                    {/* <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="layers"></span>
                            Integrations
                        </a>
                    </li> */}
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a class="link-secondary" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Current month
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Last quarter
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Social engagement
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <span data-feather="file-text"></span>
                            Year-end sale
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
