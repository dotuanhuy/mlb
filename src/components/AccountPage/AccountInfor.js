import React, { useEffect, useState, memo, useRef } from 'react';
import { connect } from 'react-redux';
import './Account.scss'
import { Link } from 'react-router-dom';
import Navbar from '../HomePage/Navbar/Navbar';
import HomeFooter from '../HomePage/HomeFooter/HomeFooter';
import jwt_decode from 'jwt-decode';
import Account from './Account';
import Banner from '../common/Banners/Banner';
import * as actions from  '../../store/actions'

const initState = {
    firstName: '',
    lastName: '',
    email: ''
}

function AccountInfor({token, getAllProductsFavouriteRedux}) {
    const [userLogin, setUserLogin] = useState(initState)
    const body  = useRef()
    const initialRender  = useRef(true)

    useEffect(() => {
        if (token) {
            let tokenDecoded = jwt_decode(token)
            setUserLogin({
                firstName: tokenDecoded?.firstName,
                lastName: tokenDecoded?.lastName,
                email: tokenDecoded?.email
            })
        }

        let userId = ''
        if (token) {
            let tokenDecoded = jwt_decode(token)
            userId = tokenDecoded?.id
        }
        // if (userId) {
        //     getAllProductsFavouriteRedux(token, userId)
        // }
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 100
                });
            }
        }
    }, [body.current])

    return (
        <>
            <Navbar />
            <Banner categoryProduct='Trang khách hàng' title='Trang khách hàng' />
            <div ref={body} className='account'>
                <div className='account-body p-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <div className='list-option'>
                                    <Account userLogin={userLogin} activeType={'infor'}/>
                                </div>
                            </div>
                            <div className='col-9'>
                                <div className='list-option-select'>
                                    <h5>Thông tin tài khoản</h5>
                                    <p>
                                        <strong>Họ tên: </strong>
                                        {`${userLogin?.firstName} ${userLogin?.lastName}`}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        {`${userLogin?.email}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <HomeFooter />
        </>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProductsFavouriteRedux: (token, userId) => dispatch(actions.getAllProductsFavourite(token, userId)),
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(AccountInfor));
