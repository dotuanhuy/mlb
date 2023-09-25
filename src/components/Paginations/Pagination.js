import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Pagination.scss'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { path } from '../../utils';

function Pagination({countProduct, countUser, pathPage, currentPage}) {
    const navigate = useNavigate()
    const [arrPage, setArrPage] = useState([])
    const [currentPageP, setCurrentPageP] = useState(+currentPage)
    const [isHidenBegin, setIsHidenBegin] = useState(true)
    const [isHidenEnd, setIsHidenEnd] = useState(false)
    const [isHidenPrev, setIsHidenPrev] = useState(true)
    const [isHidenBack, setIsHidenBack] = useState(false)
    const location = useLocation()

    useEffect(() => {
        let maxPage = Math.ceil((pathPage === path.MANAGE || pathPage === path.MANAGE_CREATE  ? countUser : countProduct)  / 2)
        let end = (+currentPageP + 2) > maxPage ? maxPage : (+currentPageP + 2)
        let start = (+currentPageP - 2) <= 0 ? 1 : (+currentPageP - 2)
        let arr = []
        for (let i = start; i <= end; i++) {
            arr.push(i)
        }
        setArrPage(arr)

        if (+currentPageP === 1) {
            setIsHidenBegin(true)
        }
        else {
            setIsHidenBegin(false)
        }
        if (+currentPageP === end) {
            setIsHidenEnd(true)
        }
        else {
            setIsHidenEnd(false)
        }
        if (start === 1) {
            setIsHidenPrev(true)
        }
        else {
            setIsHidenPrev(false)
        }
        if (end === maxPage) {
            setIsHidenBack(true)
        }
        else {
            setIsHidenBack(false)
        }
    }, [countProduct, countUser , currentPageP])

    const handleChangePage = (e) => {
        setCurrentPageP(e.target.getAttribute('data-page'))
        navigate({
            pathname: pathPage,
            search: createSearchParams({
                page: e.target.getAttribute('data-page')
            }).toString(),
        }, {state: location.state})
    }

    const handleToBegin = () => {
        setCurrentPageP(1)
        navigate({
            pathname: pathPage,
            search: createSearchParams({
                page: 1
            }).toString()
        }, {state: location.state})
    }   

    const handleToEnd = () => {
        let end = Math.ceil((pathPage === path.MANAGE || pathPage === path.MANAGE_CREATE ?  countUser : countProduct) / 2)
        setCurrentPageP(end)
        navigate({
            pathname: pathPage,
            search: createSearchParams({
                page: end
            }).toString()
        }, {state: location.state})
    }

    return (
        <>
            <nav aria-label="...">
                <ul className="pagination">
                    {   
                        isHidenBegin ? '' :
                        <li 
                            className='page-item'
                            onClick={handleToBegin}
                        >
                            <span className="page-link" aria-disabled="true">&laquo;</span>
                        </li>
                    }
                    {
                        isHidenPrev ? '' : 
                        <li className="page-item">
                            <span className="page-link" >...</span>
                        </li>
                    }
                    {
                        arrPage.length > 0 && arrPage.map((item, index) => {
                            return (
                                <li 
                                    key={index} 
                                    className={item === +currentPage ? 'page-item active' : 'page-item'} 
                                    aria-current='1'
                                >
                                    <span 
                                        className="page-link" 
                                        data-page={item}
                                        onClick={(e) => handleChangePage(e)}
                                    >{item}</span>
                                </li>
                            )
                        })
                    }
                    {
                        isHidenBack ? '' : 
                        <li className="page-item">
                            <span className="page-link" >...</span>
                        </li>
                    }
                    {
                        isHidenEnd ? '' :
                        <li 
                            className='page-item'
                            onClick={handleToEnd}
                        >
                            <span className="page-link" >&raquo;</span>
                        </li>
                    }
                </ul>
            </nav>
        </>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        isLoading: state.product.isLoadingProduct,
        countProduct: state.product.count,
        countUser: state.user.count
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Pagination));
