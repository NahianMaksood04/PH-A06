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

categoryName();
