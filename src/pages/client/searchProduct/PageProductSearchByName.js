import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './PageProductSearchByName.scss'
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as actions from '../../../store/actions'
import { path } from '../../../utils';
import Navbar from '../../../components/clients/navbar/Navbar';
import Footer from '../../../components/clients/footer/Footer';
import Loading from '../../../components/loading/Loading';
import Pagination from '../../../components/pagination/Pagination';
import ListProducts from '../../../components/clients/listProducts/ListProducts';
import Banner from '../../../components/clients/banner/Banner';

function PageProductSearchByName({ titlePage }) {
    const dispatch = useDispatch()
    const { productSearchLimit, count, isLoading } = useSelector(state => state.product)
    const [params] = useSearchParams()
    const [searchParams] = useSearchParams();
    const productName = searchParams.get('pname')
    const body = useRef()
    const initialRender = useRef(true)
    const navigate = useNavigate()
    const [name, setName] = useState('')

    useEffect(() => {
        document.title = titlePage
        dispatch(actions.refreshIsloadingStateProduct())
        if (productName) {
            dispatch(actions.getAllImagesProduct())
        }
    }, [])

    useEffect(() => {
        if (productName) {
            dispatch(actions.searchProductByNameLimit(productName, params.get('page') || 1))
        }
        if (body.current) {
            window.scrollTo({
                behavior: "smooth",
                top: body.current.offsetTop - 100
            });
        }
    }, [params.get('page'), productName])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        }
        else {
            if (body.current) {
                window.scrollTo({
                    behavior: "smooth",
                    top: body.current.offsetTop - 100
                });
            }
        }
    }, [body.current])

    const handleSearchProduct = (e) => {
        e.preventDefault()
        navigate(path.SEARCH_PRODUCT + `?pname=${name}`)
    }

    return (
        <>

            <div className='product-search-by-name'>
                <Navbar />
                <div>
                    <Banner categoryProduct='Kết quả tìm kiếm' title='Tìm kiếm' />
                </div>
                {
                    productName ?
                        <>
                            {
                                isLoading ?
                                    <Loading />
                                    :
                                    <div ref={body} className='product-search-by-name-container px-4'>
                                        <div className='container'>
                                            <div className='product-count pt-5 pb-3'>
                                                <span>Tìm thấy {count} kết quả với từ khóa "{productName}"</span>
                                            </div>
                                            <div className='menu-box'>
                                                <div className='menu-product row row-cols-4'>
                                                    <ListProducts bg='contain' products={productSearchLimit} col='col-3' />
                                                </div>
                                            </div>
                                            <Pagination pathPage={path.SEARCH_PRODUCT} pname={productName} currentPage={params.get('page') || 1} />
                                        </div>
                                    </div>
                            }
                        </>
                        :
                        <div ref={body} className='container my-4 py-4'>
                            <div className='row justify-content-md-center text-center'>
                                <h4 className='fs-5'>Nhập từ khóa để tìm kiếm</h4>
                                <form class="input-group" onSubmit={(e) => handleSearchProduct(e)}>
                                    <input
                                        type="search"
                                        class="form-control"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <button type="submit" class="btn btn-root fw-500" data-mdb-ripple-init>Tìm kiếm</button>
                                </form>
                            </div>
                        </div>
                }
                <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(PageProductSearchByName);
