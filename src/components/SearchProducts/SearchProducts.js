import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import * as actions from '../../store/actions'
import { useState } from 'react';
import {Buffer} from 'buffer';
import { formatVND, path, limit_list_search } from '../../utils';
import { Link } from 'react-router-dom';

function SearchProducts({ accessToken, productSearch, searchProductByNameRedux, refreshProductSearchRedux }) {
    const [isOnchange, setIsOnchange] = useState(false)
    const [productName, setProductName] = useState('')

    useEffect(() => {
        refreshProductSearchRedux()
    }, [])

    const handleOnchange = (e) => {
        e.target.value.length === 0 ? setIsOnchange(false) : setIsOnchange(true)
        setProductName(e.target.value)
        searchProductByNameRedux(e.target.value, 1)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        searchProductByNameRedux(productName, 1)
    }

    return (    
        <div className='search'>
            <FontAwesomeIcon className='icon-infor' icon={faMagnifyingGlass} />
            <div className='input-search'>
                <form className='form-search'>
                    <input 
                        placeholder='Tìm kiếm sản phẩm'
                        onChange={e => handleOnchange(e)}
                        value={productName}
                    />
                    <button 
                        className='btn-search'
                        onClick={e => handleSearch(e)}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search'/>
                    </button>
                </form>
                <div className='results-box'>
                    {
                        (!productSearch || productSearch.length === 0) && isOnchange ?  <div className='results-box_item text-black'>Không có kết quả tìm kiếm</div>
                        :
                        <div className='results-box_item'>
                            {
                                productSearch.map((item, index) => {
                                    if (index === limit_list_search) 
                                        return ''
                                    let imageBase64 = ''
                                    let price = ''
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image.data, 'base64').toString('binary')
                                    }
                                    if (item.price) {
                                        price = formatVND(item.price)
                                    }
                                    return (
                                        <>
                                            <a href='#' key={index}>
                                                <div 
                                                    style={{ 
                                                        width: '250px',                                                        
                                                        backgroundImage: `url(${imageBase64})`,
                                                        backgroundPosition: '0% 0%',
                                                        backgroundSize: 'contain',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}
                                                ></div>
                                                <div className='result-box_item-infor'>
                                                    <div className='results-box_item-name'>{item.name}</div>
                                                    <div className='results-box_item-price'>{price}</div>
                                                </div>
                                            </a>                                            
                                        </>
                                    )
                                })                                
                            } 
                            {
                                !productSearch || productSearch.length === 0 ? '' : 
                                <Link   
                                    to={path.SEARCH_PRODUCT+`?pname=${productName}`}
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

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        productSearch: state.product.productSearch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchProductByNameRedux: (productName, offset) => dispatch(actions.searchProductByName(productName, offset)),
        refreshProductSearchRedux: () => dispatch(actions.refreshProductSearch())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(SearchProducts));
