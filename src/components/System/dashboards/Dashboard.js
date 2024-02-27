import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Loading from '../../common/Loading/Loading'

function Dashboard({
    countProduct,
    countUser,
    getCountProductsRedux,
    getCountUsersRedux
}) {
    const accessToken = window.localStorage.getItem('accessToken')

    useEffect(() => {
        getCountProductsRedux()
        getCountUsersRedux()
    }, [])

    return (
        <>
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div>
            </div>
            <div className='row'>
                <div
                    className='col-3 fw-500 fs-5 text-white bg-root rounded text-center py-5 me-4'
                >
                    Total products begin sold: {countProduct}
                </div>
                <div
                    className='col-3 fw-500 fs-5 text-white bg-root rounded text-center py-5'
                >
                    Total user: {countUser}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        countProduct: state.product.count,
        countUser: state.user.count,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCountProductsRedux: () => dispatch(actions.getCountProducts()),
        getCountUsersRedux: () => dispatch(actions.getCountUsers())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);