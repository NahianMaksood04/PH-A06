const categoryName = () => {
	fetch("https://openapi.programming-hero.com/api/categories")
		.then((res) => res.json())
		.then((data) => {
			const list = document.getElementById("category-container");
			list.innerHTML = "";

			data.categories.forEach((category) => {
				const li = document.createElement("li");
				li.textContent = category.category_name;
				list.appendChild(li);
			});
		});
};

const treeDetails = () => {
	fetch("https://openapi.programming-hero.com/api/plants")
		.then((res) => res.json())
		.then((data) => {
			const plantContainer = document.getElementById("plant-container");
			plantContainer.innerHTML = "";

			data.plants.forEach((plant) => {
				const card = document.createElement("div");
				card.className = "card bg-base-100 shadow-sm";

				card.innerHTML = `
                    <figure>
                        <img class="w-full h-48" src="${plant.image}" alt="${plant.name}" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${plant.name}</h2>
                        <p>${plant.description}</p>
                        <div class="flex items-center gap-2">
                            <button class="btn rounded-full">${plant.category}</button>
                            <i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}
                        </div>
                        <div class="card-actions justify-end">
                            <button class="btn btn-block rounded-full">Add to Cart</button>
                        </div>
                    </div>
                `;
				plantContainer.appendChild(card);
			});
		});
};

treeDetails();
categoryName();
