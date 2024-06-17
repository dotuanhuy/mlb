import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Navbar from '../common/navbar/Navbar';
import { Link } from 'react-router-dom';
import { path, CustomToast } from '../../../utils';
import Sidebar from '../common/sidebars/Sidebar';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableDiscount from './TableDiscount';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions'

function DiscountManage() {
    const dispatch = useDispatch()
    const { message, errCode } = useSelector(state => state.discount)

    useEffect(() => {
        document.title = 'Quản lý mã giảm giá'
    }, [])

    useEffect(() => {
        if (message) {
            if (errCode == 0) {
                toast.success(CustomToast(message), { autoClose: 2000 })
            }
            else {
                toast.error(CustomToast(message), { autoClose: 2000 })
            }
            dispatch(actions.refreshInfoResDiscount())
        }
    }, [message])

    return (
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='discount' />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Discount</h2>
                        <Link className='text-white fw-500 btn btn-root text-center' to={path.MANAGE_DISCOUNT_CREATE}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm mới
                        </Link>
                    </div>
                    <hr />
                    <TableDiscount />
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountManage);
