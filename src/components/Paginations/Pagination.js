import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Pagination.scss'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { path, limit_page } from '../../utils';

function Pagination({
    countProduct, 
    countUser, 
    pathPage, 
    currentPage, 
    countProductType,
    pname=null,
    countProductsFavourite
}) {
    const navigate = useNavigate()
    const [arrPage, setArrPage] = useState([])
    const [currentPageP, setCurrentPageP] = useState(+currentPage)
    const [isHidenBegin, setIsHidenBegin] = useState(true)
    const [isHidenEnd, setIsHidenEnd] = useState(false)
    const [isHidenPrev, setIsHidenPrev] = useState(true)
    const [isHidenBack, setIsHidenBack] = useState(false)
    const location = useLocation()  
    
    useEffect(() => {
        // let maxPage = Math.ceil((pathPage === path.MANAGE || pathPage === path.MANAGE_USER_CREATE  ? countUser : countProduct)  / +limit_page)
        let maxPage = 0
        if (pathPage === path.MANAGE_USER || pathPage === path.MANAGE_USER_CREATE) {
            maxPage =  Math.ceil(countUser / +limit_page)
        }
        else if (pathPage === path.FAVOURITE) {
            maxPage =  Math.ceil(countProductsFavourite / +limit_page)
        }
        else if (pathPage === path.MANAGE_PRODUCT_TYPE) {
            maxPage =  Math.ceil(countProductType / +limit_page)
        }
        else {
            maxPage =  Math.ceil(countProduct / +limit_page)
        }
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
    }, [countProduct, countUser, countProductsFavourite, currentPageP])

    const handleChangePage = (e) => {
        setCurrentPageP(e.target.getAttribute('data-page'))
        let object = pname ? {
            page: e.target.getAttribute('data-page'),
            pname
        } : {
            page: e.target.getAttribute('data-page'),
        }
        navigate({
            pathname: pathPage,
            search: createSearchParams(object).toString(),
        }, {state: location.state})
    }

    const handleToBegin = () => {
        setCurrentPageP(1)
        let object = pname ? {
            page: 1,
            pname
        } : {
            page: 1,
        }
        navigate({
            pathname: pathPage,
            search: createSearchParams(object).toString()
        }, {state: location.state})
    }   

    const handleToEnd = () => {
        // let end = Math.ceil((pathPage === path.MANAGE || pathPage === path.MANAGE_USER_CREATE ?  countUser : countProduct) / +limit_page)
        let end = 0
        if (pathPage === path.MANAGE_USER || pathPage === path.MANAGE_USER_CREATE) {
            end =  Math.ceil(countUser / +limit_page)
        }
        else if (pathPage === path.FAVOURITE) {
            end =  Math.ceil(countProductsFavourite / +limit_page)
        }
        else if (pathPage === path.MANAGE_PRODUCT_TYPE) {
            end =  Math.ceil(countProductType / +limit_page)
        }
        else {
            end =  Math.ceil(countProduct / +limit_page)
        }
        
        setCurrentPageP(end)
        let object = pname ? {
            page: end,
            pname
        } : {
            page: end,
        }
        navigate({
            pathname: pathPage,
            search: createSearchParams(object).toString()
        }, {state: location.state})
    }

    return (
        <>
            {
                arrPage.length === 0 ? 
                <div className='not-product'>Không có sản phẩm thỏa mãn</div>
                :
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
                            isHidenEnd || arrPage.length === 0  ? '' :
                            <li 
                                className='page-item'
                                onClick={handleToEnd}
                            >
                                <span className="page-link" >&raquo;</span>
                            </li>
                        }
                    </ul>
                </nav>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.product.isLoadingProduct,
        countProduct: state.product.count,
        countUser: state.user.count,
        countProductsFavourite: state.fouriteProduct.countProducts,
        countProductType: state.productType.count
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Pagination));
