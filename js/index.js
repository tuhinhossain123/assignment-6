const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button  onclick="handleLoadCard('${category.category_id}')" class="bg-gray-200 px-5 py-2 rounded font-semibold">${category.category}</button>
        `
        tabContainer.appendChild(div);
    })
    console.log(data.data);
};

const handleLoadCard = async (categoryId) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    data.data.forEach(card => {
        const div = document.createElement('div');
        div.innerHTML =`
            <div class="">
                <figure><img class="w-[312px] h-[200px] rounded" src="${card?.thumbnail}" alt="" /></figure>
                <div class="mt-5">
                    <div class="flex items-center gap-x-4">
                        <div>
                            <div class="">
                                <img class="rounded-full w-[40px] h-[40px]" src="${card?.authors[0]?.profile_picture}" alt="">
                            </div>
                        </div>
                        <div>
                            <h2 class="text-[#171717] font-bold">${card?.title}</h2>
                        </div>
                    </div>
                </div>
                <div class="flex items-center pl-14 gap-x-3">
                    <div>
                        <h3 class="text-gray-400">${card?.authors[0]?.profile_name}</h3>
                    </div>
                    <div>
                    <img src='${card?.authors[0]?.verified === true?  `./img/svg.png` : ""}' alt="">
                    </div>
                   </div>
                <p class="text-gray-400 pl-14">${card?.others?.views} views</p>
            </div>
        `
        cardContainer.appendChild(div)
    })

}
loadCategory();
handleLoadCard("1000")