import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { Form } from 'react-bootstrap';
import AreaChart from '../../../components/server/charts/AreaChart';
import { getYears } from '../../../utils';

const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']

function ReportMonth() {
    const dispatch = useDispatch()
    const { revenueMonth } = useSelector(state => state.report)
    const [year, setYear] = useState(new Date().getFullYear())

    useEffect(() => {
        dispatch(actions.getMonthlyRevenue(year))
    }, [year])

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='fw-500'>Theo tháng trong năm</span>
                <div className='col-3'>
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
            <div className='mt-4'>
                <AreaChart
                    labels={months}
                    titleText={'Biểu đồ khu vực thống kê doanh thu, lợi nhuận theo từng tháng trong năm'}
                    label={{
                        dataSet1: 'Doanh thu',
                        dataSet2: 'Thu nhập'
                    }}
                    data={revenueMonth}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportMonth);
