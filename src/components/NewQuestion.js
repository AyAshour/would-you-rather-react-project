import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'



class NewQuestion extends Component {
    state = {
        option1: '',
        option2: '',
        toHome: false
    }
    handleChange1 = (e) => {
        const option1 = e.target.value

        this.setState(() => ({
            option1
        }))
    }
    handleChange2 = (e) => {
        const option2 = e.target.value

        this.setState(() => ({
            option2
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { option1, option2 } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(option1, option2))
        this.setState(() => ({
            option1: '',
            option2: '',
            toHome: true
        }))

    }
    render() {
        const { option1, option2 } = this.state
        if (this.state.toHome) {
            return (<Redirect to='/' />)
        }
        return (
            <div>
                <h3>Create New Question</h3>
                <p>Would You Rather</p>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <input
                        placeholder="option 1"
                        value={option1}
                        onChange={this.handleChange1}
                        maxLength={100}
                    />
                    <input
                        placeholder="option 2"
                        value={option2}
                        onChange={this.handleChange2}
                        maxLength={100}
                    />
                    <button className='btn'
                        type='submit'
                        disabled={option1 === '' || option2 === ''}>
                        Create Question
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)