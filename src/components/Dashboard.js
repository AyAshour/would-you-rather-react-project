import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {

    goToQuestion = (id) => {

        this.props.history.push("/questions/" + id);
        //<Redirect to={{ pathname: "/questions/" + id }} />

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

function mapStateToProps({ questions }) {

    const answeredQ = questions.answeredQ
    const unAnsweredQ = questions.unAnsweredQ
    return {
        answeredQ,
        unAnsweredQ,
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))