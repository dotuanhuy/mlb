import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { BuildOptionSelect, BuildOptionSelectDiscount, ListColorsProduct, TitleProduct } from '../../../utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import _ from 'lodash'
import Loading from '../../common/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';

const initState = {
    name: '',
    code: '',
    price: '',
    productionSite: '',
    material: '',
    quantity: 0
}

const initStateImage = {
    image: '',
    previewImgURL: ''
}

function ManageShoesEdit({
    categoryType,
    actives,
    refreshIsloadingStateProductRedux
}) {
    const dispatch = useDispatch()
    const {products, isLoading} = useSelector(state => state.product)
    const {categoriesDetail} = useSelector(state => state.category)
    const {discounts} = useSelector(state => state.discount)
    const {brands} = useSelector(state => state.brand)
    const {colors} = useSelector(state => state.color)
    const {logos} = useSelector(state => state.logo)
    const {sizes} = useSelector(state => state.size)
    const {productTypes} = useSelector(state => state.productType)
    const navigate = useNavigate()
    const [selectCategory, setSelectCategory] = useState('')
    const [selectProductType, setSelectProductType] = useState('')
    const [selectObject, setSelectObject] = useState(initState)
    const [selectDiscount, setSelectDiscount] = useState('')
    const [selectImage, setSelectImage] = useState(initStateImage)
    const [selectReleaseDate, setSelectReleaseDate] = useState('')
    const [selectBrand, setSelectBrand] = useState('')    
    const [selectLogo, setSelectLogo] = useState('')
    const [selectGender, setSelectGender] = useState('')
    const [selectStatus, setSelectStatus] = useState('')
    const [listCategories, setListCategories] = useState([]) 
    const [listDiscount, setListDiscount] = useState([])
    const [listBrands, setListBrands] = useState([])
    const [listColors, setListColors] = useState([])
    const [listLogos, setListLogos] = useState([])
    const [listSizes, setListSizes] = useState([])
    const [listGenders, setListGenders] = useState([])
    const [listStatus, setListStatus] = useState([])
    const [listProductTypes, setListProductTypes] = useState([])
    const [params] = useSearchParams()

    // ComponentDidMount
    useEffect(() => {
        refreshIsloadingStateProductRedux()
        dispatch(actions.getAllCategoriesDetailByType())
        dispatch(actions.getAllDiscounts())
        dispatch(actions.getAllBrands())
        dispatch(actions.getAllSizesByType(categoryType))
        dispatch(actions.getAllColors())
        dispatch(actions.getAllLogos())
        dispatch(actions.getProductTypeByCategoryId(categoryType))
        dispatch(actions.getProductById(params.get('id')))
    }, [])

    useEffect(() => {
        if (products) {
            setSelectObject({
                name: products.name,
                code: products.code,
                price: products.price,
                material: products.material,
                productionSite: products.productionSite,
                quantity: products.quantity,
            })
            setSelectCategory({
                label: products?.dataCategoryDetail?.name ? products.dataCategoryDetail.name : '', 
                value: products?.dataCategoryDetail?.id ? products.dataCategoryDetail.id: ''
            })
            setSelectProductType({
                label: products?.dataProductType?.name ? products?.dataProductType?.name : '',
                value: products?.dataProductType?.id ? products.dataProductType.id: ''
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
            setSelectStatus({
                value: products?.status ? products.status : '',
                label: products?.status === 1 ? 'active' : 'inactive'
            })
            if (products?.image) {
                setSelectImage({
                    ...selectImage,
                    previewImgURL: products?.image
                })
            }
            if (products?.dataColorDetail?.length > 0) {
                setListColors(products.dataColorDetail.map(item => item.colorId))
            }
            if (products?.releaseDate) {
                setSelectReleaseDate(new Date(products.releaseDate))
            }
            if (products?.dataSizeDetail?.length > 0) {
               setListSizes(products.dataSizeDetail.map(item => item.id))
            }
        }
    }, [products])

    useEffect(() => {
        let dataCategory = BuildOptionSelect(categoriesDetail?.at(0)?.dataCategory)
        let dataProductTypes = BuildOptionSelect(productTypes)
        let dataDiscount = BuildOptionSelectDiscount(discounts)
        let dataBrand = BuildOptionSelect(brands)
        let dataLogo = BuildOptionSelect(logos)

        setListCategories(dataCategory)
        setListProductTypes(dataProductTypes)
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
        setListStatus([
            {
                value: 1,
                label: 'active'
            },
            {
                value: 2,
                label: 'inactive'
            }
        ])
    }, [categoriesDetail, discounts, brands, logos, productTypes])

    const handleOnchangeCategories = (selectCategory) => {
        setSelectCategory(selectCategory)
    }
    
    const handleOnchangeProductType = (selectProductType) => {
        setSelectProductType(selectProductType)
    }

    const handleOnchangeDiscount = (selectDiscount) => {
        setSelectDiscount(selectDiscount)
    }

    const handleOnchangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            setSelectImage({
                image: file,
                previewImgURL: URL.createObjectURL(file)
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

    const handhandleOnchangeStatus = (selectStatus) => {
        setSelectGender(selectStatus)
    }
    const handleUpdateProduct = (e) => {
        e.preventDefault()
        let listSizesDeleted = []
        let listSizesAdded = []
        let listColorsDeleted = []
        let listColorsAdded = [] 

        products?.dataSizeDetail?.forEach(item => {
            if (listSizes.every(element => element !== item.id)) {
                listSizesDeleted.push(item.id);
            }
        })
        listSizes.forEach(item => {
            if (products?.dataSizeDetail?.every(element => element.id !== item)) {
                listSizesAdded.push(item);
            }
        })
        
        products?.dataColorDetail?.forEach(item => {
            if (listColors.every(element => element !== item.colorId)) {
                listColorsDeleted.push(item.colorId);
            }
        })
        listColors.forEach(item => {
            if (products?.dataColorDetail?.every(element => element.colorId !== item)) {
                listColorsAdded.push(item);
            }
        })

        let product = {
            name: selectObject?.name,
            code: selectObject?.code,
            price: +(selectObject?.price),
            categoryDetailId: +selectCategory?.value,
            productTypeId: +selectProductType?.value,
            discountId: +selectDiscount?.value,
            imageUrl: products?.image,
            image: selectImage?.previewImgURL,
            productionSite: selectObject?.productionSite,
            releaseDate: moment(selectReleaseDate).format('MM/DD/YYYY'),
            brandId: +selectBrand?.value,
            material: selectObject?.material,
            quantity: +selectObject?.quantity,
            logoId: +selectLogo?.value,
            gender: selectGender?.value,
            status: +selectStatus?.value,
            listSizesDeleted,
            listSizesAdded,
            listColorsDeleted,
            listColorsAdded
        }
        if (selectImage.image) {
            const formData = new FormData()
            formData.append('image', selectImage.image)
            formData.append('product', JSON.stringify(product))
            dispatch(actions.updateProductAndImage(params.get('id'), formData, categoryType, params.get('page'), 'single'))
        }
        else {
            dispatch(actions.updateProduct(params.get('id'), product, categoryType, params.get('page')))
        }
        navigate({
            pathname: actives.pathToHome,
            search: createSearchParams({
                page: params.get('page') ? params.get('page') : 1
            }).toString()
        }) 
    }
    
    return (
        <div>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='product' activeChild={actives?.active}/>
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Edit {TitleProduct[categoryType]}</h2>
                    </div>
                    <hr/>
                    {
                        isLoading ? 
                        <Loading />
                        :
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
                                        <label className="form-label">Product type</label>
                                        <Select
                                            value={selectProductType}
                                            onChange={handleOnchangeProductType}
                                            options={listProductTypes}
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
                                    <div className="mb-3 col-4">
                                    <label htmlFor="exampleInputStatus" className="form-label">Status</label>
                                        <Select
                                            value={selectStatus}
                                            onChange={handhandleOnchangeStatus}
                                            options={listStatus}
                                        />
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-root"
                                    onClick={(e) => handleUpdateProduct(e)}
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>

    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShoesEdit);
