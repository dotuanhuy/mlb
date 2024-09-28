import React, { memo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CustomToast, DELETE, path } from '../../../utils';
import Loading from '../../../components/loading/Loading';
import * as actions from '../../../store/actions';
import Pagination from '../../../components/pagination/Pagination';
import Navbar from '../../../components/clients/navbar/Navbar';
import Banner from '../../../components/clients/banner/Banner'
import Footer from '../../../components/clients/footer/Footer';
import jwt_decode from 'jwt-decode';
import ListProducts from '../../../components/clients/listProducts/ListProducts';
import { toast } from 'react-toastify';

function Favourite({ titlePage }) {
    const dispatch = useDispatch()
    const { productLimit, isLoading, status } = useSelector(state => state.favouriteProduct)
    const { images } = useSelector(state => state.product)
    const [params] = useSearchParams()
    const body = useRef()
    const initialRender = useRef(true)
    const accessToken = window.localStorage.getItem('accessToken')
    const navigate = useNavigate()

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.refreshIStateFavouriteProduct())
    }, [])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 80
                });
            }
        }
    }, [body.current])

    useEffect(() => {
        let userId = ''
        if (accessToken) {
            let tokenDecoded = jwt_decode(accessToken)
            userId = tokenDecoded?.id
        }
        else {
            navigate(path.LOGIN)
        }
        if (userId) {
            dispatch(actions.getAllProductsFavouriteLimit(params.get('page') || 1))
        }
        if (body.current) {
            window.scrollTo({
                behavior: "smooth",
                top: body.current.offsetTop - 80
            });
        }
    }, [params.get('page')])

    useEffect(() => {
        console.log('check');
        if (status) {
            if (status === DELETE) {
                toast.info(CustomToast('Bạn vừa bỏ sản phẩm ra khỏi mục yêu thích'), { autoClose: 2000 })
            }
            else {
                toast.info(CustomToast('Bạn vừa thêm 1 sản phẩm vào mục yêu thích'), { autoClose: 2000 })
            }
            dispatch(actions.refreshIStatusFavouriteProduct())
        }
    }, [status])

    return (
        <>
            {
                isLoading ?
                    <Loading />
                    :
                    <div className='product-search-by-name'>
                        <Navbar />
                        <Banner categoryProduct='Yêu thích' title='Yêu thích' />

                        <div ref={body} className='product-search-by-name-container px-4'>
                            <div className='container mb-4'>
                                <h4 className='product-count pt-5 fs-5 pb-5 text-center fw-500'>
                                    Danh sách yêu thích của tôi
                                </h4>
                                <div className='menu-box'>
                                    <div className='menu-product row row-cols-4'>
                                        <ListProducts bg='contain' products={productLimit} images={images} col='col-3' />
                                    </div>
                                </div>
                                <Pagination pathPage={path.FAVOURITE} currentPage={params.get('page') || 1} />
                            </div>
                        </div>
                        <Footer />
                    </div>
            }
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(Favourite));
