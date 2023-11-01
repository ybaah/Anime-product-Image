import React, { useState } from "react";
import Pic from "../utils/data.json";

export const ProductPic = () => {
	// const [products, setProducts] = useState(Pic);
	const [sortedData, setSortedData] = useState([...Pic]);
	const [selectedCategory, setSelectedCategory] = useState("All1");
	const [sortOption, setSortOption] = useState("None1");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 3;

	//sort by price
	const handleSort = (ascending) => {
		const sorted = [...sortedData].sort((a, b) =>
			ascending ? a.price - b.price : b.price - a.price
		);
		setSortedData(sorted);
	};

	const handleSortOptionChange = (option) => {
		setSortOption(option);
		if (option === "Asc") {
			handleSort(true);
		} else if (option === "Desc") {
			handleSort(false);
		} else if (option === "None") {
			setSortedData([...Pic]); // Set back to the original unsorted data
		}
	};

	//filter by category
	const handleFilter = (category) => {
		setSelectedCategory(category);
		const filtered =
			category === "All"
				? [...Pic]
				: Pic.filter((item) => item.category === category);
		setSortedData(filtered);
	};

	//search by title
	const handleSearch = (term) => {
		setSearchTerm(term);
		const filtered = Pic.filter((item) =>
			item.title.toLowerCase().includes(term.toLowerCase())
		);
		setSortedData(filtered);
	};

	//pagination
	const totalItems = sortedData.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	return (
		<div className="imgDetail">
			<h1 className="imgHead">Anime Images Product</h1>
			<div className="imgFilter">
				<input
					type="text"
					placeholder="Enter title..."
					value={searchTerm}
					onChange={(e) => handleSearch(e.target.value)}
				/>
				<select
					value={sortOption}
					onChange={(e) => handleSortOptionChange(e.target.value)}
				>
					<option value="None1" disabled>
						Sort By Price
					</option>
					<option value="None">Relevant</option>
					<option value="Asc">Price - Ascending</option>
					<option value="Desc">Price - Descending</option>
				</select>
				<select
					value={selectedCategory}
					onChange={(e) => handleFilter(e.target.value)}
				>
					<option value="All1" disabled>
						Category Filter
					</option>
					<option value="All">All</option>
					<option value="Shonen">Shonen</option>
					<option value="Horror">Horror</option>
					<option value="Magical">Magical</option>
					<option value="Thriller">Thriller</option>
					<option value="Adventure">Adventure</option>
					{/* Add more category options if needed */}
				</select>
			</div>
			<div className="imgList">
				{currentItems.map((item) => (
					<div className="imgDiv" key={item.id}>
						<img src={item.image_url} alt={item.title} className="imgUrl" />
						<div className="imgTitle">
							Name: <b>{item.title}</b>
						</div>
						<div className="imgDes">Info: {item.description}</div>
						<div className="imgCategory">Category: {item.category}</div>
						<div className="imgPrice">Price: ${item.price}</div>
					</div>
				))}
			</div>
			<div>
				<ul className="pagination">
					{Array.from({ length: totalPages }, (_, i) => (
						<li
							key={i}
							className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
						>
							<button className="page-link" onClick={() => paginate(i + 1)}>
								{i + 1}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
