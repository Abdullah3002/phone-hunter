const loadPhone = async (searchText = '13', isShowAll = false) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';

  const showAllContainer = document.getElementById('Show-all-container');
  if (phones.length > 12 && !isShowAll) {
      showAllContainer.classList.remove('hidden');
  } else {
      showAllContainer.classList.add('hidden');
  }

  if (!isShowAll) {
      phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
      const phoneCard = document.createElement('div');
      phoneCard.classList = 'card p-4 bg-gray-100 shadow-xl';
      phoneCard.innerHTML = `
          <figure class="px-10 pt-10">
              <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>You can get this with best prize from Zubaer's platform ..</p>
              <div class="card-actions justify-center">
                  <button onclick="handleShowDetail('${phone.slug}');" class="btn btn-primary text-white">Show Details</button>
              </div>
          </div>`;
      phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt =""/>
  <p> <span> Storage </span>${phone?.mainFeatures?.storage} </p>
  <p> <span> GPS:  </span>${phone?.others?.GPS} </p>
  <p> <span> Release Data:  </span>${phone?.releaseDate} </p>
   

  `;

  document.getElementById('show_details_modal').showModal();
}

const handleSearch = (isShowAll = false) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
}

const handleShowAll = () => {
  handleSearch(true);
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
      loadingSpinner.classList.remove('hidden');
  } else {
      loadingSpinner.classList.add('hidden');
  }
}

const closeModal = () => {
  document.getElementById('show_details_modal').close();
}

loadPhone();
