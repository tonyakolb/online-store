const books = [
    {
        id: 1,
        title: "Мастер и Маргарита",
        author: 'Михаил Булгаков',
        year: '2012',
        price: 9.49,
        sale: 5,
        img: "images/mihail_bulgakov.jpg",
        rating: 4.45,
        favourite: false,
    },
    {
        id: 2,
        title: "День, когда я научился жить",
        author: 'Лоран Гунель',
        year: '2021',
        price: 9.82,
        sale: 5,
        img: "images/loran_runel.jpg",
        rating: 4.61,
        favourite: false,
    },
    {
        id: 3,
        title: "Если все кошки в мире исчезнут",
        author: 'Гэнки Кавамура',
        year: '2024',
        price: 17.13,
        sale: 7,
        img: "images/renki_kavamura.jpg",
        rating: 3.47,
        favourite: false,
    },
    {
        id: 4,
        title: "Маленький принц",
        author: 'Антуан де Сент-Экзюпери',
        year: '2019',
        price: 13.42,
        sale: 10,
        img: "images/antuan__de_sent-ekzyuperi.jpg",
        rating: 4.95,
        favourite: false,
    },
    {
        id: 5,
        title: "Гарри Поттер и философский камень",
        author: 'Джоана Роулинг',
        year: '2016',
        price: 40.57,
        sale: 20,
        img: "images/harri_potter_i_filosofskiy_kamen.jpg",
        rating: 2.25,
        favourite: false,
    },
    {
        id: 6,
        title: "Ресторан 06:06:06",
        author: 'Джим Пом Ю',
        year: '2024',
        price: 28.57,
        sale: 10,
        img: "images/restoran_060606.jpg",
        rating: 4.2,
        favourite: false,
    },
    {
        id: 7,
        title: "Дюна",
        author: 'Фрэнк Герберт',
        year: '2024',
        price: 59.49,
        sale: 20,
        img: "images/dyuna.jpg",
        rating: 3.4,
        favourite: false,
    },
    {
        id: 8,
        title: "451 по Фаренгейту",
        author: 'Рэй Брэдбери',
        year: '2022',
        price: 15.02,
        sale: 7,
        img: "images/451_gradus_po_Farengeytu.jpg",
        rating: 5,
        favourite: false,
    },
    {
        id: 9,
        title: "Облачный атлас",
        author: 'Дэвид Митчелл',
        year: '2022',
        price: 16.42,
        sale: 20,
        img: "images/oblachniy_atlas.jpg",
        rating: 4.67,
        favourite: false,
    },
    {
        id: 10,
        title: "(Не)чистый Минск",
        author: 'Писатели шуфлядки',
        year: '2024',
        price: 32.48,
        sale: 0,
        img: "images/Nechistiy_Minsk.jpg",
        rating: 4.69,
        favourite: false,
    },
    {
        id: 11,
        title: "Внутренняя опора",
        author: 'Анна Бабич',
        year: '2023',
        price: 24.00,
        sale: 5,
        img: "images/vnutrennyaya_opora.jpg",
        rating: 1.95,
        favourite: false,
    },
    {
        id: 12,
        title: "Гарри Поттер и принц-полукровка",
        author: 'Джоана Роулинг',
        year: '2020',
        price: 53.42,
        sale: 0,
        img: "images/harri_potter_i_princ-polukrovka.jpg",
        rating: 2.5,
        favourite: false,
    },
];

let currentState = [...books];
let favouriteItems = [];
let mode = 'catalog';

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");
const favouritesButton = document.querySelector("#favourite-button");
const catalogButton = document.querySelector("#catalog-button");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
const sortControl = document.querySelector("#sort");
const favouriteCount = document.querySelector("#favourite-items");

function renderItems(arr) {

    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function prepareShopItem(shopItem) {

    const { title, author, year, img, price, sale, rating, favourite, id } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    const ratingContainer = item.querySelector(".rating");

    const saleContainer = item.querySelector(".sale");
    const priceContainer = item.querySelector(".price");
    const star = item.querySelector(".star");

    item.querySelector("h1").textContent = title;
    item.querySelector(".author").textContent = `${author},`;
    item.querySelector(".year").textContent = ` ${year}`;
    item.querySelector("img").src = img;

    saleContainer.textContent = `-${sale}%`;
    priceContainer.textContent = `${price} р.`;

    if (sale === 0) {
        saleContainer.remove();
        priceContainer.remove();
    }

    item.querySelector(".final-price").textContent = `${(price * (100 - sale) / 100).toFixed(2)} р.`;

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    if (shopItem.favourite) {
        star.classList.add('done');
    }

    star.addEventListener("click", function () {

        if (!shopItem.favourite) {
            this.classList.add('done');
            addToFavourite(shopItem);
        }
        else {
            this.classList.remove('done');
            deleteFromFavourite(shopItem, id);
        };

    });

    return item;
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

favouritesButton.addEventListener("click", () => {
    mode = 'favourites';
    favouritesButton.classList.add('active');
    catalogButton.classList.remove('active');
    currentState = [...favouriteItems];
    renderItems(favouriteItems.sort((a, b) => sortByAlphabet(a, b)));
    sortControl.selectedIndex = 0;
});

catalogButton.addEventListener("click", () => {
    mode = 'catalog';
    catalogButton.classList.add('active');
    favouritesButton.classList.remove('active');
    currentState = [...books];
    renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));
    sortControl.selectedIndex = 0;
});

function applySearch(array) {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = array.filter((el) =>
        el.title.toLowerCase().includes(searchString) || el.author.toLowerCase().includes(searchString)
    );

    renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", () => {
    applySearch(mode === 'catalog' ? books : favouriteItems)
});

searchInput.addEventListener("search", () => {
    applySearch(mode === 'catalog' ? books : favouriteItems)
});

sortControl.addEventListener("change", (event) => {

    const selectedOption = event.target.value;
    currentState.forEach((item) => {
        item['newPrice'] = +(item.price * (100 - item.sale) / 100).toFixed(2);
    });

    switch (selectedOption) {
        case "expensive": {
            currentState.sort((a, b) => b.newPrice - a.newPrice);
            break;
        }
        case "cheap": {
            currentState.sort((a, b) => a.newPrice - b.newPrice);
            break;
        }
        case "rating": {
            currentState.sort((a, b) => b.rating - a.rating);
            break;
        }
        case "alphabet": {
            currentState.sort((a, b) => sortByAlphabet(a, b));
            break;
        }
    }
    renderItems(currentState);
});

function addToFavourite(shopItem) {
    const counter = parseFloat(favouriteCount.textContent);

    favouriteCount.textContent = counter + 1;
    shopItem.favourite = true;
    favouriteItems.push(shopItem);
}

function deleteFromFavourite(shopItem, id) {
    const counter = parseFloat(favouriteCount.textContent);

    favouriteCount.textContent = counter - 1;
    shopItem.favourite = false;

    favouriteItems = favouriteItems.filter(el => el.id !== id);

    if (mode === 'favourites') {
        renderItems(favouriteItems);
    }
}