import React from 'react'
import { connect } from 'react-redux';

function error() {
  return (
    <div>error</div>
  )
}


const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(error)