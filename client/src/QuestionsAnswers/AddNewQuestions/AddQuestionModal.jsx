import React from 'react'

class AddAQuestionModal extends React.Component {
  constructor(props){
    super(props)
    this.state={
      display: false
    }
  }



  render(){
    const modalStyle={
      backgroundColor: "gray",
      display: 'none'
    }

    return(
      <div className="addQuestionModal" style={modalStyle}>
          <h4>Add A New Question</h4>
      </div>
    )
  }

}

export default AddAQuestionModal