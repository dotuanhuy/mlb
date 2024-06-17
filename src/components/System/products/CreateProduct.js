import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './style.scss'
import Navbar from '../common/navbar/Navbar';
import TableProducts from './TableProducts';
import Sidebar from '../common/sidebars/Sidebar';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';
import { BuildOptionSelectDiscount, ListColorsProduct, CustomToast } from '../../../utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { BuildOptionSelect } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '../../../utils/funcRandom';
import { Form } from 'react-bootstrap';
import { validate, validateRequire } from '../../../validate/valiedate';
import { toast } from 'react-toastify';

const initState = {
    name: '',
    code: generateRandomString(15),
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

function CreateProduct({ categoryType, actives }) {
    const dispatch = useDispatch()
    const { categoriesDetail } = useSelector(state => state.category)
    const { discounts } = useSelector(state => state.discount)
    const { brands } = useSelector(state => state.brand)
    const { colors } = useSelector(state => state.color)
    const { logos } = useSelector(state => state.logo)
    const { sizes } = useSelector(state => state.size)
    const { productTypes } = useSelector(state => state.productType)
    const { message, errCode } = useSelector(state => state.product)
    const [selectCategory, setSelectCategory] = useState('')
    const [selectObject, setSelectObject] = useState(initState)
    const [selectDiscount, setSelectDiscount] = useState('')
    const [selectImage, setSelectImage] = useState(initStateImage)
    const [selectReleaseDate, setSelectReleaseDate] = useState('')
    const [selectBrand, setSelectBrand] = useState('')
    const [selectLogo, setSelectLogo] = useState('')
    const [selectGender, setSelectGender] = useState('')
    const [selectProductType, setSelectProductType] = useState('')
    const [listCategories, setListCategories] = useState([])
    const [listDiscount, setListDiscount] = useState([])
    const [listSizes, setListSizes] = useState([])
    const [listBrands, setListBrands] = useState([])
    const [listColors, setListColors] = useState([])
    const [listLogos, setListLogos] = useState([])
    const [listProductTypes, setListProductTypes] = useState([])
    const [params] = useSearchParams()
    const [errors, setErrors] = useState()
    const inputFileRef = useRef()

    // ComponentDidMount
    useEffect(() => {
        document.title = `Thêm mới ${actives.active}`
        dispatch(actions.getAllCategoriesDetailByType(categoryType))
        dispatch(actions.getAllDiscounts())
        dispatch(actions.getAllBrands())
        dispatch(actions.getAllSizesByType(categoryType))
        dispatch(actions.getAllColors())
        dispatch(actions.getAllLogos())
        dispatch(actions.getProductTypeByCategoryId(categoryType))
    }, [])

    useEffect(() => {
        let dataCategory = BuildOptionSelect(categoriesDetail?.at(0)?.dataCategory)
        let dataDiscount = BuildOptionSelectDiscount(discounts)
        let dataBrand = BuildOptionSelect(brands)
        let dataLogo = BuildOptionSelect(logos)
        let dataProductTypes = BuildOptionSelect(productTypes)

        setListCategories(dataCategory)
        setListDiscount(dataDiscount)
        setListBrands(dataBrand)
        setListLogos(dataLogo)
        setListProductTypes(dataProductTypes)
    }, [categoriesDetail, discounts, brands, logos, productTypes])

    useEffect(() => {
        if (message) {
            if (errCode === 0) {
                toast.success(CustomToast(message), { autoClose: 2000 })
                setSelectObject({
                    ...initState,
                    code: generateRandomString(15)
                })
                setSelectImage(initStateImage)
                setSelectCategory('')
                setSelectDiscount('')
                setSelectBrand('')
                setSelectLogo('')
                setSelectReleaseDate('')
                setSelectProductType('')
                setListColors([])
                setListSizes([])
                setSelectGender('')
            }
            else if (errCode === 3) {
                setSelectObject({
                    code: generateRandomString(15)
                })
            }
            else {
                toast.error(CustomToast(message), { autoClose: 2000 })
            }
            dispatch(actions.refreshInfoReponseProduct())
        }
    }, [message])

    const handleOnchangeCategories = (selectCategory) => {
        setSelectCategory(selectCategory)
        setErrors({
            ...errors,
            category: ''
        })
    }

    const handleOnchangeProductType = (selectProductType) => {
        setSelectProductType(selectProductType)
        setErrors({
            ...errors,
            proType: ''
        })
    }

    const handleOnchangeDiscount = (selectDiscount) => {
        setSelectDiscount(selectDiscount)
        setErrors({
            ...errors,
            discount: ''
        })
    }

    const handleOnchangeImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            setSelectImage({
                image: file,
                previewImgURL: URL.createObjectURL(file)
            })
            setErrors({
                ...errors,
                image: ''
            })
        }
    }

    const handhandleOnchangeBrands = (selectBrand) => {
        setSelectBrand(selectBrand)
        setErrors({
            ...errors,
            brand: ''
        })
    }

    const handhandleOnchangeLogos = (selectLogo) => {
        setSelectLogo(selectLogo)
        setErrors({
            ...errors,
            logo: ''
        })
    }

    const handhandleOnchangeGender = (selectGender) => {
        setSelectGender(selectGender)
        setErrors({
            ...errors,
            gender: ''
        })
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
        setErrors({
            ...errors,
            size: ''
        })
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
        setErrors({
            ...errors,
            color: ''
        })
    }

    const handleClick = () => {
        inputFileRef.current?.click()
    }

    const handleCreateNewProduct = () => {
        const errObj = validate(selectObject)
        const errCategory = validateRequire('Thể loại', selectCategory?.value)
        const errProductType = validateRequire('Kiểu sản phẩm', selectProductType?.value)
        const errDiscount = validateRequire('Mã giảm giá', selectDiscount?.value)
        const errDate = validateRequire('Ngày phát hành', selectReleaseDate)
        const errBrand = validateRequire('Thương hiệu', selectBrand?.value)
        const errLogo = validateRequire('Logo', selectLogo?.value)
        const errGender = validateRequire('Giới tính', selectGender?.value)
        const errImage = validateRequire('Ảnh gốc', selectImage?.image)
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
            const product = {
                name: selectObject?.name,
                code: selectObject?.code,
                price: +(selectObject?.price),
                originalPrice: +selectObject.originalPrice,
                categoryDetailId: +selectCategory?.value,
                productTypeId: +selectProductType?.value,
                discountId: +selectDiscount?.value,
                productionSite: selectObject?.productionSite,
                releaseDate: moment(selectReleaseDate).format('MM/DD/YYYY'),
                brandId: +selectBrand?.value,
                material: selectObject?.material,
                quantity: +selectObject?.quantity,
                logoId: +selectLogo?.value,
                gender: selectGender?.value,
                listSizesAdded: listSizes,
                listColorsAdded: listColors
            }
            const formData = new FormData()
            formData.append('image', selectImage.image)
            formData.append('product', JSON.stringify(product))
            dispatch(actions.createNewProduct(formData, 'single', 'product', categoryType, params.get('page') || 1))
        }
    }

    return (
        <div className='manage-shoes-create'>
            <Navbar />
            <div className='row gx-0'>
                <div className='col-2'>
                    <Sidebar active='product' activeChild={actives?.active} />
                </div>
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Thêm mới {actives.active?.toLowerCase()}</h2>
                    </div>
                    <hr />
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
                                <label htmlFor="exampleInputReleaseDate" className="form-label text-muted fw-500">Ngày phát hành<span className='text-danger'>*</span></label>
                                <br></br>
                                <DatePicker
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
                                    options={
                                        [
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
                                        ]
                                    }
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
                                        {
                                            errors && errors.size ? <span className='error'>{errors.size}</span> : ''
                                        }
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
                                            return (
                                                <div className='col-3 d-flex align-items-center pb-1 position-relative' key={index}>
                                                    <FontAwesomeIcon
                                                        className={listColors.some(color => color === item.id) ? 'position-absolute' : 'position-absolute d-none'}
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
                                {
                                    errors && errors.color ? <span className='error'>{errors.color}</span> : ''
                                }
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

                        </div>
                        <button
                            className="btn btn-root fw-500"
                            onClick={handleCreateNewProduct}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Tạo mới
                        </button>
                    </div>
                    <div className='mt-4'>
                        <TableProducts categoryType={categoryType} actives={actives} />
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
