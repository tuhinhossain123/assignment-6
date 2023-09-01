const loadCategory = async () => {
    const res = await fetch(
      'https://openapi.programming-hero.com/api/videos/categories'
    );
    const data = await res.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
      const div = document.createElement('div');
      div.innerHTML = `
              <button onclick="handleLoadCard('${category.category_id}')" class="px-5 py-2 font-semibold bg-gray-200 rounded focus:bg-red-500">${category.category}</button>
          `;
      tabContainer.appendChild(div);
    });
  };
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    return `${hours}hrs ${minutes}min`;
  };
  
  const handleLoadCard = async (categoryId) => {
    let sorted = false;
    const res = await fetch(
      ` https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    let data = await res.json();
    const singleCard = data.data;
    // console.log(singleCard)
    const nullCard = document.getElementById('null-card');
    nullCard.innerHTML = '';
    if (singleCard.length == 0) {
      const div = document.createElement('div');
      div.innerHTML = `
              <div>
                  <img class="mx-auto" src="./img/Icon.png" alt="">
                      <h2 class="mt-8 text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
  
              </div>
          `;
      nullCard.appendChild(div);
    }
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
  
    data.data.forEach((card) => {
      const div = document.createElement('div');
      console.log(card);
      div.innerHTML = `
          <figure><img class="w-[312px] h-[200px] rounded" src="${
            card?.thumbnail
          }" alt="" /><p class="px-3 py-1.5 w-max text-sm text-white bg-black bg-opacity-50 rounded-md -translate-x-6 -translate-y-10 ms-auto">${
        card.others.posted_date ? formatTime(card.others.posted_date) : ''
      }</p></figure>
          <div class="mt-5">
              <div class="flex gap-x-4 items-center">
                  <div>
                      <div class="">
                          <img class="rounded-full w-[40px] h-[40px]" src="${
                            card?.authors[0]?.profile_picture
                          }" alt="">
                      </div>
                  </div>
                  <div>
                      <h2 class="text-[#171717] font-bold">${card?.title}</h2>
                  </div>
              </div>
          </div>
          <div class="flex gap-x-3 items-center pl-14">
              <div>
                  <h3 class="text-gray-400">${card?.authors[0]?.profile_name}</h3>
              </div>
              <div>
              <img src='${
                card?.authors[0]?.verified === true ? `./img/svg.png` : ''
              }' alt="">
              </div>
              </div>
          <p class="pl-14 text-gray-400">${card?.others?.views} views</p>
      </div >
      `;
  
      cardContainer.appendChild(div);
  
      document.querySelector('#sort-button').addEventListener('click', () => {
        cardContainer.textContent = '';
  
        const sortedData = data.data.sort(
          (a, b) =>
            Number(b.others.views.slice(0, -1)) -
            Number(a.others.views.slice(0, -1))
        );
  
        sortedData.forEach((card) => {
          const div = document.createElement('div');
          div.innerHTML = `
              <figure><img class="w-[312px] h-[200px] rounded" src="${
                card?.thumbnail
              }" alt="" />
              <p class="px-3 py-1.5 w-max text-sm text-white bg-black bg-opacity-50 rounded-md -translate-x-6 -translate-y-10 ms-auto">${
                card.others.posted_date ? formatTime(card.others.posted_date) : ''
              }</p>
              </figure>
              <div class="mt-5">
                  <div class="flex gap-x-4 items-center">
                      <div>
                          <div class="">
                              <img class="rounded-full w-[40px] h-[40px]" src="${
                                card?.authors[0]?.profile_picture
                              }" alt="">
                          </div>
                      </div>
                      <div>
                          <h2 class="text-[#171717] font-bold">${card?.title}</h2>
                      </div>
                  </div>
              </div>
              <div class="flex gap-x-3 items-center pl-14">
                  <div>
                      <h3 class="text-gray-400">${
                        card?.authors[0]?.profile_name
                      }</h3>
                  </div>
                  <div>
                      <img src='${
                        card?.authors[0]?.verified === true ? `./img/svg.png` : ''
                      }' alt="">
                  </div>
              </div>
              <p class="pl-14 text-gray-400">${card?.others?.views} views</p>
          </div >`;
  
          cardContainer.appendChild(div);
        });
      });
    });
  };
  
  // document
  //   .querySelector('#sort-button')
  //   .addEventListener('click', () => handleLoadCard('1000', true));
  
  loadCategory();
  handleLoadCard('1000');