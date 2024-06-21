import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../../components/server/navbar/Navbar';
import TableOrder from './TableOrder';
import Sidebar from '../../../components/server/sidebars/Sidebar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions'
import { toast } from 'react-toastify';
import { CustomToast } from '../../../utils/customToast';

function OrderManage() {
    const dispatch = useDispatch()
    const [params] = useSearchParams()
    const [option, setOption] = useState('all')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        document.title = 'Quản lý đơn hàng'
    }, [])

    const handleClickOption = (option) => {
        dispatch(actions.refreshStoreOrder())
        dispatch(actions.getLimitOrder(params.get('page') ? params.get('page') : 1, option))
        setOption(option)
    }

    const handleSearchOrder = () => {
        if (!searchText) {
            toast.error(CustomToast('Please, enter order to search'), { autoClose: 3000 })
        }
        else {
            dispatch(actions.getOrderById(+searchText))
            setOption('')
        }
    }

    return (
        <div>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='order' />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2>Đơn hàng</h2>
                            <div>
                                <ul className='d-flex gap-2 p-0 fw-500 text-muted'>
                                    <li
                                        style={{ cursor: 'pointer' }}
                                        className={option === 'all' ? 'fs-14 p-2 text-color-root-dark active-li' : 'fs-14 p-2'}
                                        onClick={() => handleClickOption('all')}
                                    >
                                        Tất cả
                                    </li>
                                    <li
                                        style={{ cursor: 'pointer' }}
                                        className={option === 'waitConfirmation' ? 'fs-14 p-2 text-color-root-dark active-li' : 'fs-14 p-2'}
                                        onClick={() => handleClickOption('waitConfirmation')}
                                    >
                                        Chờ xác nhận
                                    </li>
                                    <li
                                        style={{ cursor: 'pointer' }}
                                        className={option === 'waitPay' ? 'fs-14 p-2 text-color-root-dark active-li' : 'fs-14 p-2'}
                                        onClick={() => handleClickOption('waitPay')}
                                    >
                                        Chờ thanh toán
                                    </li>
                                    <li
                                        style={{ cursor: 'pointer' }}
                                        className={option === 'shipping' ? 'fs-14 p-2 text-color-root-dark active-li' : 'fs-14 p-2'}
                                        onClick={() => handleClickOption('shipping')}
                                    >
                                        Đang giao
                                    </li>
                                    <li
                                        style={{ cursor: 'pointer' }}
                                        className={option === 'finished' ? 'fs-14 p-2 text-color-root-dark active-li' : 'fs-14 p-2'}
                                        onClick={() => handleClickOption('finished')}
                                    >
                                        Hoàn thành
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className=''>
                            <div className='d-flex justify-content-end'>
                                <Link
                                    className='text-white fw-500 btn btn-root text-center'
                                    to={path.MANAGE_ORDER_CREATE}
                                >
                                    <FontAwesomeIcon icon={faPlus} /> Thêm mới
                                </Link>
                            </div>
                            {/* <div className='mt-2'>
                                <InputGroup size='sm' className="mb-3">
                                    <Form.Control
                                        placeholder="Nhập đơn hàng"
                                        aria-label="Enter order"
                                        aria-describedby="basic-addon2"
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <Button 
                                        variant="outline-secondary" 
                                        id="button-addon2"
                                        onClick={handleSearchOrder}
                                    >
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </Button>
                                </InputGroup>
                            </div> */}
                        </div>
                    </div>
                    <hr />
                    <TableOrder option={option} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
