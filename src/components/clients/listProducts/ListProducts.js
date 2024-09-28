import React, { memo } from "react";
import { useSelector } from 'react-redux';
import { formatVND } from "../../../utils";
import './ListProducts.scss';
import { Link } from "react-router-dom";
import { path } from "../../../utils";
import Cart from "../action/Cart";
import FavouritePosition from "../action/FavouritePosition";

function ListProducts({ bg = 'cover', products, col = 'col-4' }) {
    const productFavourites = useSelector(state => state.favouriteProduct.product)

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
                                <FavouritePosition productId={item?.id} isFavourite={isFavourite} bg={bg} />
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


export default memo(ListProducts);
