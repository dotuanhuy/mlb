import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../../components/server/sidebars/Sidebar';
import Navbar from '../../../components/server/navbar/Navbar';
import { AES, enc } from 'crypto-js';
import { formatDateVN, path } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import avatart_male_none from '../../../assets/avatar/avatar_male_none.jpg'
import * as actions from '../../../store/actions'

function Manage() {
    const dispatch = useDispatch()
    const { imageLogoWeb } = useSelector(state => state.firebase)
    const [account, setAccount] = useState()
    const navigate = useNavigate()
    const inputFileRef = useRef()
    const [imgLogo, setImgLogo] = useState({ url: '', value: '' })

    useEffect(() => {
        const infoUser = window.localStorage.getItem('info')
        // const infoUser = Cookies.get('info')
        if (!infoUser) {
            navigate(path.LOGIN)
        }
        else {
            dispatch(actions.getImageLogoWeb())
            const infoDecoded = JSON.parse(AES.decrypt(infoUser, process.env.REACT_APP_KEY_AES).toString(enc.Utf8))
            setAccount(infoDecoded)
        }
    }, [])

    useEffect(() => {
        if (imageLogoWeb) {
            setImgLogo({
                ...imgLogo,
                url: imageLogoWeb
            })
        }
    }, [imageLogoWeb])

    const handleOnchangeImgLogo = async (e) => {
        setImgLogo({
            url: URL.createObjectURL(e.target.files[0]),
            value: e.target.files[0]
        })
    }

    const handleClick = () => {
        inputFileRef.current?.click()
    }

    return (
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='info' />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>

                    <div className='d-flex justify-content-between'>
                        <h2>Thông tin</h2>
                    </div>
                    <hr />
                    <div className='row'>
                        <div className='col-3'>
                            {
                                account?.avatar ? ''
                                    :
                                    <img className='rounded-circle border' src={avatart_male_none} width='100%' />
                            }
                        </div>
                        <div className='col-8 text-muted border rounded'>
                            <div className='my-2'>
                                <span className='fs-6 fw-500 text-muted'>Họ và tên: <span className='text-black'>{account?.firstName} {account?.lastName}</span></span>
                            </div>
                            <div className='mb-2'>
                                <span className='fs-6 fw-500 '>Email: <span className='text-black'>{account?.email}</span></span>
                            </div>
                            <div className='mb-2'>
                                <span className='fs-6 fw-500'>Số điện thoại: <span className='text-black'>{account?.phone}</span></span>
                            </div>
                            <div className='mb-2'>
                                <span className='fs-6 fw-500'>Địa chỉ: <span className='text-black'>{account?.address}</span></span>
                            </div>
                            <div className='mb-2'>
                                <span className='fs-6 fw-500'>Giới tính: <span className='text-black'>{account?.gender}</span></span>
                            </div>
                            <div className='mb-2'>
                                <span className='fs-6 fw-500'>Quyền: <span className='text-black'>{account?.dataRole?.name}</span></span>
                            </div>
                            <div className='mb-2'>
                                <span className='fs-6 fw-500'>Ngày khởi tạo: <span className='text-black'>{formatDateVN(account?.createdAt)}</span></span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        {/* <button
                            className='btn btn-root-2 btn-add fw-500'
                            onClick={() => handleEdit(account)}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} /> Chỉnh sửa người dùng
                        </button> */}
                    </div>
                    <div className='mt-4'>
                        <h5>Thông tin website</h5>
                        <div className='col-3'>
                            <label className='form-label fw-bold' htmlFor='addImageItems'>Logo website</label>
                            <input
                                ref={inputFileRef}
                                type='file'
                                multiple
                                className='d-none'
                                id='addImageItems'
                                onChange={e => { handleOnchangeImgLogo(e) }}
                            />
                            <button
                                className='btn border fw-500 ms-2'
                                onClick={handleClick}
                            >
                                Chọn ảnh
                            </button>
                            {

                                imgLogo?.url &&
                                <div
                                    className='my-2'
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        backgroundImage: `url(${imgLogo?.url})`,
                                        backgroundPosition: '0% 0%',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                ></div>
                            }
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
