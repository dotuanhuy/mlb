import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/navbar/Navbar';
import TableProducts from '../common/tableProducts/TableProducts';
import Sidebar from '../common/sidebars/Sidebar';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { useSearchParams } from 'react-router-dom';
import { BuildOptionSelectDiscount, TitleProduct, categorieType, ListColorsProduct } from '../../../utils';
import CommonUtils from '../../../utils/CommonUtils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { BuildOptionSelect } from '../../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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


function ManageShoesCreate({
    categoryType,
    actives,
    accessToken,
    categoriesDetail, 
    discounts, 
    brands, 
    colors, 
    logos, 
    sizes,
    productTypes,
    getAllCategoriesDetailByTypeRedux,
    getAllDiscountsRedux,
    getAllBrandsRedux,
    getAllSizesByTypeRedux,
    getAllColorsRedux,
    getAllLogosRedux,
    getProductTypeByCategoryIdRedux,
    createNewProductRedux
}) {
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
        getAllCategoriesDetailByTypeRedux(accessToken, categoryType)
        getAllDiscountsRedux(accessToken)
        getAllBrandsRedux(accessToken)
        getAllSizesByTypeRedux(accessToken, categoryType)
        getAllColorsRedux(accessToken)
        getAllLogosRedux(accessToken)
        getProductTypeByCategoryIdRedux(accessToken, categoryType)
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
            categoryDetailId: +selectCategory?.value,
            productTypeId: +selectProductType?.value,
            discountId: +selectDiscount?.value,
            image: selectImage?.image,
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
        createNewProductRedux(product, categoryType, accessToken, params.get('page') ? params.get('page') : 1)
        setSelectObject(initState)
        setSelectImage(initStateImage)
        setSelectCategory('')
        setSelectDiscount('')
        setSelectBrand('')
        setSelectLogo('')
        setSelectReleaseDate('')
        setListColors([])
        setListSizes([])
    }
    

    return (
        <div className='manage-shoes-create'>
            <Navbar />
            <div className='row gx-0'>
               <div className='col-2'>
                    <Sidebar active='product' activeChild={actives?.active}/>
                </div> 
                <div className='col-10 container bg-light mt-4 px-5 py-3 rounded'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h2>Create new {TitleProduct[categoryType]}</h2>
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
                                    <label htmlFor="exampleInputBrand" className="form-label">Brand</label>
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
                                    <label htmlFor="exampleInputLogo" className="form-label">Logo</label>
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
                                    <label htmlFor="exampleInputMaterial" className="form-label">Material</label>
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
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-root"
                                onClick={(e) => handleCreateNewProduct(e)}
                            >
                                Tạo
                            </button>
                        </form>
                    </div>
                    <div className='mt-4'>
                        <TableProducts categoryType={categoryType} actives={actives}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.token,
        categoriesDetail: state.category.categoriesDetail,
        discounts: state.discount.discounts,
        brands: state.brand.brands,
        colors: state.color.colors,
        logos: state.logo.logos,
        sizes: state.size.sizes,
        productTypes: state.productType.productTypes
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
        getProductTypeByCategoryIdRedux: (accessToken, categoryId) => dispatch(actions.getProductTypeByCategoryId(accessToken, categoryId)),
        createNewProductRedux: (data, type, accessToken, page) => dispatch(actions.createNewProduct(data, type, accessToken, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShoesCreate);
