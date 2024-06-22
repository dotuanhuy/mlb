import React, { memo } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { formatVND } from "../../../utils";
import './ListProducts.scss';
import { Link, useSearchParams } from "react-router-dom";
import { path } from "../../../utils";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as actions from '../../../store/actions'
import Cart from "../action/Cart";

function ListProducts({ bg = 'cover', products, col = 'col-4' }) {
    const dispatch = useDispatch()
    const productFavourites = useSelector(state => state.favouriteProduct.product)
    const [params] = useSearchParams()

    const handleChangeFavourite = (productId) => {
        if (bg === 'cover') {
            dispatch(actions.changeProductFavourite({ productId }))
        }
        else {
            dispatch(actions.changeProductFavourite({ productId }, params.get('page') || 1))
        }
    }

    return (
        <>
            {
                products && products?.length > 0 &&
                products?.map((item, index) => {
                    let size = item?.dataSizeDetail?.at(0)?.name
                    let price = ''
                    let newPrice = ''
                    if (item.price) {
                        price = formatVND(item.price)
                    }
                    if (item?.dataDiscounts?.value !== 0) {
                        newPrice = formatVND(item.price - item.price * item?.dataDiscounts?.value)
                    }
                    let isFavourite = false
                    if (productFavourites.length !== 0) {
                        isFavourite = productFavourites.some(element => element.productId === item.id)
                    }
                    return (
                        <div className={`list-products p-0 ${col}`} key={index}>
                            {
                                +item?.dataDiscounts?.value !== 0 ?
                                    <div className='discount'>
                                        <span>-{+item?.dataDiscounts?.value * 100}%</span>
                                    </div>
                                    : ''
                            }
                            <div className='actions text-center'>
                                <button className='tym mb-2 px-3 text-black-50'>
                                    <FontAwesomeIcon
                                        className={isFavourite ? 'text-danger' : ''}
                                        icon={faHeart}
                                        onClick={() => handleChangeFavourite(item?.id)}
                                        data-toggle="tooltip"
                                        title='Thêm vào yêu thích'
                                    />
                                </button>
                                <Cart productId={item?.id} size={size} />
                            </div>
                            <div className='product-img product-img-first'>
                                <Link
                                    to={`${path.PRODUCT}/${item.name}`}
                                    state={{
                                        productId: item.id,
                                        productName: item.name,
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: '100%',
                                            height: '340px',
                                            backgroundImage: `url(${item?.image})`,
                                            backgroundPosition: '0% 0%',
                                            backgroundSize: bg,
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    ></div>
                                </Link>
                            </div>
                            <div className='product-img product-img-second'>
                                <Link
                                    to={`${path.PRODUCT}/${item.name}`}
                                    state={{
                                        productId: item.id,
                                        productName: item.name,
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: '100%',
                                            height: '340px',
                                            backgroundImage: `url(${item?.dataImageProducts?.at(0)?.image})`,
                                            backgroundPosition: '0% 0%',
                                            backgroundSize: bg,
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    ></div>
                                </Link>
                            </div>
                            <div className='product-infor text-center'>
                                <span className='brand'>{item.dataBrands.name}</span>
                                <h4 className='product-name'>
                                    <Link
                                        to={`${path.PRODUCT}/${item.name}`}
                                        state={{
                                            productId: item.id,
                                            productName: item.name,
                                        }}
                                    >{item.name}</Link>
                                </h4>
                                {
                                    newPrice ?
                                        <span className='product-price pe-2'>{newPrice}</span>
                                        : ''
                                }
                                <span className={newPrice ? 'product-price text-decoration-line-through text-muted fs-14' : 'product-price'}>{price}</span>
                            </div>
                        </div>
                    )
                })
            }
        </>
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(ListProducts));
