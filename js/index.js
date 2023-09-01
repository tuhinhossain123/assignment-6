const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="bg-gray-200 px-5 py-2 rounded font-semibold">${category.category}</button>
        `
        tabContainer.appendChild(div);
    })
    console.log(data.data);
}
loadCategory();