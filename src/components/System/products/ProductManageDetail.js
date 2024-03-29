import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from '../../common/Loading/Loading';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebars/Sidebar';
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ListColorsProduct, formatVND } from '../../../utils';
import * as actions from '../../../store/actions'
import { formatDateVN } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import SliderProduct from '../../common/Slider/SliderProduct';
import ProductManageImage from './ProductManageImage';
import ReviewManage from '../Reviews/ReviewManage';
import { useDispatch, useSelector } from 'react-redux';


function ProductManageDetail({actives}) {
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.product)
    const {isLoadingImage} = useSelector(state => state.image)
    const navigate = useNavigate()   
    const [params] = useSearchParams()

    useEffect(() => {
        dispatch(actions.refreshStoreImages())
        dispatch(actions.getProductById(params.get('id')))
        dispatch(actions.getAllImagesByProductId(params.get('id')))
    }, [])
    
    const handleEdit = (id) => {
        navigate({
            pathname: actives?.pathToEdit,
            search: createSearchParams({
                id,
                page: params.get('page') ? params.get('page') : 1
            }).toString()
        })
    }

    return (      
        <>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active={'product'} activeChild={actives?.active}/>
                </div> 
                <>
                {
                    isLoadingImage ?
                    <Loading />
                    :
                    <div className='col-10 container bg-light mt-4 px-5 py-3 rounded mb-4'>
                        
                        <div className='d-flex justify-content-between'>
                            <h2>Shoe detail</h2>
                        </div>
                        <hr/>
                        <div className='row'>
                            <div className='col-6 position-relative'>
                                <SliderProduct />
                            </div>
                            <div className='col-6 product-detail'>
                                <h3 className='fs-4'>{products?.name}</h3>
                                <div className='d-flex gap-3 mb-1'>
                                    <div className='review'>
                                        <span className='text-banner text-muted'>Product review</span>
                                    </div>
                                    <div className='review'>
                                        <span className='text-banner text-muted'>Status: 
                                            <span className='text-black fs-6'> {products?.status === 1 ? 'active' : 'inactive'}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex gap-4 mb-1'>
                                    <div className='category'>
                                        <span className='text-banner text-muted'>Category name: <span className='text-black fs-6'>{products?.dataCategoryDetail?.name}</span></span>
                                    </div>
                                    <div className='logo'>
                                        <span className='text-banner text-muted'>Logo name: <span className='text-black fs-6'>{products?.dataLogos?.name}</span></span>
                                    </div>
                                </div>
                                <div className='banner d-flex gap-4 mb-1'>
                                    <div className='brand'>
                                        <span className='text-banner text-muted'>Brand: 
                                            <span className='text-black fs-6'> {products?.dataBrands?.name}</span>
                                        </span>
                                    </div>
                                    <div className='code'>
                                        <span className='text-banner text-muted'>Code: 
                                            <span className='text-black fs-6'> {products?.code}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className='price d-flex gap-2 mb-1'>
                                    <span 
                                        className='price-begin text-banner text-muted'
                                        // style={{ color: '#942319' }}
                                    >
                                        Begin price: <span className='text-black fs-6'>{formatVND(products?.price)}</span>
                                    </span>
                                    <br/>
                                    {
                                        products?.dataDiscounts?.value ? 
                                        <span 
                                            className='price-last text-banner text-muted' 
                                        >
                                           after discount ({+products?.dataDiscounts?.value*100}%): <span className='text-black fs-6'>{formatVND(+products?.price - (+products?.dataDiscounts?.value)*(+products?.price))}</span>
                                        </span> : ''
                                    }
                                </div>
                                <div className='mb-1'>
                                        <span className='text-banner text-muted'>Product type: 
                                            <span className='text-black fs-6'> {products?.dataProductType?.name}</span>
                                        </span>
                                </div>
                                <div className='d-flex gap-3 mb-1'>
                                    <div className='release-date'>
                                        <span className='text-banner text-muted'>Release date: 
                                            <span className='text-black fs-6'> {formatDateVN(products?.releaseDate)}</span>
                                        </span>
                                    </div>
                                    <div className='quantity'>
                                        <span className='text-banner text-muted'>Quantity remaining:  
                                            <span className='text-black fs-6'> {products?.quantity}</span>
                                        </span>
                                    </div>
                                </div>
                                {
                                    products?.dataSizeDetail?.length === 0 ?
                                    '' : 
                                    <div className='size'>
                                        <div className='title mb-2'>
                                            <span className='text-banner text-muted'>List sizes: </span>
                                        </div>
                                        <div className='select-size mb-2'>
                                            <div className='row gap-2 ms-0'>
                                                {   
                                                    products?.dataSizeDetail?.map((item, index) => {
                                                        return (
                                                            <div 
                                                                className='col-2 rounded px-1 py-2 text-center active' 
                                                                key={index}
                                                            >
                                                                <span className='text-banner'>{item?.name}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>  
                                    </div>
                                }
                                {
                                    products?.dataColorDetail?.length === 0 ?
                                    '' : 
                                    <div className='color'>
                                        <div className='title mb-2'>
                                            <span className='text-banner text-muted'>List colors: </span>
                                        </div>
                                        <div className='select-color mb-2'>
                                            <div className='row gap-2 ms-0'>
                                                {   
                                                    products?.dataColorDetail?.map((item, index) => {
                                                        return (
                                                            <div 
                                                                className='col-2 rounded px-1 py-2 text-center active' 
                                                                key={index}
                                                                style={{ 
                                                                    background: `${ListColorsProduct[item?.dataColor?.name]}`,
                                                                    border: `1px solid ${ListColorsProduct[item?.dataColor?.name]}`
                                                                }}
                                                            >
                                                                <span 
                                                                    className='text-banner'
                                                                >
                                                                    {item?.dataColor?.name}
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>  
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='mt-4'>
                            <Link 
                                className='text-white fw-500 btn btn-root btn-add me-2' 
                                to={actives.pathToBack+`?page=${params.get('page')}`}
                            >
                                <FontAwesomeIcon className='pe-1' icon={faBackward} />
                                Back
                            </Link>
                            <button 
                                className='btn btn-root-2 btn-add fw-500 me-2'
                                onClick={() => handleEdit(products?.id)}
                            >
                                <FontAwesomeIcon className='pe-1' icon={faPenToSquare} />
                                Edit product
                            </button>
                            <ProductManageImage />
                        </div>

                        <div className='mt-5'>
                            <ReviewManage />
                        </div>
                    </div>
                }
                </>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManageDetail);
