import React from 'react'
import { connect } from 'react-redux';

function error({isLogin}) {
  return (
    <div>error</div>
  )
}


const mapStateToProps = state => {
    return {
        isLogin: state.auth.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(error)