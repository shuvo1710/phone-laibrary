const loadData = async (searchText, datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, datalimit);
};
const displayPhone = (phones, datalimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText='';
  const showAll = document.getElementById('show-all')
  if( datalimit && phones.length > 10){
    phones= phones.slice(0, 10);
    showAll.classList.remove('d-none')
  }
  else{
    showAll.classList.add('d-none')
  }
  
  const noPhone = document.getElementById('no-found');
  if(phones.length === 0){
    noPhone.classList.remove('d-none')
  }
  else{
    noPhone.classList.add('d-none')
  };
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCol = document.createElement("div");
    phoneCol.innerHTML = `
        <div class="card border-0 shadow p-3 mb-5 bg-body rounded">
              <img src="${phone.image}" class="card-img-top p-4" alt="..." />
              <div class="card-body">
                  <h5 class="card-title">Phone Name: ${phone.phone_name} </h5>
                  <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <button onclick="loadPhoneDEtai('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#moda-phone-details">show details</button>
              </div>
        </div>
        `;
    phonesContainer.appendChild(phoneCol);
  });
  toggoleSpinner(false);
};

const prosessSearch =(datalimit) =>{
  toggoleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadData(searchText, datalimit)
};

document.getElementById('search-btn').addEventListener('click',function(){
  prosessSearch(10);
});

document.getElementById('search-field').addEventListener('keypress', function (e) {
  // console.log(e.key)
  if (e.key === 'Enter') {
    prosessSearch(10);
  }
});

const toggoleSpinner = isloder =>{
  const loderSection = document.getElementById('loader');
  if(isloder){
    loderSection.classList.remove('d-none')
  }
  else{
    loderSection.classList.add('d-none')
  }

};
document.getElementById('btn-show-all').addEventListener('click', function(){
  prosessSearch();

});

const loadPhoneDEtai = async id =>{
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data)

}

const displayPhoneDetail = phone =>{
  console.log(phone)
  const modalPhoneDetails = document.getElementById('moda-phone-detailsLabel');
  modalPhoneDetails.innerText = phone.name;

  const modalBody = document.getElementById('moladdetailbody');
  modalBody.innerHTML=  `
  <img class="d-flex justify-content-center" src = "${phone.image}">
  <h5>MainFeatures:</h5>
  <h5>Chepset:${phone.mainFeatures.chipSet} <h5>
  <h5>Display:${phone.mainFeatures.displaySize} <h5>
  <h5>Memory:${phone.mainFeatures.memory} <h5>
  `;
}

loadData('apple');
