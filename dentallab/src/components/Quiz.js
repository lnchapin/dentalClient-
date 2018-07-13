import React, {Component} from 'react';
import {Link} from "react-router-dom";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
return a;
}

class QuestionClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      questions: [],
      correctAnswer: [],
      score: 0
  }
}

  async getQuestions() {
    try{
      let response = await fetch(`http://localhost:3030/api/v1/questions`)
      .then(response => response.json())
      console.log(response)
      for (var i = 0; i < response.length; i++) {
        var answerChoices = []
        answerChoices.push(response[i].correctAnswer, response[i].incorrectAnswer1, response[i].incorrectAnswer2, response[i].incorrectAnswer3);
        this.state.questions.push([response[i].questionText, shuffle(answerChoices), response[i].id])
        this.state.correctAnswer.push(response[i].correctAnswer)
      }
      this.setState({
        isLoading: false
      })
      console.log('post loop questions', this.state.questions)
      console.log('correc arr', this.state.correctAnswer);
      console.log();
    } catch(error) {
      console.error(error);
    }
}
handleSubmit(e) {
  e.preventDefault();
  const formData=new FormData(e.target)
  const userAnswer = this.state.questions.map((answer, index) => formData.get(`answer${index}`))

  if (this.state.questions.map((answer, index) => formData.get(`answer${index}`)).includes(null)) {
    alert("Please answer all questions")
  }else{
    document.getElementById("submitButton").classList.add("hide")
    for (var i = 0; i < userAnswer.length; i++) {
      if (userAnswer[i] == this.state.correctAnswer[i]) {
        console.log(i + " correct");
        this.state.score++
        let questionBlock = document.getElementById(i+1)
        questionBlock.classList.add("correct")
      } else {
        console.log(i + " incorrect");
        let questionBlock = document.getElementById(i+1)
        questionBlock.classList.add("incorrect")
      }
    }
    //mark which ones are correct and which are incorrect.
  }
  console.log(this.state.score);
  console.log("line 49",this.state.correctAnswer);
  console.log(this.state.questions.map((answer, index) => formData.get(`answer${index}`)));
}

componentDidMount(){
  this.getQuestions();
}

  render() {
    if(this.state.isLoading === true) {
      return (
        <div>Loading...</div>
      )
    } else if(this.state.isLoading === false) {
    return(
          <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
            {this.state.questions.map((answer, index) =>
             <div key={answer[2]} id={answer[2]} className="">
               <h3>{answer[0]}</h3>


               {answer[1].map(option => {
                 return <label key={`${answer[2]}.${option}`}>
                 <input type="radio" value={option} name={`answer${index}`} /> {option}<br/>
               </label>
               })}

             </div>)}
             <button name="button" id="submitButton" className="">Submit</button>
             </form>
          </div>
      )
    }
  }
}
export default QuestionClass;
