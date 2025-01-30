"use strict";

const renderCountry = (data, className="")=>{
  
  const countriesContainer=document.querySelector(".countries");
  
  const html= `
  <article class="country ${className}">
<img class="country__img" src="${data.flags.svg}"/>
<div class="country__data"> 
<h3 class="country__name"> ${data.name.common}</h3>
<h4 class="country__region"> ${data.region}</h4>

<p class="country__row"><span>👽</span>${
  (+data.population/1000000).toFixed(1)
}M people</p>
<p class="country__row"><span>🗣</span>${Object.values(data.languages)[0]}</p>
<p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
</div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend",html);
  countriesContainer.style.opacity=1;
};

/*
const countryData = (country)=>{
const API_URL=`https://restcountries.com/v3.1/name/${country}`;
fetch(API_URL)
//promises
.then((response)=>{
  return response.json();
})
.then((data)=>{
  const [info]=data;
  console.log(info);
  renderCountry(info);
}) ;
};
*/
//countryData("belize");
//countryData("brazil");
//countryData("uk");



const countryDataV2 = (country)=>{
const API_URL=`https://restcountries.com/v3.1/name/${country}`;
fetch(API_URL)
//promises
.then((response)=>{
  return response.json();
})
.then((data)=>{
  const [info]=data;
 console.log(info);
  renderCountry(info);
  //check for any neighbours
const neighbours=info.borders || [];
console.log(neighbours);
if(!neighbours){
  return;
}
//there is at least one neighbour
//we will use a map
const neighboursRequests = neighbours.map((nb)=>{
  //create the url
  const N_API_URL= `https://restcountries.com/v3.1/alpha/${nb}`;
  return fetch(N_API_URL).then((response)=> response.json());
});
//send off the request in parallel
Promise.all(neighboursRequests)
.then((results)=>{
 //console.log(results);
 results.forEach((nb)=>{
 // console.log(nb);
 const [info]=nb;
renderCountry(info, "neighbour");
 })
})
.catch((err)=>{
  console.error(err);
});
})
.catch((err)=>{
  console.error(err);
});
};
countryDataV2("usa");