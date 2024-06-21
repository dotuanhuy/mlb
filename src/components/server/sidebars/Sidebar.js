import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Sidebar.css'
import { faBasketShopping, faCaretDown, faCartShopping, faChartSimple, faDatabase, faHouse, faLayerGroup, faTag, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { path, Active } from '../../../utils';

function Sidebar({ active = 'dashboard', activeChild = '' }) {
    const [state, setState] = useState(false)
    const [isProduct, setIsProduct] = useState(false)

    return (
        <nav id="sidebarMenu" class="d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li
                        class="nav-item"
                    >
                        <Link
                            className={active === 'dashboard' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            aria-current="page"
                            to={path.MANAGE}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faHouse} />
                            Trung tâm
                        </Link>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <a
                            className={active === 'firebase' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            href="#"
                        >
                            <FontAwesomeIcon className='pe-2' icon={faDatabase} />
                            Firebase
                        </a>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <div
                            className={state === true || active === 'category' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            onClick={() => setState(!state)}
                            style={{ cursor: 'pointer' }}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faLayerGroup} />
                            Loại sản phẩm
                            <FontAwesomeIcon className='ps-1' icon={faCaretDown} />
                        </div>
                        <ul className={state === true || active === 'category' ? 'd-block' : 'd-none'}>
                            <li className='border-bottom py-2'>
                                <Link
                                    className={activeChild === Active.CATEGORY ? 'text-muted opacity-7 fs-14 fw-500 active-text' : 'text-muted opacity-7 fs-14 fw-500'}
                                    to={path.MANAGE_CATEGORY_PRODUCT}
                                >
                                    Thể loại
                                </Link>
                            </li>
                            <li className='border-bottom py-2'>
                                <Link
                                    className={activeChild === Active.PRODUCT_TYPE ? 'text-muted opacity-7 fs-14 fw-500 active-text' : 'text-muted opacity-7 fs-14 fw-500'}
                                    to={path.MANAGE_PRODUCT_TYPE}
                                >
                                    Các kiểu sản phẩm
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <Link
                            className={active === 'discount' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            to={path.MANAGE_DISCOUNT}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faTag} />
                            Giảm giá
                        </Link>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <div
                            className={isProduct === true || active === 'product' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setIsProduct(!isProduct)}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faCartShopping} />
                            Sản phẩm
                            <FontAwesomeIcon className='ps-1' icon={faCaretDown} />
                        </div>
                        <ul className={isProduct === true || active === 'product' ? 'dbloc' : 'd-none'}>
                            <li className='border-bottom pb-2'>
                                <Link
                                    className={activeChild === Active.SHOSE ? 'text-muted opacity-7 fs-14 fw-500 active-text' : 'text-muted opacity-7 fs-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_SHOES}
                                // state={{ categoryType: categorieType.SHOES_SANDAL }}
                                >
                                    Giày
                                </Link>
                            </li>
                            <li className='border-bottom pb-2'>
                                <Link
                                    className={activeChild === Active.BAG_BALO ? 'text-muted opacity-7 fs-14 fw-500 active-text' : 'text-muted opacity-7 fs-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_BAG_BALO}
                                >
                                    Balo-túi
                                </Link>
                            </li>
                            <li className='border-bottom pb-2'>
                                <Link
                                    className={activeChild === Active.HAT ? 'text-muted opacity-7 fs-14 fw-500 active-text' : 'text-muted opacity-7 fs-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_HAT}
                                >
                                    Mũ
                                </Link>
                            </li>
                            <li className='border-bottom pb-2'>
                                <Link
                                    className={activeChild === Active.CLOTHES ? 'text-muted opacity-7 fs-14 fw-500 active-text' : 'text-muted opacity-7 fs-14 fw-500'}
                                    to={path.MANAGE_PRODUCTS_CLOTHES}
                                >
                                    Quần-áo
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <Link
                            className={active === 'order' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            to={path.MANAGE_ORDER}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faBasketShopping} />
                            Đơn hàng
                        </Link>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <a
                            className={active === 'customer' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            href="#"
                        >
                            <FontAwesomeIcon className='pe-2' icon={faUsers} />
                            Khách hàng
                        </a>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <Link
                            className={active === 'report' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            to={path.MANAGE_REPORT}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faChartSimple} />
                            Thống kê
                        </Link>
                    </li>
                    <li
                        class="nav-item"
                    >
                        <Link
                            className={active === 'user' ? "nav-link active_sm" : "nav-link text-muted opacity-7 fs-14 fw-500"}
                            to={path.MANAGE_USER}
                        >
                            <FontAwesomeIcon className='pe-2' icon={faUser} />
                            Người dùng
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
