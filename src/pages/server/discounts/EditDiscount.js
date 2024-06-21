import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Navbar from '../../../components/server/navbar/Navbar';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import Sidebar from '../../../components/server/sidebars/Sidebar';
import { Form } from 'react-bootstrap';
import { validate } from '../../../validate/valiedate';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions'
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../../components/loading/Loading';

const initDataInput = {
    code: '',
    value: '',
    description: ''
}

function EditDiscount() {
    const dispatch = useDispatch()
    const [dataInput, setDataInput] = useState(initDataInput)
    const { discount, isLoading } = useSelector(state => state.discount)
    const [errors, setErrors] = useState({})
    const [params] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Chỉnh sửa mã giảm giá'
        if (params.get('id')) {
            dispatch(actions.getDiscountById(+params.get('id')))
        }
    }, [])

    useEffect(() => {
        if (discount) {
            setDataInput({
                code: discount?.code,
                value: discount?.value,
                description: discount?.description
            })
        }
    }, [discount])

    const handleUpdateDisCount = () => {
        const error = validate(dataInput)
        setErrors(error)

        if (Object.keys(error).length === 0) {
            dispatch(actions.updateDiscount({
                id: discount?.id,
                code: dataInput?.code,
                value: +dataInput?.value,
                description: dataInput?.description,
                page: params?.get('page') ? +params?.get('page') : 1
            }))
            navigate(
                {
                    pathname: path.MANAGE_DISCOUNT,
                    search: createSearchParams({ page: params.get('page') || 1 }).toString(),
                }
            )
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
                        <h2>Chỉnh sửa mã giảm giá</h2>
                    </div>
                    <hr />
                    {
                        isLoading ?
                            <Loading />
                            :
                            <div className='mb-5'>
                                <Form.Group controlId="formCode" className="mb-3">
                                    <Form.Label className='text-muted fw-500'>Mã<span className='text-danger'>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter code..."
                                        value={dataInput?.code}
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
                                        type="text"
                                        placeholder="Enter value ...(%)"
                                        value={dataInput?.value}
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
                                        value={dataInput?.description}
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
                                    onClick={() => handleUpdateDisCount()}
                                ><FontAwesomeIcon icon={faBookmark} /> Lưu</button>
                            </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditDiscount);
