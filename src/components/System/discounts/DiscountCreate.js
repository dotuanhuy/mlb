import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/navbar/Navbar';
import { useSearchParams } from 'react-router-dom';
import { path } from '../../../utils';
import Sidebar from '../common/sidebars/Sidebar';
import TableDiscount from './TableDiscount';
import { Form } from 'react-bootstrap';
import { validate } from '../../../validate/valiedate';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const initDataInput = {
    code: '',
    value: '',
    description: ''
}

function DiscountCreat() {
    const dispatch = useDispatch()
    const [dataInput, setDataInput] = useState(initDataInput)
    const [errors, setErrors] = useState({})
    const [params] = useSearchParams()

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
                        <h2>Create new discount</h2>
                    </div>
                    <hr />
                    <div className='mb-5'>
                        <Form.Group controlId="formCode" className="mb-3">
                            <Form.Label>Code<span className='text-danger'>*</span></Form.Label>
                            <Form.Control
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
                            <Form.Label>Value<span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter value ...(%)"
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
                            <Form.Label>Description<span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
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
                        ><FontAwesomeIcon icon={faCirclePlus} className='pe-1' />Create</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountCreat);
