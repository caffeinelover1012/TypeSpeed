import './App.css';
import React, { useState } from 'react';
import Footer from './Footer'

let t=0;
let st_time=0;
let prev = 0;

function App() {
  const [text,setText] = useState("");
  const [words,setWords]=useState(0);
  const [speed,setSpeed] = useState(0);
  const [preview,setPreview]=useState(false);
  let now = new Date();

  let getCurTxt = ()=>{return (document.getElementById("mainTxt").value);};
  let curwords=()=>{return text.trim().split(" ").filter((elem)=>(elem.length!==0)).length};

  function setters(){
    setText(getCurTxt); 
    setWords(curwords);
    if(t===0){
      st_time=now.getTime();
      t=1;
    }
    refreshonwordchange();
  };
  function refreshonwordchange(){
    if(prev<words){
      prev=words;
      setSpeed(parseInt(words/((now.getTime()-st_time)/60000)));
    }
    else{
      prev=0;
    }
  };
  function changePreview(){
    let opp = !preview;
    setPreview(opp);
  }
  return (
    <div className="container">
      <div className="demo-flex-spacer"></div>
      <div className="infosection">
        <h1 style={{'letterSpacing':2,'fontSize':'3rem', 'alignSelf':'center','textDecoration':'underline'}}><b>Typing Test</b></h1>
      </div>
      <div className="webflow-style-input">
        <input id="mainTxt" value={text} onChange={setters} placeholder="Start Typing"></input>
      </div>
      <div className="infosection">
         <br/>
         {text && <table style={{"tableLayout":'fixed'}}>
          <td><h2>Preview?&nbsp;<input type={'checkbox'} onClick={changePreview}></input></h2></td>
             <tr><h1><em> Words Typed: <font color = "green"><b>&nbsp;{words}</b></font></em></h1>
             </tr>
             <tr><h1><em>Typing Speed: <font color = "green"><b>&nbsp;{speed}</b></font> Words per minute</em></h1></tr>
             <tr><h1><em>Time to read: <font color = "green"><b>&nbsp;{parseInt(words*(6/25))+1}</b></font> seconds</em></h1></tr>
             {preview && <tr style={{'maxWidth':'400px'}}><h2>Preview:</h2></tr>}
         </table>}
         {text && preview && <code style={{maxWidth:'400px',wordBreak:'break-all',wordWrap:'break-word',overflowWrap:'break-word',fontSize:'14px'}}>{text}</code>}
        </div>  
      <div className="demo-flex-spacer"></div>
      <Footer/>
    </div>
  );
}

export default App;
