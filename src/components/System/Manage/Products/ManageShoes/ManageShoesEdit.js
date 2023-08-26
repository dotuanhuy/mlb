import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../../../nav/nav';
import Select from 'react-select';
import * as actions from '../../../../../store/actions'
import { useLocation, useNavigate } from 'react-router-dom';
import { path, Role, allCode, formatDateVN } from '../../../../../utils';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import CommonUtils from '../../../../../utils/CommonUtils';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {Buffer} from 'buffer';
import _ from 'lodash'

const cookies = new Cookies();

const initState = {
    name: '',
    productCode: '',
    price: '',
    description: '',
    productionSite: ''
}

const initStateImage = {
    image: null,
    previewImgURL: null
}

function ManageShoesEdit({
    products,
    categories, 
    discounts, 
    brands, 
    colors, 
    logos, 
    getProductByIdRedux,
    getAllCategoriesRedux, 
    fetchAllCodeByTypeRedux, 
    fetchAllColorsRedux,
    updateProductRedux
}) {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [selectCategory, setSelectCategory] = useState()
    const [selectObject, setSelectObject] = useState(initState)
    const [selectDiscount, setSelectDiscount] = useState()
    const [selectImage, setSelectImage] = useState(initStateImage)
    const [selectReleaseDate, setSelectReleaseDate] = useState()
    const [selectBrand, setSelectBrand] = useState()    
    const [selectLogo, setSelectLogo] = useState()
    const [listCategories, setListCategories] = useState([]) 
    const [listDiscount, setListDiscount] = useState([])
    const [listBrands, setListBrands] = useState([])
    const [listColors, setListColor] = useState([])
    const [listLogos, setListLogos] = useState([])

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
        getProductByIdRedux(state)
    }, [])

    const buildDataSelect = (inputData) => {
        let result = []
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {}
                if (item.keyMap) {
                    obj.label = item.valueEn
                    obj.value = item.keyMap
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
        if (products) {
            setSelectObject({
                name: products.name,
                productCode: products.productCode,
                price: products.price,
                description: products.description,
                productionSite: products.productionSite
            })
            setSelectCategory({
                label: products.dataCategory ? products.dataCategory.name : '', 
                value: products.dataCategory ? products.dataCategory.categoryId: ''
            })
            setSelectDiscount({
                label: products.dataDiscount ? products.dataDiscount.valueEn : '', 
                value: products.dataDiscount ? products.dataDiscount.keyMap : ''
            })
            setSelectBrand({
                label: products.dataBrand ? products.dataBrand.valueEn : '', 
                value: products.dataBrand ? products.dataBrand.keyMap : ''
            })
            setSelectLogo({
                label: products.dataLogo ? products.dataLogo.valueEn : '', 
                value: products.dataLogo ? products.dataLogo.keyMap : ''
            })
            if (products.image) {
                let imageBase64 = Buffer.from(products.image.data, 'base64').toString('binary')
                setSelectImage({
                    image: imageBase64,
                    previewImgURL: imageBase64
                })
            }
            if (products.listColor) {
                let arrColor = products.listColor.split(',')
                setListColor(arrColor)
            }
            if (products.releaseDate) {
                const date = new Date(`${products.releaseDate} 00:00:00 GMT+0700 (Indochina Time)`)
                setSelectReleaseDate(date)
            }
        }
    }, [products])

    useEffect(() => {
        let dataCategory = buildDataSelect(categories)
        let dataDiscount = buildDataSelect(discounts)
        let dataBrand = buildDataSelect(brands)
        let dataLogo = buildDataSelect(logos)

        setListCategories(dataCategory)
        setListDiscount(dataDiscount)
        setListBrands(dataBrand)
        setListLogos(dataLogo)

    }, [categories, discounts, brands, colors])
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

    const handleOnchangeColor = async (e) => {
        let arr = [...listColors]
        if (e.target.checked) {
            arr.push(e.target.value)
        }
        else {
            arr = arr.filter(item => item !== e.target.value)
        }
        setListColor(arr)
    }

    const handhandleOnchangeLogos = (selectLogo) => {
        setSelectLogo(selectLogo)
    }

    const handleUpdateProduct = (e) => {
        e.preventDefault()
        let product = {
            id: state,
            categoresId: selectCategory.value,
            name: selectObject.name,
            productCode: selectObject.productCode,
            price: +(selectObject.price),
            discountId: selectDiscount ? selectDiscount.value : '',
            image: selectImage.image,
            description: selectObject.description,
            productionSite: selectObject.productionSite,
            releaseDate: moment(selectReleaseDate).format('MM/DD/YYYY'),
            brandId: selectBrand.value,
            listColor: listColors.toString(),
            logoId: selectLogo.value
        }
        updateProductRedux(product)
        navigate(path.MANAGE_PRODUCTS_SHOES) 
    }

    return (
        <div className='manage-shoes-create'>
            <div className='manage-shoes-create-container'>
                <Nav />
                <div className='manage-shoes-create-title text-center m-3 fs-5 fw-semibold'>
                    Sửa Giày Dép
                </div>
                <div className='manage-shoes-create-form mx-2 my-4'>
                    <form>
                        <div className='form row'>
                            <div class="mb-3 col-4">
                                <label class="form-label">CategoreId</label>
                                <Select
                                    value={selectCategory}
                                    onChange={handleOnchangeCategories}
                                    options={listCategories}
                                />
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputName" class="form-label">Name</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputName" 
                                    value={selectObject.name}
                                    onChange={(e) => setSelectObject({
                                        ...selectObject,
                                        name: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputCode" class="form-label">Product Code</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputCode" 
                                    value={selectObject.productCode}
                                    onChange={(e) => setSelectObject({
                                        ...selectObject,
                                        productCode: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputFirstPrice" class="form-label">Prices</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputFirstPrice" 
                                    value={selectObject.price}
                                    onChange={(e) => setSelectObject({
                                        ...selectObject,
                                        price: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputLastName" class="form-label">Discount</label>
                                <Select
                                    value={selectDiscount}
                                    onChange={handleOnchangeDiscount}
                                    options={listDiscount}
                                />
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputImage" class="form-label">Image</label>
                                <input 
                                    type="file" 
                                    class="form-control" 
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
                            <div class="mb-3 col-4">
                                <label class="form-label">Description</label>
                                <textarea 
                                    className='form-control'
                                    value={selectObject.description}
                                    onChange={(e) => setSelectObject({
                                        ...selectObject,
                                        description: e.target.value
                                    })}
                                >

                                </textarea>
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputSite" class="form-label">Site</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputSite" 
                                    value={selectObject.productionSite}
                                    onChange={(e) => setSelectObject({
                                        ...selectObject,
                                        productionSite: e.target.value
                                    })}
                                />
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputReleaseDate" class="form-label">Release date</label>
                                <DatePicker 
                                    // value={selectReleaseDate}
                                    className='form-control'
                                    dateFormat='MM/dd/yyyy'
                                    selected={selectReleaseDate}
                                    onChange={(date) => setSelectReleaseDate(date)}
                                />
                            </div>
                            <div class="mb-3 col-4">
                                <label for="exampleInputLastName" class="form-label">BrandId</label>
                                <Select
                                    value={selectBrand}
                                    onChange={handhandleOnchangeBrands}
                                    options={listBrands}
                                />
                            </div>
                            <div 
                                class="mb-3 col-4"
                                style={{ background: '#453c3c' }}
                            >
                                <label 
                                    for="exampleInputLastName" 
                                    class="form-label"
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
                                                        class="form-check-input" 
                                                        id={`checkItem${item.valueEn}`}
                                                        value={item.keyMap}
                                                        onChange={(e) => handleOnchangeColor(e)}
                                                    />
                                                    <label 
                                                        class="form-check-label ps-2" 
                                                        for={`checkItem${item.valueEn}`}
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
                            <div class="mb-3 col-4">
                                <label for="exampleInputLastName" class="form-label">Logos</label>
                                <Select
                                    value={selectLogo}
                                    onChange={handhandleOnchangeLogos}
                                    options={listLogos}
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                            onClick={(e) => handleUpdateProduct(e)}
                        >
                            Lưu
                        </button>
                    </form>
                </div>
                {/* <div className='manage-shoes-create-table'>
                    <TableProducts />
                </div> */}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin,
        products: state.product.products,
        categories: state.product.categories,
        discounts: state.product.discounts,
        brands: state.product.brands,
        colors: state.product.colors,
        logos: state.product.logos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProductByIdRedux: (id) => dispatch(actions.getProductById(id)),
        getAllCategoriesRedux: () => dispatch(actions.getAllCategories()),
        fetchAllCodeByTypeRedux: (discount) => dispatch(actions.fetchAllCodeByTypeProduct(discount)),
        fetchAllColorsRedux: (type) => dispatch(actions.fetchAllColors(type)),
        updateProductRedux: (data) => dispatch(actions.updateProduct(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageShoesEdit);
