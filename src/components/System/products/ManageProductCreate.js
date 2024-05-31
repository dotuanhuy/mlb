import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import './style.scss'
import Navbar from '../common/navbar/Navbar';
import TableProducts from './TableProducts';
import Sidebar from '../common/sidebars/Sidebar';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';
import { BuildOptionSelectDiscount, ListColorsProduct } from '../../../utils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { BuildOptionSelect } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '../../../utils/funcRandom';

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

function ManageShoesCreate({ categoryType, actives }) {
    const dispatch = useDispatch()
    const { categoriesDetail } = useSelector(state => state.category)
    const { discounts } = useSelector(state => state.discount)
    const { brands } = useSelector(state => state.brand)
    const { colors } = useSelector(state => state.color)
    const { logos } = useSelector(state => state.logo)
    const { sizes } = useSelector(state => state.size)
    const { productTypes } = useSelector(state => state.productType)
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

    const handhandleOnchangeLogos = (selectLogo) => {
        setSelectLogo(selectLogo)
    }

    const handhandleOnchangeGender = (selectGender) => {
        setSelectGender(selectGender)
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

    const handleCreateNewProduct = (e) => {
        e.preventDefault()
        let product = {
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
        if (selectImage.image) {
            const formData = new FormData()
            formData.append('image', selectImage.image)
            formData.append('product', JSON.stringify(product))
            dispatch(actions.createNewProduct(formData, categoryType, params.get('page') ? params.get('page') : 1))
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
        }
        else {
            alert('Please, choose image!')
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
                        <h2>Tạo mới {actives.active}</h2>
                    </div>
                    <hr />
                    <div className='manage-shoes-create-form mx-2 my-4'>
                        <form className='px-2'>
                            <div className='form row'>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputName" className="form-label">Tên sản phẩm<span className='text-danger'>*</span></label>
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
                                <div className="mb-3 col-6">
                                    <label className="form-label">Loại sản phẩm<span className='text-danger'>*</span></label>
                                    <Select
                                        value={selectCategory}
                                        onChange={handleOnchangeCategories}
                                        options={listCategories}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label className="form-label">Kiểu sản phẩm<span className='text-danger'>*</span></label>
                                    <Select
                                        value={selectProductType}
                                        onChange={handleOnchangeProductType}
                                        options={listProductTypes}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputCode" className="form-label">Mã sản phẩm<span className='text-danger'>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputCode"
                                        value={selectObject.code}
                                        // onChange={(e) => setSelectObject({
                                        //     ...selectObject,
                                        //     code: e.target.value
                                        // })}
                                        disabled
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputFirstPrice" className="form-label">Giá gốc<span className='text-danger'>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputFirstPrice"
                                        value={selectObject.originalPrice}
                                        onChange={(e) => setSelectObject({
                                            ...selectObject,
                                            originalPrice: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputFirstPrice" className="form-label">Giá bán<span className='text-danger'>*</span></label>
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
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputSite" className="form-label">Số lượng<span className='text-danger'>*</span></label>
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
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputLastName" className="form-label">Mã giảm giá<span className='text-danger'>*</span></label>
                                    <Select
                                        value={selectDiscount}
                                        onChange={handleOnchangeDiscount}
                                        options={listDiscount}
                                    />
                                </div>
                                
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputBrand" className="form-label">Thương hiệu<span className='text-danger'>*</span></label>
                                    <Select
                                        value={selectBrand}
                                        onChange={handhandleOnchangeBrands}
                                        options={listBrands}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputSite" className="form-label">Nơi sản xuất<span className='text-danger'>*</span></label>
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
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputReleaseDate" className="form-label">Ngày phát hành<span className='text-danger'>*</span></label>
                                    <br></br>
                                    <DatePicker
                                        withPortal={100}
                                        className='form-control'
                                        dateFormat='MM/dd/yyyy'
                                        selected={selectReleaseDate}
                                        onChange={(date) => setSelectReleaseDate(date)}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputLogo" className="form-label">Logo<span className='text-danger'>*</span></label>
                                    <Select
                                        value={selectLogo}
                                        onChange={handhandleOnchangeLogos}
                                        options={listLogos}
                                    />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputMaterial" className="form-label">Chất liệu<span className='text-danger'>*</span></label>
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
                                <div className="mb-3 col-6">
                                    <label htmlFor="exampleInputGender" className="form-label">Giới tính<span className='text-danger'>*</span></label>
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
                                </div>
                                {
                                    sizes && sizes.length > 0 ?
                                        <div className="mb-3 col-6">
                                            <label htmlFor="exampleInputSize" className="form-label">Kích thước<span className='text-danger'>*</span></label>
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
                                    <label
                                        htmlFor="exampleInputColor"
                                        className="form-label"
                                    >
                                        Màu sắc<span className='text-danger'>*</span>
                                    </label>
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
                                    <label htmlFor="exampleInputImage" className="form-label">Ảnh gốc<span className='text-danger'>*</span></label>
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
                                                    width: '100%',
                                                    height: '200px',
                                                    background: `url(${selectImage.previewImgURL}) 0% 0% / contain no-repeat`,
                                                }}
                                            ></div>
                                            : ''
                                    }
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-root fw-500"
                                onClick={(e) => handleCreateNewProduct(e)}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Tạo mới
                            </button>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageShoesCreate);
