const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});


const getWordInfo = async (word)=>{
    try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
   const data = await response.json();

   let definitions=data[0].meanings[0].definitions[0];

   resultDiv.innerHTML =`
    <h2><strong>Word:</strong>${data[0].word}</h2>
    <p class="Partofspeech">${data[0].meanings[0].partofSpeech}</p>
    <p><strong>meaning:</strong>${definitions.definition === undefined ? "Not Found" : 
    definitions.definition}</p>
    <p><strong>example:</strong>${definitions.example === undefined ? "Not Found" : 
   definitions.example}</p>
   <p><strong>Antonyms:</strong></p>
   `;

// fetching Antonyms

if(definitions.antonyms.length === 0){
    resultDiv.innerHTML += `<span>Not found</span>`;
}
else{
   for(let i=0; i<definitions.antonyms.length; i++){
    resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
   }
}
// Adding read more buttom

resultDiv.innerHTML += ` <div><a href="${data[0].sourceUrls}" target="_blank">Read More</a>`;
} catch (error) {
    
resultDiv.innerHTML =`<p> sorry, the word could not be found</P>`;
        
}

    console.log(data);
}