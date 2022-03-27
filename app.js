const button = document.getElementById("button");
const buttonSpinner = document.getElementById("button_spinner");
button.addEventListener("click", async () => {
  buttonSpinner.classList.remove("d-none");
  const cardBody = document.getElementById("card_body");

  cardBody.innerHTML = ``;
  const word = document.getElementById("word").value;

  const response = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

 
  buttonSpinner.classList.add("d-none");

  //  MAIN FOR LOOP
  let card = ``;
  for (let i = 0; i < response.data[0].meanings.length; i++) {
    const element = response.data[0].meanings[i];
    card = `
    
    <div class="card border my-4">
    <div class="card-body text-left">
    <h2 class="" style="text-transform: capitalize;">
    ${element.partOfSpeech}
    </h2>
    <hr />
  <div class="col-12 mb-3"><b>Definitions</b> :</div>    
    ${element.definitions
      .map((item, index) => {
       
        return `
        <p><i class="bi bi-bookmark-check-fill"></i> ${item.definition}</p>
      `;
      })
      .join(" ")}
  

    <div class="row">    ${
      element.synonyms.length >= 1
        ? ` <hr/>
 
      <div class="col-12 mb-3"><b>Synonyms</b> : </div>
     ${element.synonyms
       .map((item, index) => {
         return `<div class="mx-auto col-12 col-sm-6"><p class="border rounded text-center p-1" > ${item}</p></div>`;
       })
       .join(" ")} 
    `
        : ``
    }
    </div>
    <div class="row">    ${
      element.antonyms.length >= 1
        ? ` <hr/>
      <div class="col-12 mb-3"><b>Antonyms</b> : </div> ${element.antonyms
        .map((item, index) => {
          return `<div class="mx-auto col-12 col-sm-6"><p class="border rounded text-center p-1" > ${item}</p></div>`;
        })
        .join(" ")} 
    `
        : ``
    }
    </div>
    </div>
  `;
    cardBody.innerHTML += card;
  }
});
