// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import Nav from '../../../nav/nav'
// import './AddDescriptionProduct.scss'
// import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
// import * as actions from '../../../../../store/actions'
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';
// import Loading from '../../../../common/Loading/Loading';

// const mdParser = new MarkdownIt(/* Markdown-it options */);
// const initState = {
//     contentMarkdown: '',
//     contentHTML: ''
// }

// function AddDescriptionProduct({
//     descriptions, 
//     accessToken, 
//     isLoading,
//     fetchDescriptionProductRedux, 
//     addDescriptionProductRedux,
//     refreshIsloadingStateProductRedux
// }) {
//     const navigate = useNavigate()
//     const { state } = useLocation()
//     const [markdown, setMarkdown] = useState(initState)

//     useEffect(() => {
//         refreshIsloadingStateProductRedux()
//         fetchDescriptionProductRedux(state.id, accessToken)
//     }, [])

//     useEffect(() => {
//         if (Object.keys(descriptions).length > 0) {
//             setMarkdown({
//                 contentMarkdown: descriptions.contentMarkdown,
//                 contentHTML: descriptions.contentHTML
//             })
//         }
//         else {
//             setMarkdown(initState)
//         }
//     }, [descriptions])

//     const handleEditOnchange = ({ html, text}) => {
//         setMarkdown({
//             contentMarkdown: text,
//             contentHTML: html
//         })
//     }

//     const handleSaveDescription = () => {
//         addDescriptionProductRedux({
//             ...markdown,
//             productId: state.id
//         }, accessToken)
//         setMarkdown(initState)
//         navigate({
//             pathname: state.path,
//             search: createSearchParams({
//                 page: state.pageCurrent
//             }).toString(),
//         })
//     }
//     return (    
//         <>
//             {
//                 isLoading ?
//                 <Loading />
//                 :
//                 <div className='add-description-product'>
//                     <Nav />
//                     <div className='add-description-product-container mx-2'>
//                         <MdEditor 
//                             style={{ height: '600px' }} 
//                             renderHTML={text => mdParser.render(text)} 
//                             value={markdown.contentMarkdown}
//                             onChange={handleEditOnchange}
//                         />
//                         <button 
//                             className='btn btn-success my-2 btn-save-des'
//                             onClick={handleSaveDescription}
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </div>
//             }
//         </>
//     );
// }

// const mapStateToProps = state => {
//     return {
//         descriptions: state.product.descriptions,
//         accessToken: state.auth.token,
//         isLoading: state.product.isLoading
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchDescriptionProductRedux: (productId, accessToken) => dispatch(actions.fetchDescriptionProduct(productId, accessToken)),
//         addDescriptionProductRedux: (data, accessToken) => dispatch(actions.addDescriptionProduct(data, accessToken)),
//         refreshIsloadingStateProductRedux: () => dispatch(actions.refreshIsloadingStateProduct())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddDescriptionProduct);
