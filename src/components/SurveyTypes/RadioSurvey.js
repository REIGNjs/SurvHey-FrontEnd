import React, {useState, useEffect} from 'react';
import { requestService } from '../../services/requestService';
import { Button} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { FormControl, RadioGroup, FormControlLabel} from "@material-ui/core";
import { AuthInterceptor } from '../../services/AuthInterceptor';
import { useHistory } from "react-router";


function RadioSurvey(props) {

  const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
  const [id, setId] = useState(props.id);
  const [toggle, setToggle] = useState(false);

  const history = useHistory();
  
  
  const openSurvey= e => {
    setToggle(true);
  }

  const onValueChange = e => {
    setSelectedAnswerId(Number(e.target.value));
  }

  const getResults = e => {
    //document.location.href="/AnalyseSurvey/" + props.id;
    history.push("/AnalyseSurvey/" + props.id);
  }


 const formSubmit = event => {
    event.preventDefault();
    // requestService.postSubmisson(this.props.id, this.state.selectedAnswerId);

    requestService.postSubmisson(id, [{id: selectedAnswerId}]).then(res => {
      props.showResultChart();
    }).catch(error => {
      console.log(error);
    });

 }

  const answers = props.answerOptions.map((answer, index) => {
    return (

      <FormControlLabel key={answer.id} value={answer.id} control={<Radio />} label={answer.content} />

    );
    });
  
    if(toggle === false){
        return(
          <div>
            <h3>{props.surveyName}</h3>
            <Button variant="contained" onClick={openSurvey}>Show full Survey</Button>
          </div>
        );
      }
    else{ return(
            <form onSubmit={formSubmit}>
              <h3>{props.surveyName}</h3>
              <h4>{props.questionText}</h4>
              
              <FormControl component="fieldset">
                <RadioGroup aria-label="SurveyQuestions" name="surveys" value={selectedAnswerId} onChange={onValueChange}>
                  {answers}
                </RadioGroup>
              </FormControl>
              
              <br></br>
              <Button variant="contained" color="primary" type="submit">Send Answer</Button>
          </form>
        );
      }

 }

  
  

  export default RadioSurvey;
