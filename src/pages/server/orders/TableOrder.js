import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import Pagination from '../../../components/pagination/Pagination';
import { formatDateTimeVN, formatVND, orderStatusObj, path } from '../../../utils';
import Loading from '../../../components/loading/Loading';

function TableOrder({ option }) {
    const dispatch = useDispatch()
    const { orders, isLoading } = useSelector(state => state.order)
    const [params] = useSearchParams()
    const { pathname } = useLocation()

    useEffect(() => {
        dispatch(actions.getLimitOrder(params.get('page') ? params.get('page') : 1, option))
    }, [params?.get('page')])

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <div className='order'>
                        <table className="customers table-light table">
                            <thead>
                                <tr>
                                    <th>
                                        <Form.Check
                                            type="checkbox"
                                            id="custom-switch"
                                            label="Tất cả"
                                        />
                                    </th>
                                    <th>ID</th>
                                    <th>Ngày đặt</th>
                                    <th>Trạng thái</th>
                                    <th>Tổng tiền</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders && orders.length > 0 &&
                                    orders.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    id="custom-switch"
                                                    label=""
                                                />
                                            </td>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>
                                                {formatDateTimeVN(item.createdAt)}
                                            </td>
                                            <td>
                                                {orderStatusObj[item.orderStatus]}
                                            </td>
                                            <td>
                                                {formatVND(item.totalMoney)}
                                            </td>
                                            <td>
                                                <Link
                                                    className='text-info'
                                                    to={`${path.MANAGE_ORDER_DETAIL}?page=${params.get('page') ? params.get('page') : 1}&id=${item.id}`}
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {
                            orders.length === 0 ?
                                <div className='text-danger text-center'>Order does not exist</div>
                                :
                                <Pagination pathPage={pathname} currentPage={params.get('page') || 1} />
                        }
                    </div>
            }
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableOrder);
