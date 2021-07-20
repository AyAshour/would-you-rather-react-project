import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component {

    goToQuestion = (id) => {

        this.props.history.push("/questions/" + id);

    }
    render() {
        return (
            <div>
                <h3 className='center'>Dashboard</h3>
                <Tabs>
                    <TabList>
                        <Tab>Unanswered Questions</Tab>
                        <Tab>Answered Questions</Tab>
                    </TabList>
                    <TabPanel>
                        {this.props.unAnsweredQ.map((q) => (
                            <li key={q.id}>
                                <Question question={q} />
                                <button
                                    onClick={(e) => this.goToQuestion(q.id)}
                                    type='button'
                                >answer question</button>
                            </li>
                        ))}
                    </TabPanel>
                    <TabPanel>
                        {this.props.answeredQ.map((q) => (
                            <li key={q.id}>
                                <Question question={q} />
                                <button
                                    onClick={(e) => this.goToQuestion(q.id)}
                                    type='button'
                                >show question</button>
                            </li>
                        ))}
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    const answeredQ = Object.values(questions).filter(x => Object.keys(authedUser.answers).includes(x.id))
    const unAnsweredQ = Object.values(questions).filter(x => !Object.keys(authedUser.answers).includes(x.id))
    console.log(questions, unAnsweredQ)
    return {
        answeredQ: answeredQ
            .sort((a, b) => b.timestamp - a.timestamp),
        unAnsweredQ: unAnsweredQ
            .sort((a, b) => b.timestamp - a.timestamp),
    }
}

export default connect(mapStateToProps)(Dashboard)