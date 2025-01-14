const books = [
    {
        title: "Мастер и Маргарита",
        author: 'Михаил Булгаков',
        year: '2012',
        price: 9.49,
        sale: 5,
        img: "images/mihail_bulgakov.jpg",
        rating: 4.45,
    },
    {
        title: "День, когда я научился жить",
        author: 'Лоран Гунель',
        year: '2021',
        price: 9.82,
        sale: 5,
        img: "images/loran_runel.jpg",
        rating: 4.61,
    },
    {
        title: "Если все кошки в мире исчезнут",
        author: 'Гэнки Кавамура',
        year: '2024',
        price: 17.13,
        sale: 7,
        img: "images/renki_kavamura.jpg",
        rating: 3.47,
    },
    {
        title: "Маленький принц",
        author: 'Антуан де Сент-Экзюпери',
        year: '2019',
        price: 13.42,
        sale: 10,
        img: "images/antuan__de_sent-ekzyuperi.jpg",
        rating: 4.95,
    },
    {
        title: "Гарри Поттер и философский камень",
        author: 'Джоана Роулинг',
        year: '2016',
        price: 40.57,
        sale: 20,
        img: "images/harri_potter_i_filosofskiy_kamen.jpg",
        rating: 2.25,
    },
    {
        title: "Ресторан 06:06:06",
        author: 'Джим Пом Ю',
        year: '2024',
        price: 28.57,
        sale: 10,
        img: "images/restoran_060606.jpg",
        rating: 4.2,
    },
    {
        title: "Дюна",
        author: 'Фрэнк Герберт',
        year: '2024',
        price: 59.49,
        sale: 20,
        img: "images/dyuna.jpg",
        rating: 3.4,
    },
    {
        title: "451 по Фаренгейту",
        author: 'Рэй Брэдбери',
        year: '2022',
        price: 15.02,
        sale: 7,
        img: "images/451_gradus_po_Farengeytu.jpg",
        rating: 5,
    },
    {
        title: "Облачный атлас",
        author: 'Дэвид Митчелл',
        year: '2022',
        price: 16.42,
        sale: 20,
        img: "images/oblachniy_atlas.jpg",
        rating: 4.67,
    },
    {
        title: "(Не)чистый Минск",
        author: 'Писатели шуфлядки',
        year: '2024',
        price: 32.48,
        sale: 0,
        img: "images/Nechistiy_Minsk.jpg",
        rating: 4.69,
    },
    {
        title: "Внутренняя опора",
        author: 'Анна Бабич',
        year: '2023',
        price: 24.00,
        sale: 5,
        img: "images/vnutrennyaya_opora.jpg",
        rating: 1.95,
    },
    {
        title: "Гарри Поттер и принц-полукровка",
        author: 'Джоана Роулинг',
        year: '2020',
        price: 53.42,
        sale: 0,
        img: "images/harri_potter_i_princ-polukrovka.jpg",
        rating: 2.5,
    },
];

let currentState = [...books];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {

    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";  

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
    
    addToFavourite();
}


function prepareShopItem(shopItem) {

    const { title, author, year, img, price, sale, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector(".author").textContent = `${author},`;
    item.querySelector(".year").textContent = ` ${year}`;
    item.querySelector("img").src = img;
    item.querySelector(".sale").textContent = `-${sale}%`;
    item.querySelector(".price").textContent = `${price} р.`;

    if (sale === 0) {
        item.querySelector(".sale").remove();
        item.querySelector(".price").remove();
    }
    item.querySelector(".final-price").textContent = `${(price * (100 - sale) / 100).toFixed(2)} р.`;

    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }
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


const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = books.filter((el) =>
        el.title.toLowerCase().includes(searchString) || el.author.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));

    renderItems(currentState);

    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);


const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {

    const selectedOption = event.target.value;
    currentState.forEach((item) => {
        item['newPrice'] = +(item.price * (100 - item.sale) / 100).toFixed(2);
    })

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

function addToFavourite() {
    const favouriteButtons = document.querySelectorAll(".star");
    const favouriteCount = document.querySelector("#favourite-items");

    for (let item of favouriteButtons) {
        item.addEventListener("click", function () {
            const counter = parseFloat(favouriteCount.textContent);

            if (item.classList.contains('done')) {
                favouriteCount.textContent = counter - 1;
                item.classList.toggle("done");
            }
            else {
                favouriteCount.textContent = counter + 1;
                item.classList.toggle("done");
            }
        });
    }

}