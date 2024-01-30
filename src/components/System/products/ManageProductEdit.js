import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav/nav';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { BuildOptionSelect, BuildOptionSelectDiscount, ListColorsProduct, TitleProduct, allCode, categorieType, path } from '../../../utils';
import CommonUtils from '../../../utils/CommonUtils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {Buffer} from 'buffer';
import _ from 'lodash'
import Loading from '../../common/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';

const initState = {
    name: '',
    code: '',
    price: '',
    productionSite: '',
    material: '',
    quantity: 0
}

const initStateImage = {
    image: null,
    previewImgURL: null
}

const initSize = {
    sizeHeight: '',
    sizeWidth: '',
    sizeD: ''
}

function ManageShoesEdit({
    categoryType,
    active,
    accessToken,
    products,
    categoriesDetail, 
    discounts, 
    brands, 
    colors, 
    logos, 
    sizes,
    isLoading,
    getProductByIdRedux,
    getAllCategoriesDetailByTypeRedux,
    getAllDiscountsRedux,
    getAllBrandsRedux,
    getAllSizesByTypeRedux,
    getAllColorsRedux,
    getAllLogosRedux,
    // getAllCategoriesRedux, 
    // // fetchAllCodeByTypeRedux, 
    // fetchAllColorsRedux,
    updateProductRedux,
    refreshIsloadingStateProductRedux
}) {
    const navigate = useNavigate()
    // const {path, pageCurrent} = useLocation().state
    const [selectCategory, setSelectCategory] = useState()
    const [selectObject, setSelectObject] = useState(initState)
    const [selectDiscount, setSelectDiscount] = useState()
    const [selectImage, setSelectImage] = useState(initStateImage)
    const [selectReleaseDate, setSelectReleaseDate] = useState()
    const [selectBrand, setSelectBrand] = useState()    
    const [selectLogo, setSelectLogo] = useState()
    const [selectGender, setSelectGender] = useState()
    const [listCategories, setListCategories] = useState([]) 
    const [listDiscount, setListDiscount] = useState([])
    const [listBrands, setListBrands] = useState([])
    const [listColors, setListColors] = useState([])
    const [listLogos, setListLogos] = useState([])
    const [listSizes, setListSizes] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [params] = useSearchParams()

    // ComponentDidMount
    useEffect(() => {
        refreshIsloadingStateProductRedux()
        getAllCategoriesDetailByTypeRedux(accessToken, categoryType)
        getAllDiscountsRedux(accessToken)
        getAllBrandsRedux(accessToken)
        getAllSizesByTypeRedux(accessToken, categoryType)
        getAllColorsRedux(accessToken)
        getAllLogosRedux(accessToken)
        getProductByIdRedux(params.get('id'), accessToken)
        // getAllCategoriesRedux(accessToken)
        // fetchAllCodeByTypeRedux(allCode.DISCOUNT)
        // fetchAllCodeByTypeRedux(allCode.BRAND)
        // fetchAllColorsRedux(allCode.COLOR)
        // fetchAllCodeByTypeRedux(allCode.LOGO)
        // if (location.state.typeCategore === categorieType.SHOES_SANDAL) {
        //     fetchAllCodeByTypeRedux(allCode.SIZEGIAY)
        // } 
        // else if (location.state.typeCategore === categorieType.CLOTHES) {
        //     fetchAllCodeByTypeRedux(allCode.SIZEAO)
        // }
        // fetchAllCodeByTypeRedux(allCode.GENDER)
    }, [])

    useEffect(() => {
        if (products) {
            setSelectObject({
                name: products.name,
                code: products.code,
                price: products.price,
                material: products.material,
                productionSite: products.productionSite,
                quantity: products.quantity
            })
            setSelectCategory({
                label: products?.dataCategoryDetail?.name ? products.dataCategoryDetail.name : '', 
                value: products?.dataCategoryDetail?.id ? products.dataCategoryDetail.id: ''
            })
            setSelectDiscount({
                label: products?.dataDiscounts ? +products.dataDiscounts.value * 100 + '%' : '', 
                value: products?.dataDiscounts ? products.dataDiscounts.id : ''
            })
            setSelectBrand({
                label: products?.dataBrands ? products.dataBrands.name : '', 
                value: products?.dataBrands ? products.dataBrands.id : ''
            })
            setSelectLogo({
                label: products?.dataLogos ? products.dataLogos.name : '', 
                value: products?.dataLogos ? products.dataLogos.id : ''
            })
            setSelectGender({
                label: products?.gender ? products.gender : '', 
                value: products?.gender ? products.gender : ''
            })
            if (products?.image) {
                let imageBase64 = Buffer.from(products.image.data, 'base64').toString('binary')
                setSelectImage({
                    image: imageBase64,
                    previewImgURL: imageBase64
                })
            }
            if (products?.dataColorDetail?.length > 0) {
                setListColors(products.dataColorDetail.map(item => item.colorId))
            }
            if (products?.releaseDate) {
                // setSelectReleaseDate(new Date(`${products.releaseDate} 00:00:00 GMT+0700 (Indochina Time)`))
                setSelectReleaseDate(new Date(products.releaseDate))
            }
            if (products?.dataSizeDetail?.length > 0) {
               setListSizes(products.dataSizeDetail.map(item => item.sizeId))
            }
        }
    }, [products])

    useEffect(() => {
        let dataCategory = BuildOptionSelect(categoriesDetail?.at(0)?.dataCategory)
        let dataDiscount = BuildOptionSelectDiscount(discounts)
        let dataBrand = BuildOptionSelect(brands)
        let dataLogo = BuildOptionSelect(logos)

        setListCategories(dataCategory)
        setListDiscount(dataDiscount)
        setListBrands(dataBrand)
        setListLogos(dataLogo)
        setListGenders([
            {
                value: 'Nam',
                label: 'Nam'
            },
            {
                value: 'Nữ',
                label: 'Nữ'
            },
            {
                value: 'Nam/Nữ',
                label: 'Nam/Nữ'
            }
        ])
    }, [categoriesDetail, discounts, brands, logos])

    const handleOnchangeCategories = (selectCategory) => {
        setSelectCategory(selectCategory)
    }
    
    const handleOnchangeDiscount = (selectDiscount) => {
        setSelectDiscount(selectDiscount)
    }

    const handleOnchangeImage = async (e) => {
        let files = e.target.files
        let file = files[0]
        if (file) {
            //convert file to base64
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            setSelectImage({
                image: base64,
                previewImgURL: objectUrl
            })
        }
    }

    const handhandleOnchangeBrands = (selectBrand) => {
        setSelectBrand(selectBrand)
    }

    const handleOnchangeSize = (e) => {
        let arr = [...listSizes]
        if (e.target.checked) {
            arr.push(+e.target.value)
        }
        else {
            arr = arr.filter(item => item !== +e.target.value)
        }
        setListSizes(arr)
    }

    const handleOnchangeColor = (e) => {
        let arr = [...listColors]
        if (e.target.checked) {
            arr.push(+e.target.value)
        }
        else {
            arr = arr.filter(item => item !== +e.target.value)
        }
        setListColors(arr)
    }

    const handhandleOnchangeLogos = (selectLogo) => {
        setSelectLogo(selectLogo)
    }

    const handhandleOnchangeGender = (selectGender) => {
        setSelectGender(selectGender)
    }

    const handleUpdateProduct = (e) => {
        e.preventDefault()
        let product = {
            id: params.get('id'),
            name: selectObject?.name,
            code: selectObject?.code,
            price: +(selectObject?.price),
            categoryDetailId: +selectCategory?.value,
            discountId: +selectDiscount?.value,
            image: selectImage?.image,
            productionSite: selectObject?.productionSite,
            releaseDate: moment(selectReleaseDate).format('MM/DD/YYYY'),
            brandId: +selectBrand?.value,
            material: selectObject?.material,
            quantity: +selectObject?.quantity,
            logoId: +selectLogo?.value,
            gender: selectGender,
            listSizes,
            listColors,
        }
        updateProductRedux(product, categoryType, accessToken, params.get('page'))
        navigate({
            pathname: path.MANAGE_PRODUCTS_SHOES,
            page: params.get('page') ? params.get('page') : 1
        }) 
    }
    
    return (
        <>
            {
                // isLoading ? 
                // <Loading />
                // :
                <div>
                    <Navbar />
                    <div className='row gx-0'>
                        <div className='col-2'>
                            <Sidebar active='product' activeChild={'shoes'}/>
                        </div>
                        <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h2>Edit {TitleProduct[categoryType]}</h2>
                            </div>
                            <hr/>
                            <div className='manage-shoes-create-form mx-2 my-4'>
                                <form className='px-2'>
                                    <div className='form row'>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputName" 
                                                value={selectObject.name}
                                                onChange={(e) => setSelectObject({
                                                    ...selectObject,
                                                    name: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label className="form-label">Category name</label>
                                            <Select
                                                value={selectCategory}
                                                onChange={handleOnchangeCategories}
                                                options={listCategories}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputCode" className="form-label">Code</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputCode" 
                                                value={selectObject.code}
                                                onChange={(e) => setSelectObject({
                                                    ...selectObject,
                                                    code: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputFirstPrice" className="form-label">Price</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputFirstPrice" 
                                                value={selectObject.price}
                                                onChange={(e) => setSelectObject({
                                                    ...selectObject,
                                                    price: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputLastName" className="form-label">Discount</label>
                                            <Select
                                                value={selectDiscount}
                                                onChange={handleOnchangeDiscount}
                                                options={listDiscount}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputImage" className="form-label">Image root</label>
                                            <input 
                                                type="file" 
                                                className="form-control" 
                                                id="exampleInputImage" 
                                                onChange={(e) => handleOnchangeImage(e)}
                                            />
                                            {
                                                selectImage.previewImgURL ? 
                                                <div 
                                                    className='mt-2'
                                                    style={{
                                                        width: '80%', 
                                                        height: '100px', 
                                                        background: `url(${selectImage.previewImgURL}) 0% 0% / contain no-repeat`, 
                                                    }}
                                                ></div> 
                                                : ''
                                            }
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputLastName" className="form-label">Brand</label>
                                            <Select
                                                value={selectBrand}
                                                onChange={handhandleOnchangeBrands}
                                                options={listBrands}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputSite" className="form-label">Production site</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputSite" 
                                                value={selectObject.productionSite}
                                                onChange={(e) => setSelectObject({
                                                    ...selectObject,
                                                    productionSite: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputReleaseDate" className="form-label">Release date</label>
                                            <DatePicker 
                                                // value={selectReleaseDate}
                                                className='form-control'
                                                dateFormat='MM/dd/yyyy'
                                                selected={selectReleaseDate}
                                                onChange={(date) => setSelectReleaseDate(date)}
                                            />
                                        </div>
                                        {
                                            sizes && sizes.length > 0 ? 
                                            <div className="mb-3 col-4">
                                                <label htmlFor="exampleInputSize" className="form-label">Size</label>
                                                {
                                                    categoryType === categorieType.SHOES_SANDAL ? 
                                                    <div className='row'>
                                                        {   
                                                            sizes.map((item, index) => {
                                                                return (
                                                                    <div className='col-5 mb-3' key={index}>
                                                                        <input 
                                                                            checked={
                                                                                listSizes.some(size => size === item.id) ? true : false
                                                                            }
                                                                            type="checkbox" 
                                                                            className="form-check-input" 
                                                                            id={`checkItem${item.name}`}
                                                                            value={item.id}
                                                                            onChange={(e) => handleOnchangeSize(e)}
                                                                        />
                                                                        <label 
                                                                            className="form-check-label ps-2" 
                                                                            htmlFor={`checkItem${item.name}`}
                                                                        >
                                                                            {item.name}
                                                                        </label>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    : ''
                                                }
                                    
                                                {
                                                    categoryType === categorieType.BAG_BALO ?
                                                    <div>
                                                        <div className='row'>
                                                            <div className='col-4'>
                                                                <label htmlFor='inputSizeWidth' className='form-label'>Chiều rộng</label>
                                                                <input 
                                                                    className='form-control' 
                                                                    id='inputSizeWidth'
                                                                    value={listSizes.sizeWidth}
                                                                    onChange={(e) => setListSizes({
                                                                        ...listSizes,
                                                                        sizeWidth: e.target.value
                                                                    })}
                                                                />
                                                            </div>
                                                            <div className='col-4'>
                                                                <label htmlFor='inputSizeHeight' className='form-label'>Chiều dài</label>
                                                                <input 
                                                                    className='form-control' 
                                                                    id='inputSizeHeight'
                                                                    value={listSizes.sizeHeight}
                                                                    onChange={(e) => setListSizes({
                                                                        ...listSizes,
                                                                        sizeHeight: e.target.value
                                                                    })}
                                                                />
                                                            </div>
                                                            <div className='col-4'>
                                                                <label htmlFor='inputSizeD' className='form-label'>Chiều dày</label>
                                                                <input 
                                                                    className='form-control' 
                                                                    id='inputSizeD'
                                                                    value={listSizes.sizeD}
                                                                    onChange={(e) => setListSizes({
                                                                        ...listSizes,
                                                                        sizeD: e.target.value
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''
                                                }
                                            </div>
                                            : ''
                                        }
                                        <div 
                                            className="mb-3 col-4"
                                            // style={{ background: '#453c3c' }}
                                        >
                                            <label 
                                                htmlFor="exampleInputColor" 
                                                className="form-label"
                                                // style={{ color: '#fff'}}
                                            >   
                                                Color
                                            </label>
                                            <div className='row'>
                                                {
                                                    colors && colors.length > 0 &&
                                                    colors.map((item, index) => {
                                                        let check = listColors.some(color => color === item.id) ? true : false
                                                        return (
                                                            <div className='col-5 pb-1 position-relative' key={index}>
                                                                <FontAwesomeIcon 
                                                                    className={check ? 'position-absolute' : 'position-absolute d-none'}
                                                                    icon={faCheck} 
                                                                    style={{ 
                                                                        color: '#00ffff',
                                                                        top: '12px',
                                                                        left: '22px'
                                                                    }}
                                                                />
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="form-check-input p-3" 
                                                                    id={`checkItem${item.name}`}
                                                                    style={{ background: `${ListColorsProduct[item.name]}`}}
                                                                    value={item.id}
                                                                    onChange={(e) => handleOnchangeColor(e)}
                                                                />
                                                                <label 
                                                                    className="form-check-label ps-2" 
                                                                    htmlFor={`checkItem${item.name}`}
                                                                    style={{ color: `${ListColorsProduct[item.name]}`}}
                                                                >
                                                                    {item.name}
                                                                </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputLastName" className="form-label">Logos</label>
                                            <Select
                                                value={selectLogo}
                                                onChange={handhandleOnchangeLogos}
                                                options={listLogos}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputSite" className="form-label">Quantity</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputSite" 
                                                value={selectObject.quantity}
                                                onChange={(e) => setSelectObject({
                                                    ...selectObject,
                                                    quantity: +e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlhtmlFor="exampleInputMaterial" className="form-label">Material</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputMaterial" 
                                                value={selectObject.material}
                                                onChange={(e) => setSelectObject({
                                                    ...selectObject,
                                                    material: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="exampleInputGender" className="form-label">Gender</label>
                                            <Select
                                                value={selectGender}
                                                onChange={handhandleOnchangeGender}
                                                options={listGenders}
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-root"
                                        onClick={(e) => handleUpdateProduct(e)}
                                    >
                                        Lưu
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        accessToken: state.auth.token,
        products: state.product.products,
        categoriesDetail: state.category.categoriesDetail,
        discounts: state.discount.discounts,
        brands: state.brand.brands,
        colors: state.color.colors,
        logos: state.logo.logos,
        sizes: state.size.sizes,
        isLoading: state.product.isLoadingProduct
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoriesDetailByTypeRedux: (accessToken, categoryType) => dispatch(actions.getAllCategoriesDetailByType(accessToken, categoryType)),
        getAllDiscountsRedux: (accessToken) => dispatch(actions.getAllDiscounts(accessToken)),
        getAllBrandsRedux: (accessToken) => dispatch(actions.getAllBrands(accessToken)),
        getAllSizesByTypeRedux: (accessToken, type) => dispatch(actions.getAllSizesByType(accessToken, type)),
        getAllColorsRedux: (accessToken) => dispatch(actions.getAllColors(accessToken)),
        getAllLogosRedux: (accessToken) => dispatch(actions.getAllLogos(accessToken)),
        getProductByIdRedux: (id, accessToken) => dispatch(actions.getProductById(id, accessToken)),
        // getAllCategoriesRedux: (accessToken) => dispatch(actions.getAllCategories(accessToken)),
        // // fetchAllCodeByTypeRedux: (discount) => dispatch(actions.fetchAllCodeByTypeProduct(discount)),
        // fetchAllColorsRedux: (type) => dispatch(actions.fetchAllColors(type)),
        updateProductRedux: (data, categorieType, accessToken, page) => dispatch(actions.updateProduct(data, categorieType, accessToken, page)),
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShoesEdit);
