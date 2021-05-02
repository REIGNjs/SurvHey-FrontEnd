import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { requestService } from "../services/requestService";
import RadioSurvey from './SurveyTypes/RadioSurvey';
import { SurveyTypeChooser } from "./SurveyTypes/SurveyTypeChooser";
import  PopUp  from './PopUp';
import Button from '@material-ui/core/Button';
import PieChartIcon from '@material-ui/icons/PieChart';


// Survey true/false = null abfragen dann Logik implementieren
//nicht null aus Daten den Survey aufbauen
//
export function SurveyIFrame() {
    let {id} = useParams();
    const [survey, setSurvey] = useState({});
    const [seen, setSeen] = useState(false);

    const [showResults, setShowResults] = useState(false);
    

    useEffect(() => {
        console.log(id);
        requestService.getSurveyById(id).then(res => {
            console.log(res.data);
            setSurvey(res.data);
            document.body.style = 'background: ' + (res.data.backgroundColor == null ? "#121212" : res.data.backgroundColor);
        }).catch(err => {
            console.log(err);
            setSurvey(null);
        });
        
    }, []); 

    if(survey === null) {
        return (
            <h3>error occured:</h3>
        )
    } else {
        return (
            <div style={{overflowX:"-moz-hidden-unscrollable"}}>
                <SurveyTypeChooser id={id} surveyName={survey.name} questionText={survey.questionText} surveyType={survey.mode} answerOptions={survey.answerOptions} showResults={showResults} accentColor={survey.accentColor}/>
                <br></br>
                <div style={{marginTop: "5%"}}>
                    <Button onClick={() => setShowResults(!showResults)} variant="outlined" color="primary" endIcon={<PieChartIcon/>}>Results</Button>
                </div>
            </div>
        
        );
    }
    
}

export default SurveyIFrame;