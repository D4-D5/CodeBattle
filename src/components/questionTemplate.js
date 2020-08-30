import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import { MathComponent } from 'mathjax-react'
import MathJax from 'react-mathjax';

function createMarkup(problemStatement) {
    return { __html: problemStatement };
}

class QuestionTemplate extends Component {

    // question = {
    //     "problemTitle" :"Word Combinations",
    //     "problemStatement":"\nYou are given a string of length $n$ and a dictionary containing $k$ words. In how many ways can you create the string using the words?\n\n",
    //     "inputSpecification":"\n\r\nThe first input line has a string containing $n$ characters between a–z.\n\r\nThe second line has an integer $k$: the number of words in the dictionary.\n\r\nFinally there are $k$ lines describing the words. Each word is unique and consists of characters a–z.\n\n",
    //     "outputSpecification":"\n\r\nPrint the number of ways modulo $10^9+7$.\n\n",
    //     "constraints":"\n<ul>\n<li>$1 \\le n \\le 5000$\n<li>$1 \\le k \\le 10^5$\n<li>the total length of the words is at most $10^6$\n</li></li></li></ul>\n",
    //     "sampleInput":"\n<code>ababc\r\n4\r\nab\r\nabab\r\nc\r\ncb</code>\n",
    //     "sampleOutput":"\n<code>2</code>\n",
    //     "ioExplaination":"\r\nExplanation: The possible ways are <code>ab+ab+c</code> and <code>abab+c</code>"
    // }
    constructor(props) {
        super(props);
        const script = document.createElement("script");
        script.type = "text/x-mathjax-config";
        script[(window.opera ? "innerHTML" : "text")] =
            "MathJax.Hub.Config({\n" +
            "  tex2jax: { inlineMath: [['$','$'], ['\\\\(','\\\\)']] }\n" +
            "});"
        script.async = true;
        document.body.appendChild(script);
    }

    componentDidMount() {
        const script = document.createElement("script");

        script[(window.opera ? "innerHTML" : "text")] =
            "MathJax.Hub.Queue([\"Typeset\", MathJax.Hub, document.querySelector('.challenge__description')]);"
        script.async = true;
        script.type = "text/x-mathjax-config";
        document.body.appendChild(script);
    }

    componentDidUpdate() {
        const script = document.createElement("script");

        script[(window.opera ? "innerHTML" : "text")] =
            "MathJax.Hub.Queue([\"Typeset\", MathJax.Hub, document.querySelector('.challenge__description')]);"
        //script.defer = true;
        script.type = "text/x-mathjax-config";
        document.body.appendChild(script);
    }

    render() {
        const { question } = this.props
        
        console.log(question)
        return ( 
            <div className="">
                <Card>

                    <Card.Body>

                        <div className="text-left">

                            <div className="text-center"><strong>{question.problemTitle}</strong></div>
                            <div dangerouslySetInnerHTML={createMarkup(question.problemStatement)} className="" />
                            <div className="">
                                <strong>Input</strong>
                                <div dangerouslySetInnerHTML={createMarkup(question.inputSpecification)} />
                            </div>
                            <div className="">
                                <strong>Output</strong>
                                <div dangerouslySetInnerHTML={createMarkup(question.outputSpecification)} />
                            </div>
                            <div className="">
                                <strong>Constraints</strong>
                                {/* <div dangerouslySetInnerHTML={createMarkup(question.constraints)} /> */}
                                <div className="challenge__description" dangerouslySetInnerHTML={{ __html: question.constraints }} />
                            </div>
                            <div className="">
                                <strong className="">Examples</strong>
                                <Card className="">
                                    <Card.Header className="">input</Card.Header>
                                    <Card.Body className="nextLineProperty" style={{ "white-space": "pre-wrap" }} dangerouslySetInnerHTML={createMarkup(question.sampleInput)}>

                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header className="">output</Card.Header>
                                    <Card.Body className="nextLineProperty" style={{ "white-space": "pre-wrap" }} dangerouslySetInnerHTML={createMarkup(question.sampleOutput)}>

                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="">
                                <strong>Explaination</strong>
                                <div dangerouslySetInnerHTML={createMarkup(question.ioExplaination)} />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default QuestionTemplate;
