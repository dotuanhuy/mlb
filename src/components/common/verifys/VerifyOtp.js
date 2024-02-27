import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { path } from '../../../utils';
import * as actions from '../../../store/actions'
import { validate } from '../../../validate/valiedate';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otpClient, setOtpClient] = useState('');
    const [isShowVerify, setIsShowVerify] = useState(false)
    const [dataInput, setDataInput] = useState({email: ''})
    const [errors, setErrors] = useState()
    const dispatch = useDispatch()
    const { otp } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(actions.refreshStoreUser())
    }, [])

    useEffect(() => {
        if (otp) {
            setIsShowVerify(true)
        }
    }, [otp])

    const handleSendEmail = (e) => {
        e.preventDefault()
        let error = validate(dataInput)
        setErrors(error)
        if (Object.keys(error).length === 0) {
            dispatch(actions.sendMail(dataInput.email))
        }
    }

    const handleVerifyOtp = () => {
        dispatch(actions.verifyOtp({
            otp: otpClient, 
            email: dataInput.email
        }))
    }

    return (
        <>
            {
                !isShowVerify ?
                <form className='p-4'>
                    <div className="form-group pb-4">
                        <label className='label-input' htmlFor="exampleInputEmail1">EMAIL<span className='text-danger'>*</span></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Nhập Địa chỉ Email" 
                            value={dataInput.email}
                            onChange={(e) => {
                                setErrors({})
                                setDataInput({email: e.target.value})
                            }}
                        />
                        {
                            errors && errors.email ? <span className='error'>{errors.email}</span> : ''
                        }  
                    </div>
                    <button 
                        className='btn w-100 button-auth'
                        onClick={(e) => handleSendEmail(e)}
                    >Gửi mã</button>
                </form>
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
        errMessage: state.user.errMessage,
        errCode: state.user.errCode,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewUserRedux: (data) => dispatch(actions.register(data)),
        refreshStoreUserRedux: () => dispatch(actions.refreshStoreUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
