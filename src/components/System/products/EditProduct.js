import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { BuildOptionSelect, BuildOptionSelectDiscount, CustomToast, ListColorsProduct } from '../../../utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import _ from 'lodash'
import Loading from '../../common/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../common/sidebars/Sidebar';
import Navbar from '../common/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { validate, validateRequire } from '../../../validate/valiedate';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';

const initState = {
    name: '',
    code: '',
    price: '',
    originalPrice: '',
    productionSite: '',
    material: '',
    quantity: 0
}

const initStateImage = {
    image: '',
    previewImgURL: ''
}

function EditProduct({ categoryType, actives }) {
    const dispatch = useDispatch()
    const { products, isLoading, message, errCode } = useSelector(state => state.product)
    const { categoriesDetail } = useSelector(state => state.category)
    const { discounts } = useSelector(state => state.discount)
    const { brands } = useSelector(state => state.brand)
    const { colors } = useSelector(state => state.color)
    const { logos } = useSelector(state => state.logo)
    const { sizes } = useSelector(state => state.size)
    const { productTypes } = useSelector(state => state.productType)
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
    const [errors, setErrors] = useState()
    const inputFileRef = useRef()

    // ComponentDidMount
    useEffect(() => {
        document.title = `Chỉnh sửa ${actives.active?.toLowerCase()}`
        dispatch(actions.refreshIsloadingStateProduct())
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
                name: products.name || '',
                code: products.code || '',
                price: products.price || '',
                originalPrice: products?.originalPrice || '',
                material: products.material || '',
                productionSite: products.productionSite || '',
                quantity: products.quantity || '',
            })
            setSelectCategory({
                label: products?.dataCategoryDetail?.name ? products.dataCategoryDetail.name : '',
                value: products?.dataCategoryDetail?.id ? products.dataCategoryDetail.id : ''
            })
            setSelectProductType({
                label: products?.dataProductType?.name ? products?.dataProductType?.name : '',
                value: products?.dataProductType?.id ? products.dataProductType.id : ''
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
        const dataCategory = BuildOptionSelect(categoriesDetail?.at(0)?.dataCategory)
        const dataProductTypes = BuildOptionSelect(productTypes)
        const dataDiscount = BuildOptionSelectDiscount(discounts)
        const dataBrand = BuildOptionSelect(brands)
        const dataLogo = BuildOptionSelect(logos)

        setListCategories(dataCategory)
        setListProductTypes(dataProductTypes)
        setListDiscount(dataDiscount)
        setListBrands(dataBrand)
        setListLogos(dataLogo)
    }, [categoriesDetail, discounts, brands, logos, productTypes])

    useEffect(() => {
        if (message) {
            if (errCode === 0) {
                navigate({
                    pathname: actives.pathToHome,
                    search: createSearchParams({
                        page: params.get('page') ? params.get('page') : 1
                    }).toString()
                })
            }
            else {
                toast.error(CustomToast(message), { autoClose: 2000 })
                dispatch(actions.refreshInfoReponseProduct())
            }
        }
    }, [message])

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

    const handleClick = () => {
        inputFileRef.current?.click()
    }

    const handleUpdateProduct = () => {
        console.log('img: ', selectImage);
        const errObj = validate(selectObject)
        const errCategory = validateRequire('Thể loại', selectCategory?.value)
        const errProductType = validateRequire('Kiểu sản phẩm', selectProductType?.value)
        const errDiscount = validateRequire('Mã giảm giá', selectDiscount?.value)
        const errDate = validateRequire('Ngày phát hành', selectReleaseDate)
        const errBrand = validateRequire('Thương hiệu', selectBrand?.value)
        const errLogo = validateRequire('Logo', selectLogo?.value)
        const errGender = validateRequire('Giới tính', selectGender?.value)
        const errImage = validateRequire('Ảnh gốc', selectImage?.previewImgURL)
        const errSize = listSizes.length === 0 ? 'Kích thước không được để trống' : ''
        const errColor = listColors.length === 0 ? 'Màu sắc không được để trống' : ''
        let error = ''
        if (Object.keys(errObj).length > 0 || errCategory || errProductType || errDiscount || errDate || errBrand || errLogo || errColor || errGender || errImage) {
            error = {
                ...errObj,
                category: errCategory,
                proType: errProductType,
                discount: errDiscount,
                brand: errBrand,
                date: errDate,
                logo: errLogo,
                color: errColor,
                gender: errGender,
                image: errImage
            }
        }
        else if (sizes.length > 0 && errSize) {
            error = {
                ...error,
                size: errSize
            }
        }

        if (error) {
            setErrors(error)
        }
        else {
            const listSizesDeleted = []
            const listSizesAdded = []
            const listColorsDeleted = []
            const listColorsAdded = []

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

            const formData = new FormData()
            const product = {
                name: selectObject?.name,
                code: selectObject?.code,
                price: +(selectObject?.price),
                originalPrice: +selectObject?.originalPrice,
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
            formData.append('product', JSON.stringify(product))
            formData.append('image', selectImage.image)
            dispatch(actions.updateProduct(params.get('id') || 1, formData, categoryType, params.get('page'), 'single', 'product'))
        }
    }

    return (
        <div>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='product' activeChild={actives?.active} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Chỉnh sửa {actives?.active.toLowerCase()}</h2>
                    </div>
                    <hr />
                    {
                        isLoading ?
                            <Loading />
                            :
                            <div className='my-4'>
                                <div className='row'>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicName">
                                        <Form.Label className='text-muted fw-500'>Tên sản phẩm<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập tên sản phẩm"
                                            value={selectObject.name}
                                            onChange={e => {
                                                setSelectObject({
                                                    ...selectObject,
                                                    name: e.target.value
                                                })
                                                setErrors({
                                                    ...errors,
                                                    name: ''
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.name ? <span className='error'>{errors.name}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicCate">
                                        <Form.Label className='text-muted fw-500'>Thể loại<span className='text-danger'>*</span></Form.Label>
                                        <Select
                                            value={selectCategory}
                                            onChange={handleOnchangeCategories}
                                            options={listCategories}
                                        />
                                        {
                                            errors && errors.category ? <span className='error'>{errors.category}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicProType">
                                        <Form.Label className='text-muted fw-500'>Kiểu sản phẩm<span className='text-danger'>*</span></Form.Label>
                                        <Select
                                            value={selectProductType}
                                            onChange={handleOnchangeProductType}
                                            options={listProductTypes}
                                        />
                                        {
                                            errors && errors.proType ? <span className='error'>{errors.proType}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicCode">
                                        <Form.Label className='text-muted fw-500'>Mã sản phẩm<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={selectObject.code}
                                            disabled
                                        />
                                        {
                                            errors && errors.code ? <span className='error'>{errors.code}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicOriginPrice">
                                        <Form.Label className='text-muted fw-500'>Giá gốc<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập giá gốc sản phẩm"
                                            value={selectObject.originalPrice}
                                            onChange={e => {
                                                setSelectObject({
                                                    ...selectObject,
                                                    originalPrice: e.target.value
                                                })
                                                setErrors({
                                                    ...errors,
                                                    originalPrice: ''
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.originalPrice ? <span className='error'>{errors.originalPrice}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicPrice">
                                        <Form.Label className='text-muted fw-500'>Giá bán<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập giá bán sản phẩm"
                                            value={selectObject.price}
                                            onChange={e => {
                                                setSelectObject({
                                                    ...selectObject,
                                                    price: e.target.value
                                                })
                                                setErrors({
                                                    ...errors,
                                                    price: ''
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.price ? <span className='error'>{errors.price}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicQuantity">
                                        <Form.Label className='text-muted fw-500'>Số lượng<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập số lượng sản phẩm"
                                            value={selectObject.quantity}
                                            onChange={e => {
                                                setSelectObject({
                                                    ...selectObject,
                                                    quantity: +e.target.value
                                                })
                                                setErrors({
                                                    ...errors,
                                                    quantity: ''
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.quantity ? <span className='error'>{errors.quantity}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicDiscount">
                                        <Form.Label className='text-muted fw-500'>Mã giảm giá<span className='text-danger'>*</span></Form.Label>
                                        <Select
                                            value={selectDiscount}
                                            onChange={handleOnchangeDiscount}
                                            options={listDiscount}
                                        />
                                        {
                                            errors && errors.discount ? <span className='error'>{errors.discount}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicBrand">
                                        <Form.Label className='text-muted fw-500'>Thương hiệu<span className='text-danger'>*</span></Form.Label>
                                        <Select
                                            value={selectBrand}
                                            onChange={handhandleOnchangeBrands}
                                            options={listBrands}
                                        />
                                        {
                                            errors && errors.brand ? <span className='error'>{errors.brand}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicSite">
                                        <Form.Label className='text-muted fw-500'>Nơi sản xuất<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập nơi sản xuất sản phẩm"
                                            value={selectObject.productionSite}
                                            onChange={e => {
                                                setSelectObject({
                                                    ...selectObject,
                                                    productionSite: e.target.value
                                                })
                                                setErrors({
                                                    ...errors,
                                                    productionSite: ''
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.productionSite ? <span className='error'>{errors.productionSite}</span> : ''
                                        }
                                    </Form.Group>

                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleInputReleaseDate" className="form-label">Ngày phát hành<span className='text-danger'>*</span></label>
                                        <br></br>
                                        <DatePicker
                                            // value={selectReleaseDate}
                                            className='form-control'
                                            dateFormat='MM/dd/yyyy'
                                            placeholderText='Nhập hoặc chọn ngày phát hành (MM/dd/yyyy)'
                                            selected={selectReleaseDate}
                                            onChange={date => {
                                                setSelectReleaseDate(date)
                                                setErrors({
                                                    ...errors,
                                                    date: ''
                                                })
                                            }}
                                        />
                                        <br></br>
                                        {
                                            errors && errors.date ? <span className='error'>{errors.date}</span> : ''
                                        }
                                    </div>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicLogo">
                                        <Form.Label className='text-muted fw-500'>Logo<span className='text-danger'>*</span></Form.Label>
                                        <Select
                                            value={selectLogo}
                                            onChange={handhandleOnchangeLogos}
                                            options={listLogos}
                                        />
                                        {
                                            errors && errors.logo ? <span className='error'>{errors.logo}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicMaterial">
                                        <Form.Label className='text-muted fw-500'>Chất liệu<span className='text-danger'>*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập chất liệu sản phẩm"
                                            value={selectObject.material}
                                            onChange={e => {
                                                setSelectObject({
                                                    ...selectObject,
                                                    material: e.target.value
                                                })
                                                setErrors({
                                                    ...errors,
                                                    material: ''
                                                })
                                            }}
                                        />
                                        {
                                            errors && errors.material ? <span className='error'>{errors.material}</span> : ''
                                        }
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicGender">
                                        <Form.Label className='text-muted fw-500'>Giới tính<span className='text-danger'>*</span></Form.Label>
                                        <Select
                                            value={selectGender}
                                            onChange={handhandleOnchangeGender}
                                            options={listGenders}
                                        />
                                        {
                                            errors && errors.gender ? <span className='error'>{errors.gender}</span> : ''
                                        }
                                    </Form.Group>
                                    {
                                        sizes && sizes.length > 0 ?
                                            <div className="mb-3 col-6">
                                                <label htmlFor="exampleInputSize" className="form-label text-muted fw-500">Kích thước<span className='text-danger'>*</span></label>
                                                <div className='row gy-2'>
                                                    {
                                                        sizes.map((item, index) => {
                                                            return (
                                                                <div
                                                                    className='col-3'
                                                                    key={index}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={listSizes.some(size => size === item.id)}
                                                                        className="form-control"
                                                                        id={`checkItem${item.name}`}
                                                                        value={item.id}
                                                                        onChange={e => handleOnchangeSize(e)}
                                                                        hidden={true}
                                                                    />
                                                                    <label
                                                                        className={listSizes.some(size => size === item.id) ? 'form-check-label rounded active py-2 w-100 text-center' : 'form-check-label rounded py-2 w-100 text-center border'}
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
                                        className="mb-3 col-6"
                                    >
                                        <label htmlFor="exampleInputColor" className="form-label text-muted fw-500">Màu sắc<span className='text-danger'>*</span></label>
                                        <div className='row gy-2'>
                                            {
                                                colors && colors.length > 0 &&
                                                colors.map((item, index) => {
                                                    let check = listColors.some(color => color === item.id) ? true : false
                                                    return (
                                                        <div className='col-3 d-flex align-items-center pb-1 position-relative' key={index}>
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
                                                                style={{ background: `${ListColorsProduct[item.name]}` }}
                                                                value={item.id}
                                                                onChange={(e) => handleOnchangeColor(e)}
                                                            />
                                                            <label
                                                                className="form-check-label ps-2"
                                                                htmlFor={`checkItem${item.name}`}
                                                                style={{ color: `${ListColorsProduct[item.name]}` }}
                                                            >
                                                                {item.name}
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="exampleInputImage" className="form-label text-muted fw-500">Ảnh gốc<span className='text-danger'>*</span></label>
                                        <input
                                            ref={inputFileRef}
                                            type="file"
                                            className="d-none"
                                            id="exampleInputImage"
                                            onChange={e => handleOnchangeImage(e)}
                                        />
                                        <button
                                            type='button'
                                            className='btn border fw-500 ms-2'
                                            onClick={handleClick}
                                        >
                                            Chọn ảnh
                                        </button>
                                        {
                                            selectImage.previewImgURL ?
                                                <div
                                                    className='mt-2'
                                                    style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        background: `url(${selectImage.previewImgURL}) 0% 0% / contain no-repeat`,
                                                    }}
                                                ></div>
                                                :
                                                <div
                                                    className='mt-2 border rounded'
                                                    style={{
                                                        width: '60%',
                                                        height: '200px',
                                                    }}
                                                ></div>
                                        }
                                        {
                                            errors && errors.image ? <span className='error'>{errors.image}</span> : ''
                                        }
                                    </div>
                                    <Form.Group className="mb-3 col-6" controlId="formBasicGender">
                                        <Form.Label className='text-muted fw-500'>Trạng thái<span className='text-danger'>*</span></Form.Label>
                                        <Select
                                            value={selectStatus}
                                            onChange={handhandleOnchangeStatus}
                                            options={listStatus}
                                        />
                                        {
                                            errors && errors.gender ? <span className='error'>{errors.gender}</span> : ''
                                        }
                                    </Form.Group>
                                </div>
                                <button
                                    className="btn btn-root fw-500"
                                    onClick={(e) => handleUpdateProduct(e)}
                                >
                                    <FontAwesomeIcon icon={faBookmark} /> Lưu
                                </button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
