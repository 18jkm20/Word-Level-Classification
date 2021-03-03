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
  let text = document.getElementById("myText").value.toString();

  //analyse passage with nlp-compromise
  let doc = nlp(text);

  //seperate a word in passage with without check verb and noun form
  let vocabs = doc.terms().data().map(x => x.text.replace(/[^\w ]/, ''));

  //get only infinitive form of verb vocab in passage
  let verbVocabs = doc.verbs().conjugate().map(x => x.Infinitive.replace(/[^\w ]/, ''));

  //get only sigular form of noun vocab in passage
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


}



function refresh() {
  window.location.reload();
}
