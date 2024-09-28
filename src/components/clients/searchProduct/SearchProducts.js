import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchProducts.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import * as actions from '../../../store/actions'
import { useState } from 'react';
import { formatVND, path, limit_list_search } from '../../../utils';
import { Link, useNavigate } from 'react-router-dom';

let timerId
function SearchProducts() {
    const [isOnchange, setIsOnchange] = useState(false)
    const [productName, setProductName] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {productSearch} = useSelector(state => state.product)

    useEffect(() => {
        dispatch(actions.refreshProductSearch())
    }, [])

    const handleOnchange = (e) => {
        e.target.value.length === 0 ? setIsOnchange(false) : setIsOnchange(true)
        setProductName(e.target.value)
        debounce(1000, e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(path.SEARCH_PRODUCT + `?pname=${productName}`)
    }

    const debounce = (delay, productName) => {
        delay = delay || 0
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
        timerId = setTimeout(() => {
            if (productName.trim()) {
                dispatch(actions.searchProductByName(productName, 1))
            }
        }, delay)
    }

    return (
        <div className='search position-relative'>
            <FontAwesomeIcon className='icon-infor' icon={faMagnifyingGlass} />
            <div className='input-search rounded position-absolute bg-white'>
                <form className='form-search position-relative' onSubmit={handleSearch}>
                    <input
                        className='p-2'
                        placeholder='Tìm kiếm sản phẩm'
                        onChange={e => handleOnchange(e)}
                        value={productName}
                    />
                    <button
                        className='btn-search bg-transparent position-absolute'
                        onClick={e => handleSearch(e)}
                        type='submit'
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search' />
                    </button>
                </form>
                <div className='results-box w-100'>
                    {
                        (!productSearch || productSearch.length === 0) && isOnchange ? <div className='results-box_item text-black'>Không có kết quả tìm kiếm</div>
                            :
                            <div className='results-box_item'>
                                {
                                    productSearch.map((item, index) => {
                                        if (index === limit_list_search)
                                            return ''
                                        let price = ''
                                        if (item.price) {
                                            price = formatVND(item.price)
                                        }
                                        return (
                                            <>
                                                <Link
                                                    className='p-2 text-dark'
                                                    key={index}
                                                    to={`${path.PRODUCT}/${item.name}`}
                                                    state={{
                                                        productId: item.id,
                                                        productName: item.name,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '250px',
                                                            backgroundImage: `url(${item.image})`,
                                                            backgroundPosition: '0% 0%',
                                                            backgroundSize: 'contain',
                                                            backgroundRepeat: 'no-repeat'
                                                        }}
                                                    ></div>
                                                    <div className='result-box_item-infor'>
                                                        <div className='results-box_item-name'>
                                                            <span className='text-black mb-0 name-product-cart'>{item.name}</span>
                                                        </div>
                                                        <div className='results-box_item-price text-danger'>{price}</div>
                                                    </div>
                                                </Link>
                                            </>
                                        )
                                    })
                                }
                                {
                                    !productSearch || productSearch.length === 0 ? '' :
                                        <Link
                                            className='py-2 show-all-search-link'
                                            to={path.SEARCH_PRODUCT + `?pname=${productName}`}
                                        // state={{ 
                                        //     productName
                                        // }}
                                        >
                                            Xem tất cả
                                        </Link>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default memo(SearchProducts);
