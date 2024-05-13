import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { formatVND, getToDayDB } from '../../../utils'
import * as actions from '../../../store/actions'
import Loading from '../../common/Loading/Loading'
import { faChartArea, faChartLine, faHandHoldingDollar, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import ReportWeek from './ReportWeek'
import ReportMonth from './ReportMonth'
import ReportYear from './ReportYear';

function Report() {
    const dispatch = useDispatch()
    const { revenueToday, totalRevenue, totalPrefitRevenue } = useSelector(state => state.report)

    useEffect(() => {
        document.title = 'Thống kê'
        dispatch(actions.getDailyRevenue(getToDayDB()))
        dispatch(actions.getTotalRevenue())
    }, [])

    return (
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active={'report'} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between'>
                        <h2>Thống kê</h2>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between mb-4'>
                        <div
                            className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                        >
                            <FontAwesomeIcon icon={faChartArea} className='fs-2' />
                            <div className='fs-16 d-flex flex-column align-items-start'>
                                <span className='text-muted'>Doanh thu hôm nay</span>
                                <span className='text-black'>{revenueToday?.revenue}</span>
                            </div>
                        </div>
                        <div
                            className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                        >
                            <FontAwesomeIcon icon={faChartLine} className='fs-2' />
                            <div className='fs-16 d-flex flex-column align-items-start'>
                                <span className='text-muted'>Lợi nhuận hôm nay</span>
                                <span className='text-black'>{revenueToday?.profit}</span>
                            </div>
                        </div>
                        <div
                            className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                        >
                            <FontAwesomeIcon icon={faMoneyBillTrendUp} className='fs-2' />
                            <div className='fs-16 d-flex flex-column align-items-start'>
                                <span className='text-muted'>Tổng doanh thu</span>
                                <span className='text-black'>{formatVND(totalRevenue)}</span>
                            </div>
                        </div>
                        <div
                            className='col-sm d-flex justify-content-between align-items-center fw-500 text-color-root-light rounded bg-white shadow-sm text-center py-4 px-4'
                        >
                            <FontAwesomeIcon icon={faHandHoldingDollar} className='fs-2' />
                            <div className='fs-16 d-flex flex-column align-items-start'>
                                <span className='text-muted'>Tổng thu nhập</span>
                                <span className='text-black'>{formatVND(totalPrefitRevenue)}</span>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mb-4'>
                        <div className='col-6-custom bg-white rounded px-3 py-2'>
                            <ReportWeek />
                        </div>
                        <div className='col-6-custom bg-white rounded px-3 py-2'>
                            <ReportMonth />
                        </div>
                    </div>
                    <ReportYear />
                </div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Report);
