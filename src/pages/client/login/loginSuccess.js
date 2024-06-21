import React, { useEffect, memo } from 'react';
import { connect, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { useDispatch } from 'react-redux';

function LoginSuccess() {
    const [params] = useSearchParams()
    const dispatch = useDispatch()
    const { isLogin } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(actions.loginWithGoogle(params.get('id'), params.get('token')))
    }, [])
    return (
        <div>
            {
                isLogin ? <Navigate to='/' /> : <h3>Yêu cầu bạn đăng nhập</h3>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(LoginSuccess));
