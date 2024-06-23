import React, { memo, useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../utils';
import * as actions from '../../../store/actions'
import { useDispatch } from 'react-redux';

function Logout() {
    const dispatch = useDispatch()
    const { errCode } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(actions.logout())
        dispatch(actions.refreshStoreProduct())
        dispatch(actions.refreshStoreUser())
        dispatch(actions.refreshIStateFavouriteProduct())
        dispatch(actions.refreshStateCart())
        dispatch(actions.refreshStateMessage())
        dispatch(actions.refreshStateAuth())
    }, [])

    useEffect(() => {
        if (errCode === 0) {
            navigate(path.HOMEPAGE)
        }
    }, [errCode])

    return (
        <></>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Logout));
