import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../../../nav/nav';
import Select from 'react-select';
import * as actions from '../../../../../store/actions'
import TableProducts from '../TableProducts/TableProducts';
import { useNavigate } from 'react-router-dom';
import { path, Role, allCode, formatDateVN } from '../../../../../utils';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import CommonUtils from '../../../../../utils/CommonUtils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const cookies = new Cookies();

const initState = {
    name: '',
    productCode: '',
    price: '',
    productionSite: '',
    material: ''
}

const initStateImage = {
    image: null,
    previewImgURL: null
}

function ManageShoesCreate({
    categories, 
    discounts, 
    brands, 
    colors, 
    logos, 
    sizes,
    genders,
    getAllCategoriesRedux, 
    fetchAllCodeByTypeRedux, 
    fetchAllColorsRedux,
    createNewProductRedux
}) {
    const navigate = useNavigate()
    const [selectCategory, setSelectCategory] = useState()
    const [selectObject, setSelectObject] = useState(initState)
    const [selectDiscount, setSelectDiscount] = useState()
    const [selectImage, setSelectImage] = useState(initStateImage)
    const [selectReleaseDate, setSelectReleaseDate] = useState()
    const [selectBrand, setSelectBrand] = useState()    
    const [selectLogo, setSelectLogo] = useState()
    const [listCategories, setListCategories] = useState([]) 
    const [listDiscount, setListDiscount] = useState([])
    const [listSizes, setListSizes] = useState([])
    const [listBrands, setListBrands] = useState([])
    const [listColors, setListColors] = useState([])
    const [listLogos, setListLogos] = useState([])
    const [listGenders, setListGenders] = useState([])

    // ComponentDidMount
    useEffect(() => {
        if (!cookies.get('userLogin')) {
            navigate(path.LOGIN)
        }
        else {
            let token = cookies.get('userLogin')
            let loginInfor = jwt_decode(token)
            if (loginInfor.role === Role.USER) {
                navigate(path.HOMEPAGE)
            }
        }
        getAllCategoriesRedux()
        fetchAllCodeByTypeRedux(allCode.DISCOUNT)
        fetchAllCodeByTypeRedux(allCode.BRAND)
        fetchAllColorsRedux(allCode.COLOR)
        fetchAllCodeByTypeRedux(allCode.LOGO)
        fetchAllCodeByTypeRedux(allCode.SIZEGIAY)
        fetchAllCodeByTypeRedux(allCode.GENDER)
    }, [])

    const buildDataSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {}
                if (item.keyMap) {
                    if (item.type === 'SIZEGIAY') {
                        obj.label = `${item.valueVi} - ${item.valueEn}` 
                        obj.value = item.keyMap
                    }
                    else {
                        obj.label = item.valueEn
                        obj.value = item.keyMap
                    }
                }
                else {
                    obj.label = item.name
                    obj.value = item.categoryId
                }
                result.push(obj)
            })
        }
        return result
    }

    useEffect(() => {
        let dataCategory = buildDataSelect(categories)
        let dataDiscount = buildDataSelect(discounts)
        let dataBrand = buildDataSelect(brands)
        let dataLogo = buildDataSelect(logos)

        setListCategories(dataCategory)
        setListDiscount(dataDiscount)
        setListBrands(dataBrand)
        setListLogos(dataLogo)
    }, [categories, discounts, brands, logos])

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
    
    const handleOnchangeColorOrGender = (e, type) => {
        if (type === allCode.COLOR) {
            let arr = [...listColors]
            if (e.target.checked) {
                arr.push(e.target.value)
            }
            else {
                arr = arr.filter(item => item !== e.target.value)
            }
            setListColors(arr)
        }
        else if (type === allCode.GENDER) {
            let arr = [...listGenders]
            if (e.target.checked) {
                arr.push(e.target.value)
            }
            else {
                arr = arr.filter(item => item !== e.target.value)
            }
            setListGenders(arr)
        }
        else if (type === allCode.SIZEGIAY) {
            let arr = [...listSizes]
            if (e.target.checked) {
                arr.push(e.target.value)
            }
            else {
                arr = arr.filter(item => item !== e.target.value)
            }
            setListSizes(arr)
        }
    }
    
    const handhandleOnchangeLogos = (selectLogo) => {
        setSelectLogo(selectLogo)
    }

    const handleCreateNewProduct = (e) => {
        e.preventDefault()
        let product = {
            categoresId: selectCategory.value,
            name: selectObject.name,
            productCode: selectObject.productCode,
            price: +(selectObject.price),
            discountId: selectDiscount ? selectDiscount.value : '',
            image: selectImage.image,
            productionSite: selectObject.productionSite,
            releaseDate: moment(selectReleaseDate).format('MM/DD/YYYY'),
            brandId: selectBrand.value,
            listColor: listColors.toString(),
            logoId: selectLogo.value,
            listSize: listSizes.toString(),
            material: selectObject.material,
            listGender: listGenders.toString(),
        }

        createNewProductRedux(product)
        setSelectObject(initState)
        setSelectImage(initStateImage)
        setSelectCategory('')
        setSelectDiscount('')
        setSelectBrand('')
        setSelectLogo('')
        setSelectReleaseDate('')
        setListColors([])
        setListSizes([])
        setListGenders([])
    }

    return (
        <div className='manage-shoes-create'>
            <div className='manage-shoes-create-container'>
                <Nav />
                <div className='manage-shoes-create-title text-center m-3 fs-5 fw-semibold'>
                    Thêm Mới Giày Dép
                </div>
                <div className='manage-shoes-create-form mx-2 my-4'>
                    <form>
                        <div className='form row'>
                            <div className="mb-3 col-4">
                                <label className="form-label">CategoreId</label>
                                <Select
                                    value={selectCategory}
                                    onChange={handleOnchangeCategories}
                                    options={listCategories}
                                />
                            </div>
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
                                <label htmlFor="exampleInputCode" className="form-label">Product Code</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleInputCode" 
                                    value={selectObject.productCode}
                                    onChange={(e) => setSelectObject({
                                        ...selectObject,
                                        productCode: e.target.value
                                    })}
                                />
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="exampleInputFirstPrice" className="form-label">Prices</label>
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
                                <label htmlFor="exampleInputImage" className="form-label">Image</label>
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
                                <label htmlFor="exampleInputBrand" className="form-label">BrandId</label>
                                <Select
                                    value={selectBrand}
                                    onChange={handhandleOnchangeBrands}
                                    options={listBrands}
                                />
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="exampleInputSite" className="form-label">Site</label>
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
                            <div className="mb-3 col-4">
                                <label htmlFor="exampleInputSize" className="form-label">SizeId</label>
                                <div className='row'>
                                    {
                                        sizes && sizes.length > 0 &&
                                        sizes.map((item, index) => {
                                            let value = `${item.valueVi} - ${item.valueEn}`
                                            return (
                                                <div className='col-4 pb-1' key={index}>
                                                    <input 
                                                        checked={
                                                            listSizes.some(size => size === item.valueVi) ? true : false
                                                        }
                                                        type="checkbox" 
                                                        className="form-check-input" 
                                                        id={`checkItem${item.valueEn}`}
                                                        value={item.valueVi}
                                                        onChange={(e) => handleOnchangeColorOrGender(e, allCode.SIZEGIAY)}
                                                    />
                                                    <label 
                                                        className="form-check-label ps-2" 
                                                        htmlFor={`checkItem${item.valueEn}`}
                                                        style={{ color: `${item.valueEn}`}}
                                                    >
                                                        {value}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div 
                                className="mb-3 col-4"
                                style={{ background: '#453c3c' }}
                            >
                                <label 
                                    htmlFor="exampleInputColor" 
                                    className="form-label"
                                    style={{ color: '#fff'}}
                                >   
                                    ColorId
                                </label>
                                <div className='row'>
                                    {
                                        colors && colors.length > 0 &&
                                        colors.map((item, index) => {
                                            return (
                                                <div className='col-4 pb-1' key={index}>
                                                    <input 
                                                        checked={
                                                            listColors.some(color => color === item.keyMap) ? true : false
                                                        }
                                                        type="checkbox" 
                                                        className="form-check-input" 
                                                        id={`checkItem${item.valueEn}`}
                                                        value={item.keyMap}
                                                        onChange={(e) => handleOnchangeColorOrGender(e, allCode.COLOR)}
                                                    />
                                                    <label 
                                                        className="form-check-label ps-2" 
                                                        htmlFor={`checkItem${item.valueEn}`}
                                                        style={{ color: `${item.valueEn}`}}
                                                    >
                                                        {item.valueEn}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="exampleInputLogo" className="form-label">Logos</label>
                                <Select
                                    value={selectLogo}
                                    onChange={handhandleOnchangeLogos}
                                    options={listLogos}
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
                                {
                                        genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <div className='col-4 pb-1' key={index}>
                                                    <input 
                                                        checked={
                                                            listGenders.some(gender => gender === item.valueVi) ? true : false
                                                        }
                                                        type="checkbox" 
                                                        className="form-check-input" 
                                                        id={`checkItem${item.valueEn}`}
                                                        value={item.valueVi}
                                                        onChange={(e) => handleOnchangeColorOrGender(e, allCode.GENDER)}
                                                    />
                                                    <label 
                                                        className="form-check-label ps-2" 
                                                        htmlFor={`checkItem${item.valueEn}`}
                                                    >
                                                        {item.valueVi}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={(e) => handleCreateNewProduct(e)}
                        >
                            Tạo
                        </button>
                    </form>
                </div>
                <div className='manage-shoes-create-table'>
                    <TableProducts />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        categories: state.product.categories,
        discounts: state.product.discounts,
        brands: state.product.brands,
        colors: state.product.colors,
        logos: state.product.logos,
        sizes: state.product.sizes,
        genders: state.product.genders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCategoriesRedux: () => dispatch(actions.getAllCategories()),
        fetchAllCodeByTypeRedux: (discount) => dispatch(actions.fetchAllCodeByTypeProduct(discount)),
        fetchAllColorsRedux: (type) => dispatch(actions.fetchAllColors(type)),
        createNewProductRedux: (data) => dispatch(actions.createNewProduct(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShoesCreate);
