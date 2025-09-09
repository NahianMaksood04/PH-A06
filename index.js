let cart = [];

const categoryName = () => {
	fetch("https://openapi.programming-hero.com/api/categories")
		.then((res) => res.json())
		.then((data) => {
			const list = document.getElementById("category-container");
			list.innerHTML = "";
			const treeName = document.createElement("li");
			treeName.textContent = "All Trees";
			treeName.className =
				"cursor-pointer px-3 py-1 rounded bg-[#15803D] text-white font-medium hover:bg-green-600";
			treeName.addEventListener("click", () => {
				list.querySelectorAll("li").forEach((item) =>
					item.classList.remove("bg-[#15803D]", "text-white")
				);
				treeName.classList.add("bg-[#15803D]", "text-white");
				treeDetails();
			});
			list.appendChild(treeName);

			data.categories.forEach((category) => {
				const li = document.createElement("li");
				li.textContent = category.category_name;
				li.className =
					"cursor-pointer px-3 py-1 rounded hover:bg-gray-200";

				li.addEventListener("click", () => {
					list.querySelectorAll("li").forEach((item) =>
						item.classList.remove("bg-[#15803D]", "text-white")
					);
					li.classList.add("bg-[#15803D]", "text-white");

					treeDetails(category.category_name);
				});

				list.appendChild(li);
			});
		});
};

const treeDetails = (filterCategory = null) => {
	const plantContainer = document.getElementById("plant-container");

	plantContainer.innerHTML = `
		<div class="col-span-full flex justify-center items-center py-10">
			<span class="loading loading-dots loading-md"></span>
		</div>
	`;

	fetch("https://openapi.programming-hero.com/api/plants")
		.then((res) => res.json())
		.then((data) => {
			plantContainer.innerHTML = "";

			let plants = data.plants;

			if (filterCategory) {
				plants = plants.filter(
					(plant) => plant.category === filterCategory
				);
			}

			plants.forEach((plant) => {
				const card = document.createElement("div");
				card.className =
					"card bg-white shadow-md rounded overflow-hidden";
				card.innerHTML = `
					<figure>
						<img class="w-full h-48 object-cover" src="${plant.image}" alt="${plant.name}" />
					</figure>
					<div class="p-4">
					<h2 class="text-xl font-bold mb-2">${plant.name}</h2>
						<p class="text-gray-700 line-clamp-3 mb-4">${plant.description}</p>
						<div class="flex justify-between items-center mt-2 gap-2  mb-4">
							<span class="bg-gray-200 px-2 py-1 rounded-full text-sm">${plant.category}</span>
							<span class="flex items-center gap-1 font-semibold">
								<i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}
							</span>
						</div>
						<button class="w-full bg-[#15803D] text-white py-2 rounded-full hover:bg-green-600 add-to-cart">Add to Cart</button>
					</div>
				`;

				const addToCartBtn = card.querySelector(".add-to-cart");
				addToCartBtn.addEventListener("click", () => {
					addToCart(plant);
				});

				plantContainer.appendChild(card);
			});
		});
};

const addToCart = (plant) => {
	const existing = cart.find((item) => item.id === plant.id);
	if (existing) {
		existing.quantity += 1;
	} else {
		cart.push({ ...plant, quantity: 1 });
	}
	updateCartBox();
};

const updateCartBox = () => {
	const cartContainer = document.getElementById("cart-container");
	cartContainer.innerHTML = "";

	if (cart.length === 0) {
		const empty = document.createElement("p");
		empty.className = "text-gray-500";
		empty.textContent = "Cart is empty";
		cartContainer.appendChild(empty);
		return;
	}

	let totalPrice = 0;

	cart.forEach((item, index) => {
		totalPrice += item.price * item.quantity;

		const div = document.createElement("div");
		div.className =
			"flex justify-between items-center bg-[#D1FAE5] p-3 rounded-xl mb-1";

		div.innerHTML = `
    <div>
        <h3 class="font-semibold text-lg text-[#344054]">${item.name}</h3> 
        <p class="text-sm text-[#475467]">৳${item.price} × ${item.quantity}</p> 
    </div>
    <button class="text-[#344054] text-xl font-semibold remove-btn">&times;</button> 
`;

		div.querySelector(".remove-btn").addEventListener("click", () => {
			cart.splice(index, 1);
			updateCartBox();
		});

		cartContainer.appendChild(div);
	});

	const total = document.createElement("p");
	total.className = "font-semibold mt-2 border-t pt-2";
	total.textContent = `Total: ৳${totalPrice}`;
	cartContainer.appendChild(total);
};

categoryName();
treeDetails();
