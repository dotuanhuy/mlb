import React, {memo, useEffect} from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils';
import * as actions from '../../store/actions'
import { useDispatch } from 'react-redux';

function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log('logout')
    useEffect(() => {
        dispatch(actions.refreshStoreProduct())
        dispatch(actions.refreshStoreUser())
        dispatch(actions.refreshIStateFavouriteProduct())
        navigate(path.LOGIN)
    }, [])
    
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
