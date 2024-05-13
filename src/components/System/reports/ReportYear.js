import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { Form } from 'react-bootstrap';
import VerticalBarChart from '../common/charts/VerticalBarChart';
import { getYears } from '../../../utils';

function ReportYear() {
    const dispatch = useDispatch()
    const { revenueYear } = useSelector(state => state.report)
    const [years, setYears] = useState([])

    useEffect(() => {
        dispatch(actions.getYearRevenue())
    }, [])

    useEffect(() => {
        if (revenueYear && revenueYear?.length > 0) {
            const data = revenueYear?.map(item => item?.year)
            setYears(data)
        }
    }, [revenueYear])

    return (
        <div className='bg-white rounded px-3 py-2'>
            <span className='fw-500'>Theo các năm</span>
            <div className='mt-2'>
                <VerticalBarChart
                    labels={years}
                    titleText={'Biểu đồ khu vực thống kê doanh thu, lợi nhuận theo từng tháng trong năm'}
                    label={{
                        dataSet1: 'Doanh thu',
                        dataSet2: 'Thu nhập'
                    }}
                    data={revenueYear}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportYear);
