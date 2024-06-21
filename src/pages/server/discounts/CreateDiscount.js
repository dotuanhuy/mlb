import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../../components/server/navbar/Navbar';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../../components/server/sidebars/Sidebar';
import TableDiscount from './TableDiscount';
import { Form } from 'react-bootstrap';
import { validate } from '../../../validate/valiedate';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { CustomToast } from '../../../utils';

const initDataInput = {
    code: '',
    value: '',
    description: ''
}

function CreateDiscount() {
    const dispatch = useDispatch()
    const { message, errCode } = useSelector(state => state.discount)
    const [dataInput, setDataInput] = useState(initDataInput)
    const [errors, setErrors] = useState({})
    const [params] = useSearchParams()

    useEffect(() => {
        document.title = 'Thêm mới mã giảm giá'
    }, [])

    useEffect(() => {
        if (message) {
            if (errCode == 0) {
                toast.success(CustomToast(message), { autoClose: 1000 })
            }
            else {
                toast.error(CustomToast(message), { autoClose: 1000 })
            }
            dispatch(actions.refreshInfoResDiscount())
        }
    }, [message])

    const handleCreateDisCount = () => {
        const error = validate(dataInput)
        setErrors(error)

        if (Object.keys(error).length === 0) {
            dispatch(actions.createDiscount({
                code: dataInput?.code,
                value: +dataInput?.value,
                description: dataInput?.description,
                page: params?.get('page') ? +params?.get('page') : 1
            }))
            setDataInput(initDataInput)
        }
    }

    return (
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active={'discount'} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between'>
                        <h2>Thêm mới mã giảm giá</h2>
                    </div>
                    <hr />
                    <div className='mb-5'>
                        <Form.Group controlId="formCode" className="mb-3">
                            <Form.Label className='text-muted fw-500'>Mã<span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                value={dataInput.code}
                                type="text"
                                placeholder="Enter code..."
                                onChange={(e) => {
                                    setDataInput({
                                        ...dataInput,
                                        code: e.target.value
                                    })
                                    setErrors({})
                                }}
                            />
                            {
                                errors && errors.code ? <span className='error'>{errors.code}</span> : ''
                            }
                        </Form.Group>
                        <Form.Group controlId="formValue" className="mb-3">
                            <Form.Label className='text-muted fw-500'>Giá trị<span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                value={dataInput.value}
                                type="type"
                                placeholder="Enter value (%)"
                                onChange={(e) => {
                                    setDataInput({
                                        ...dataInput,
                                        value: +e.target.value
                                    })
                                    setErrors({})
                                }}
                            />
                            {
                                errors && errors.value ? <span className='error'>{errors.value}</span> : ''
                            }
                        </Form.Group>
                        <Form.Group controlId="formDes" className="mb-3">
                            <Form.Label className='text-muted fw-500'>Mô tả<span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={dataInput.description}
                                onChange={(e) => {
                                    setDataInput({
                                        ...dataInput,
                                        description: e.target.value
                                    })
                                    setErrors({})
                                }}
                            />
                            {
                                errors && errors.description ? <span className='error'>{errors.description}</span> : ''
                            }
                        </Form.Group>
                        <button
                            className='btn btn-root fw-500'
                            onClick={() => handleCreateDisCount()}
                        ><FontAwesomeIcon icon={faPlus} /> Tạo mới</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDiscount);
