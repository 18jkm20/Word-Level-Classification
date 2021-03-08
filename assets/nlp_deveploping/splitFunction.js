function analyseVocab() {

  //checking result div box
  let searchingResultBox = document.getElementById("resultDivBox");
  if (searchingResultBox) {
    // console.log("yes");
    searchingResultBox.parentNode.removeChild(searchingResultBox);
  } else {
    // console.log("no");
  }

  //get text data from text area
  let rawText = document.getElementById("myText").value.toString();

  // For put number of vocabulary index
  let rawIndex = [];

  //! outsideAlcWords
  let outsideAlcWords = [];

  //take only letter from text
  // let text = rawText.replace(/[^\w\s!?]/g,'').replace(/[0-9]/g, '');
  let text = rawText.replace(/[0-9]/g, '');

  //transform text to base form or root word
  let rootFormText = nlp(text).text('root');

  // Put all transformed words into Array object
  let rootFormWords = nlp.tokenize(rootFormText).terms().out('freq');

  //! console.log(rootFormWords);

  //put index number of words in index and check repeated word
  for (let i = 0; i < rootFormWords.length; i++) {

    let word = rootFormWords[i].reduced;
    let indexNumberCheck = alcVocabularyDatabase.indexOf(word);


    if (indexNumberCheck != -1) {

      //  rawIndex.push(indexNumberCheck);
      while (indexNumberCheck != -1) {
        rawIndex.push(indexNumberCheck);
        indexNumberCheck = alcVocabularyDatabase
          .indexOf(word, indexNumberCheck + 1);
      }

    } else {
      outsideAlcWords.push(word);
    }
  }

  //! console.log(rawIndex);

  //! console.log(outsideAlcWords);

  // Extract raw text to be raw words into Array object
  let rawWords = nlp.tokenize(rawText).terms().out('array');

  //! console.log(rawWords);

  //find no exist word in rootFormText but exist in VLCDatabase
  for (let i = 0; i < rawWords.length; i++) {

    let word = rawWords[i];

    let numberIndex = alcVocabularyDatabase.indexOf(word);

    if (numberIndex != -1) {
      rawIndex.push(numberIndex);
    }
  }
  //! define index number
  let index = [...new Set(rawIndex)];

  //sort index number
  index.sort(function (a, b) {
    return a - b
  });

  //! console.log(index);

  //select level data
  let e = document.getElementById("levelNumber");
  let levelNumber = Number(e.options[e.selectedIndex].text);

  //select language data
  let b = document.getElementById("languageMeaning");
  let languageNumber = Number(b.options[b.selectedIndex].value);


  if (languageNumber === 1) {

    resultInsideAlc = "Vocabulary inside ALC Database.";

    // show data in #InsideAlcDatabase
    let resultInsideAlcDatabase = document.querySelector("#InsideAlcDatabase");

    // remove all child first
    removeAllChildNodes(resultInsideAlcDatabase);

    let paraInside = document.createElement("P");
    paraInside.innerHTML = resultInsideAlc;
    resultInsideAlcDatabase.appendChild(paraInside);


    let table = document.createElement("Table");
    table.border = "1";

    let tableBody = document.createElement("TBODY");
    table.appendChild(tableBody);

    for (let i = 0; i < index.length; i++) {

      let tr = document.createElement("TR");
      tableBody.appendChild(tr);

      for (let j = 0; j < 4; j++) {

        let td = document.createElement("TD");

        switch (j) {

          case 0:
            let numberLevel = (parseInt(index[i] / 1000)) + 1;

            td.width = "60";
            td.appendChild(document.createTextNode("level " + numberLevel));
            tr.appendChild(td);
            break;

          case 1:
            td.width = "80";
            td.appendChild(document.createTextNode(alcVocabularyDatabase[index[i]]));
            tr.appendChild(td);
            break;

          case 2:
            td.width = "30";
            td.appendChild(document.createTextNode(japaneseMeanDatas[index[i]][0]));
            tr.appendChild(td);
            break;

          case 3:
            td.width = "400";
            td.appendChild(document.createTextNode(japaneseMeanDatas[index[i]][1]));
            tr.appendChild(td);
            break;

          default:
            console.log("can not creat table");

        }
      }
    }

    // put the table data to resultInsideAlcDatabase
    resultInsideAlcDatabase.appendChild(table);


    // show data in #OutsideAlcDatabase
    resultOutsideAlc = outsideAlcWords;

    let resultOutsideAlcDatabase = document.querySelector("#OutsideAlcDatabase");

    // remove all child first
    removeAllChildNodes(resultOutsideAlcDatabase);

    let paraOutside = document.createElement("P");
    paraOutside.innerHTML = resultOutsideAlc;
    resultOutsideAlcDatabase.appendChild(paraOutside);


  } else if (languageNumber === 2) {

    resultInsideAlc = "Vocabulary inside ALC Database.";

    // show data in #InsideAlcDatabase
    let resultInsideAlcDatabase = document.querySelector("#InsideAlcDatabase");

    // remove all child first
    removeAllChildNodes(resultInsideAlcDatabase);

    let paraInside = document.createElement("P");
    paraInside.innerHTML = resultInsideAlc;
    resultInsideAlcDatabase.appendChild(paraInside);


    let table = document.createElement("Table");
    table.border = "1";

    let tableBody = document.createElement("TBODY");
    table.appendChild(tableBody);

    for (let i = 0; i < index.length; i++) {

      let tr = document.createElement("TR");
      tableBody.appendChild(tr);

      for (let j = 0; j < 4; j++) {

        let td = document.createElement("TD");

        switch (j) {

          case 0:
            let numberLevel = (parseInt(index[i] / 1000)) + 1;

            td.width = "60";
            td.appendChild(document.createTextNode("level " + numberLevel));
            tr.appendChild(td);
            break;

          case 1:
            td.width = "80";
            td.appendChild(document.createTextNode(alcVocabularyDatabase[index[i]]));
            tr.appendChild(td);
            break;

          case 2:
            td.width = "30";
            td.appendChild(document.createTextNode(thaiMeanDatas[index[i]][0]));
            tr.appendChild(td);
            break;

          case 3:
            td.width = "400";
            td.appendChild(document.createTextNode(thaiMeanDatas[index[i]][1]));
            tr.appendChild(td);
            break;

          default:
            console.log("can not creat table");

        }
      }
    }

    // put the table data to resultInsideAlcDatabase
    resultInsideAlcDatabase.appendChild(table);


    // show data in #OutsideAlcDatabase
    resultOutsideAlc = outsideAlcWords;

    let resultOutsideAlcDatabase = document.querySelector("#OutsideAlcDatabase");

    // remove all child first
    removeAllChildNodes(resultOutsideAlcDatabase);

    let paraOutside = document.createElement("P");
    paraOutside.innerHTML = resultOutsideAlc;
    resultOutsideAlcDatabase.appendChild(paraOutside);

  }


  /* 
  old code

  //analyse passage with nlp-compromise
  let doc = nlp(text);

  //separate a word in passage with without check verb and noun form
  let vocabs = doc.terms().data().map(x => x.text.replace(/[^\w ]/, ''));

  //get only infinitive form of verb vocab in passage
  let verbVocabs = doc.verbs().conjugate().map(x => x.Infinitive.replace(/[^\w ]/, ''));

  //get only singular form of noun vocab in passage
  let nounVocabs = doc.nouns().data().map(x => x.singular.replace(/[^\w ]/, ''));


  //combine vocabulary together in allVocab
  nounVocabs.push(...verbVocabs);
  nounVocabs.push(...vocabs);
  let allVocabs = new Set(nounVocabs);


  //create result div box
  let resultDivBox = document.createElement('div');
  resultDivBox.setAttribute("id", "resultDivBox");
  document.body.appendChild(resultDivBox);
  

  //select level data
  let e = document.getElementById("levelNumber");
  let levelNumber = Number(e.options[e.selectedIndex].text);


  //select language data
  let b = document.getElementById("languageMeaning");
  let languageNumber = Number(b.options[b.selectedIndex].value);


  if(languageNumber === 1){

    //show meaning data
    for (let i = levelNumber - 1; i < 12; i++) {

      for (let vocabb of allVocabs) {

        let vocab = vocabb.toLowerCase();
        let numberIndex = vocabDatas.indexOf(vocab);

        if (vocabDatas.slice(i * 1000, (i + 1) * 1000).includes(vocab)) {
          let result = "";
          let level = parseInt(numberIndex / 1000) + 1;

          result = "level" + " " + level + " " + vocab + " : " + japaneseMeanDatas[numberIndex];


          //show data in resultDivBox
          let resultBox = document.querySelector("#resultDivBox");
          let para = document.createElement("P");
          para.innerHTML = result;
          resultBox.appendChild(para);

        } else {
          // console.log(vocab);
        }
      }
    }
  }else if(languageNumber === 2){

    //show meaning data
    for (let i = levelNumber - 1; i < 12; i++) {

      for (let vocabb of allVocabs) {

        let vocab = vocabb.toLowerCase();
        let numberIndex = vocabDatas.indexOf(vocab);

        if (vocabDatas.slice(i * 1000, (i + 1) * 1000).includes(vocab)) {
          let result = "";
          let level = parseInt(numberIndex / 1000) + 1;

          result = "level" + " " + level + " " + vocab + ": " + thaiMeanDatas[numberIndex];


          //show data in resultDivBox
          let resultBox = document.querySelector("#resultDivBox");
          let para = document.createElement("P");
          para.innerHTML = result;
          resultBox.appendChild(para);

        } else {
          // console.log(vocab);
        }
      }
    }
  }
  */

}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


function refresh() {
  window.location.reload();
}