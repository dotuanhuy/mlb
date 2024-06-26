import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import { validate, validateRequire } from '../../../validate/valiedate';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

function VerifyOtp({ type, setIsLoading }) {
    const dispatch = useDispatch()
    const { otp } = useSelector(state => state.auth)
    const [otpClient, setOtpClient] = useState('');
    const [isShowVerify, setIsShowVerify] = useState(false)
    const [dataInput, setDataInput] = useState({ email: '' })
    const [errors, setErrors] = useState()

    useEffect(() => {
        dispatch(actions.refreshStoreUser())
    }, [])

    useEffect(() => {
        if (otp) {
            setIsLoading(false)
            setIsShowVerify(true)
        }
    }, [otp])

    const handleSendEmail = (e) => {
        e.preventDefault()
        const error = validate(dataInput)
        if (Object.keys(error).length > 0) {
            setErrors(error)
        }
        else {
            setIsLoading(true)
            dispatch(actions.sendMail(dataInput.email, type))
        }
    }

    const handleVerifyOtp = (e) => {
        e.preventDefault()
        const error = validateRequire('Mã xác minh', otpClient)
        if (error) {
            setErrors({
                otp: error
            })
        }
        else {
            dispatch(actions.verifyOtp({
                otp: otpClient,
                email: dataInput.email
            }))
        }
    }

    return (
        <>
            {
                !isShowVerify ?
                    <Form className='p-4'>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label className='fw-500'>Xác minh email<span className='text-danger'>*</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập địa chỉ email..."
                                value={dataInput.email}
                                onChange={(e) => {
                                    setErrors({})
                                    setDataInput({ email: e.target.value })
                                }}
                            />
                            {
                                errors && errors.email ? <span className='error'>{errors.email}</span> : ''
                            }
                        </Form.Group>
                        <button
                            className='btn w-100 btn-root fw-500'
                            onClick={handleSendEmail}
                        >Gửi mã</button>
                    </Form>
                    :
                    <div className='mt-3 p-4'>
                        <div className='mb-3 text-center'>
                            <span className='fw-500 text-muted'>Nhập mã xác minh được gửi ở email ({dataInput.email}):</span>
                        </div>
                        <OtpInput
                            value={otpClient}
                            onChange={setOtpClient}
                            numInputs={6}
                            inputType='number'
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                width: '3rem',
                                height: '3rem',
                                border: '1px solid',
                                borderRadius: '0.375rem',
                                margin: '0 2px'
                            }}
                            containerStyle={{
                                justifyContent: 'center'
                            }}
                        />
                        {
                            errors && errors.otp ? <div className='error text-center mt-2'>{errors.otp}</div> : ''
                        }
                        <div className='text-center mt-3'>
                            <button
                                className='btn button-auth'
                                onClick={handleVerifyOtp}
                            >
                                Xác minh
                            </button>
                        </div>
                    </div>
            }

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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
