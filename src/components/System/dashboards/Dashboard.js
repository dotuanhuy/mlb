import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Loading from '../../common/Loading/Loading'
import HorizontalBarChart from '../common/charts/HorizontalBarChart';
import VerticalBarChart from '../common/charts/VerticalBarChart';
import { useDispatch, useSelector } from 'react-redux';
import { faBasketShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt, faSellcast } from '@fortawesome/free-brands-svg-icons';
import { getYears } from '../../../utils';
import { Form } from 'react-bootstrap';

function Dashboard() {
    const dispatch = useDispatch()
    const totalUsers = useSelector(state => state.user.count)
    const totalProducts = useSelector(state => state.product.count)
    const totalProductSold = useSelector(state => state.product.totalSold)
    const { statisticalListProductType } = useSelector(state => state.product)
    const totalOrder = useSelector(state => state.order.total)
    const { bestSellProducts } = useSelector(state => state.report)
    const [year, setYear] = useState(new Date().getFullYear())
    const [labels, setLabels] = useState([])
    const [labelPType, setLabelPType] = useState([])

    useEffect(() => {
        document.title = 'Trung tâm'
        dispatch(actions.getCountProducts())
        dispatch(actions.getCountUsers())
        dispatch(actions.getTotalOrder())
        dispatch(actions.getAllCategoriesDetail())
        dispatch(actions.getQuantityOfEechProductByCategory())
        dispatch(actions.getTopTenBestSellingProductsYear(year))
    }, [])

    useEffect(() => {
        if (bestSellProducts && bestSellProducts?.length > 0) {
            const arrLabels = bestSellProducts?.map(item => item?.name)
            setLabels(arrLabels)
        }
    }, [bestSellProducts])

    useEffect(() => {
        if (statisticalListProductType && statisticalListProductType?.length > 0) {
            const arrLabels = statisticalListProductType?.map(item => item?.dataCategoryDetail?.name)
            setLabelPType(arrLabels)
        }
    }, [statisticalListProductType])

    return (
        <>
            {
                bestSellProducts && bestSellProducts.length > 0 ?
                    <>
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">Trung tâm</h1>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="btn-group me-2">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                                </div>
                                <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                                    <span data-feather="calendar"></span>
                                    This week
                                </button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mb-4'>
                            <div
                                className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                            >
                                <FontAwesomeIcon icon={faUser} className='fs-2' />
                                <div className='fs-16 d-flex flex-column align-items-start'>
                                    <span className='text-muted'>Tổng số người dùng</span>
                                    <span className='text-black'>{totalUsers}</span>
                                </div>
                            </div>
                            <div
                                className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                            >
                                <FontAwesomeIcon icon={faProductHunt} className='fs-2' />
                                <div className='fs-16 d-flex flex-column align-items-start'>
                                    <span className='text-muted'>Tổng số sản phẩm</span>
                                    <span className='text-black'>{totalProducts}</span>
                                </div>
                            </div>
                            <div
                                className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                            >
                                <FontAwesomeIcon icon={faSellcast} className='fs-2' />
                                <div className='fs-16 d-flex flex-column align-items-start'>
                                    <span className='text-muted'>Sản phẩm đã bán</span>
                                    <span className='text-black'>{totalProductSold}</span>
                                </div>
                            </div>
                            <div
                                className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                            >
                                <FontAwesomeIcon className='fs-2' icon={faBasketShopping} />
                                <div className='fs-16 d-flex flex-column align-items-start'>
                                    <span className='text-muted'>Tổng số đơn hàng</span>
                                    <span className='text-black'>{totalOrder}</span>
                                </div>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='d-flex justify-content-end'>
                                <div className='col-2'>
                                    <Form.Select
                                        size='sm'
                                        aria-label="Default select example"
                                        onChange={e => setYear(+e.target.value)}
                                    >
                                        <option disabled selected >Chọn năm</option>
                                        {
                                            getYears()?.map((item, index) => (
                                                <option key={index} value={item} selected={year === item} >{item}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </div>
                            </div>
                            <HorizontalBarChart
                                labels={labels}
                                titleText={`Biểu đồ thanh ngang thống kê top 5 sản phẩm bán chạy nhất trong năm ${year}`}
                                label={{
                                    dataSet1: `Số lượng`
                                }}
                                data={bestSellProducts}
                            />
                        </div>
                        <div className='mb-4'>
                            <div className='col-6'>
                                <VerticalBarChart
                                    labels={labelPType}
                                    titleText='Biểu đồ cột số lượng các sản phẩm theo loại sản phẩm'
                                    label={{
                                        dataSet1: 'Số lượng'
                                    }}
                                    data={statisticalListProductType}
                                    optionCol={1}
                                />
                            </div>
                        </div>
                        <div>
                            <span className='text-muted fw-500'>
                                Tổng số sản phẩm: {
                                    statisticalListProductType.reduce((acc, cur) => acc + +cur.quantity, 0)
                                } sản phẩm

                            </span>
                        </div>
                    </>
                    : <Loading />
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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);