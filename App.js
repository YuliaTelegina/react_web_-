import formateNumber, { truncateReactElements } from "./Func.js"
import "./App.css";
import lang_ico from "./lang_ico.svg";
import author_ico from "./author_ico.svg"
import React, { useState } from "react";
import parse, { domToReact } from 'html-react-parser'
import Kw from "./KeyWord.js"

const cDate = new Date(2024, 11, 17, 3, 24, 0)
const cReach = 211322

const cTrafficCountry = [{ value: "Austria", count: "38%" }, { value: "USA", count: "12%" }, { value: "Italian", count: "8%" }];
const cSent = ["Positive", "Negative", "Neutral"]
const cTitle = "Antivirus leggero: i migliori epiu efficaci (free e a pagamento) 2024"
const cFav = "https://www.cnet.com/favicon-96.png"
const cDom = "cnet.com"
const cCntr = "Austria"
const cCntrCode = "AT"
const cLang = "EN"
const cAuthor = ["Emily C.", "Taormina A.", "et al"]


const cKeyWords = [
  {
    "value": "Aloe Vera",
    "count": 3
  },
  {
    "value": "secondary",
    "count": 15
  },
  {
    "value": "degrees",
    "count": 8
  },
  {
    "value": "oxybutynin",
    "count": 5
  },
  {
    "value": "oxybutynin",
    "count": 5
  },
  {
    "value": "oxybutynin",
    "count": 5
  },
  {
    "value": "oxybutynin",
    "count": 5
  },
  {
    "value": "oxybutynin",
    "count": 5
  },
  {
    "value": "oxybutynin",
    "count": 5
  }
]


function ItemDate({ fDate }) {
  let fMonth = fDate.toLocaleString('en-GB', { month: 'short' });
  return (
    <>
      <span className="liteGrayBold">{fDate.getDate()}</span>
      <span className="itemDate itemRight"> {fMonth} {fDate.getFullYear()}</span>
    </>
  );
}

function ItemReach({ reach }) {
  let fReach = formateNumber(reach);
  return (
    <>
      <span className="liteGrayBold">{fReach}</span>
      <span className="ItemReach itemRight"> Reach</span>
    </>
  );
}

function ItemTraffic({ traffic }) {
  const listItems = traffic.map((d) => <span> {d.value} <span className="liteGrayBold" >{d.count} </span></span>);
  return (
    <>
      <span>Top TRaffic: </span>
      {listItems}
    </>
  );
}


function ItemSent({ sent }) {

  if (sent == "Positive")
    return <span className="itemSentPositive">{sent}</span>
  else if (sent == "Negative")
    return <span className="itemSentNegative">{sent}</span>
  else
    return <span className="itemSentNeutral">{sent}</span>
}


function ItemInfo() {
  return <span className="itemInfo">i</span>
}


function ItemChecBox() {
  return (
    <span className="frmCheckBox">

      <label>
        <input type="checkbox"></input>
        <span class="pseudocheckbox"></span>
      </label>
    </span>
  );
}

function ItemFirstLine({ fDate, fReach, fSent }) {
  return (
    <div className="itemFirstLine">
      <ItemDate fDate={fDate} />
      <ItemReach reach={fReach} />
      <ItemTraffic traffic={cTrafficCountry} />
      <ItemChecBox />
      <ItemInfo />
      <ItemSent sent={fSent} />

    </div>
  );
}

function ItemTitle({ title }) {
  return (
    <div className="itemTitle">
      {title}
    </div>
  );
}


function ItemDomen({ fav, dom }) {
  return (
    <span className="itemRight itemDomen">
      <img src={fav}></img>
      <a href={`https://${dom}`}>{dom}</a>
    </span>

  );
}

function ItemCountry({ cntr, cntrCode }) {
  return (
    <span className="itemRight">
      <img src={`https://flagsapi.com/${cntrCode}/flat/16.png`}></img>
      {cntr}
    </span>
  );
}

function ItemLanguage({ lang }) {
  return (
    <span className="itemRight">
      <img src={lang_ico}></img>
      {lang}
    </span>
  );
}

function ItemAuthor({ author }) {
  var listItems = author.join(", ");
  listItems += "."
  return (
    <span className="itemRight">
      <img src={author_ico}></img>
      {listItems}
    </span>
  );
}


function ItemSourceLine({ fav, dom }) {
  return (
    <div className="itemSourceLine">
      <ItemDomen fav={fav} dom={dom} />
      <ItemCountry cntr={cCntr} cntrCode={cCntrCode} />
      <ItemLanguage lang={cLang} />
      <ItemAuthor author={cAuthor} />
    </div>

  )
}

function ItemContent() {
  const [showMore, setShowMore] = useState(false);

  const abstractText =
    "The aim of this study was to determine in vitro the potential of <kw>Aloe Vera</kw> juice as a skin permeation enhancer; a <kw>secondary</kw> aim was to probe the extent to which Aloe Vera itself permeates the skin. Saturated solutions of caffeine, colchicine, mefenamic acid, <kw>oxybutynin</kw>, and quinine were prepared at 32 <kw>degrees</kw> C in Aloe Vera juice and water (control) and used to dose porcine ear skin...";

  const handleShow = () => {
    setShowMore(!showMore);
  };

  const maxChars = 200;

  const options = {
    replace: (domNode) => {
      if (
        domNode.name === 'kw'
      ) {
        return <Kw>{domToReact(domNode.children)}</Kw>;
      }
    },
  };

  const parsedElements = parse(abstractText, options);
  const truncatedElements = truncateReactElements(parsedElements, maxChars);

  return (
    <div className="itemContent">


      <span className="liteGray">

        {showMore ? parse(abstractText, options) : truncatedElements}

      </span>
      <p
        className="contentMoreLess"
        onClick={handleShow}
      >
        {showMore ? "Show less ▲" : "Show more ▼"}
      </p>

    </div>
  );
}


function ItemKeyWords({ keyWords }) {
  const [expanded, setExpanded] = useState(false);
  const defaultCountKW = 6;
  const showMoreCount = keyWords.length - defaultCountKW;
  const keyWordsOutput = expanded ? keyWords : keyWords.slice(0, defaultCountKW);

  var showMoreStr = "Show All";
  if (showMoreCount) 
    showMoreStr += " + " + showMoreCount;

  return (
    <div className="keyWords">
      {keyWordsOutput.map(function (kw) {
        return (
          
            <span className="currKeyWord">{kw.value}&nbsp;&nbsp;&nbsp;&nbsp;{kw.count}</span>
        )
      })}
      <span className="showAllLessKW" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show Less" : showMoreStr } 
        </span>
    </div>
  );

}

function ItemFull() {
  return (
    <div className="itemFull">
      <ItemFirstLine fDate={cDate} fReach={cReach} fSent={cSent[0]} />
      <ItemTitle title={cTitle} />
      <ItemSourceLine fav={cFav} dom={cDom} />
      <ItemContent />
      <ItemKeyWords keyWords={cKeyWords} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ItemFull />
    </div>
  );
}

export default App;
