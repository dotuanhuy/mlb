import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { Form } from 'react-bootstrap';
import { formatDateDB, getCurrentWeek, getWeekNumber, getWeeksInYear } from '../../../utils';
import AreaChart from '../common/charts/AreaChart';

const initWeek = {
    id: getWeekNumber(new Date()),
    ...getCurrentWeek(),
}

function ReportWeek() {
    const dispatch = useDispatch()
    const { revenueWeek } = useSelector(state => state.report)
    const [week, setWeek] = useState(initWeek)
    const [dayInWeek, setDayInWeek] = useState([])

    useEffect(() => {
        if (week) {
            dispatch(actions.getWeeklyRevenue(week.startDate, week.endDate))
        }
    }, [week])

    useEffect(() => {
        if (revenueWeek && revenueWeek?.length > 0) {
            const data = revenueWeek?.map(item => item?.day)
            setDayInWeek(data)
        }
    }, [revenueWeek])

    const handleOnchange = e => {
        const arr = e.target.options[e.target.selectedIndex].text.split(' ')
        setWeek({
            id: +e.target.value,
            startDate: arr[3],
            endDate: arr[5] 
        })
    }

    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <span className='fw-500'>Theo ngày trong tuần</span>
                <div className='col-6'>
                    <Form.Select 
                        size='sm' 
                        aria-label="Default select example"
                        onChange={handleOnchange}
                    >
                        <option disabled selected >Chọn tuần</option>
                        {
                            getWeeksInYear(new Date().getFullYear())?.map((item, index) => (
                                <option key={index} value={index+1} selected={week.id === index+1} >{`Tuần ${index + 1}: Từ ${formatDateDB(item.startDate)} đến ${formatDateDB(item.endDate)}`}</option>
                            ))
                        }
                    </Form.Select>
                </div>
            </div>
            <div className='mt-4'>
                <AreaChart
                    labels={dayInWeek}
                    titleText={'Biểu đồ cột thống kê doanh thu, lợi nhuận theo từng tháng trong năm'}
                    label={{
                        dataSet1: 'Doanh thu',
                        dataSet2: 'Thu nhập'
                    }}
                    data={revenueWeek}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReportWeek);
