import React, { useState } from "react";
import Pic from "../utils/data.json";
import styled from "styled-components";

// Styled Components
const ImgDetail = styled.div`
	font-family: Arial, Helvetica, sans-serif;

	.imgHead {
		text-align: center;
		margin-top: 20px;
	}

	.imgFilter {
		margin-top: 10px;
		text-align: center;
		display: flex;
		justify-content: center;

		input {
			width: 200px;
			margin-right: 20px;
			height: 20px;
			border-radius: 5px;
			padding: 5px;
			border: 1px solid grey;
			cursor: pointer;
		}

		select {
			margin-right: 10px;
			height: 32px;
			padding: 5px;
			border-radius: 5px;
			border: 1px solid grey;
			cursor: pointer;
		}
	}
`;

const ImgList = styled.div`
	display: flex;
	flex-wrap: wrap;

	.imgDiv {
		flex: 0 0 30%;
		padding: 5px;
	}
`;

const ImgDiv = styled.div`
	margin-left: 20px;
	margin-top: 20px;
	margin-bottom: 10px;
	border: 1px solid grey;
	border-radius: 5px;
	transition: box-shadow 0.3s ease;

	img {
		width: 350px;
		height: 320px;
		border-radius: 20px;
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
		margin: 10px 40px;
		display: inline-block;
		cursor: pointer;
		transition: transform 0.3s;
	}

	img:hover {
		transform: scale(0.9);
	}

	.imgTitle,
	.imgDes,
	.imgCategory,
	.imgPrice {
		font-weight: 500;
	}

	.imgCategory {
		color: grey;
	}

	.imgPrice {
		color: #9bb136;
	}

	&:hover {
		box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.7);
	}
`;

const Pagination = styled.ul`
	display: flex;
	list-style: none;
	justify-content: center;
	button {
		margin-right: 10px;
		border: 1px solid grey;
		border-radius: 5px;
		height: 40px;
		width: 40px;
		font-weight: 600;
		cursor: pointer;
	}
`;

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
		<ImgDetail className="imgDetail">
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
			<ImgList className="imgList">
				{currentItems.map((item) => (
					<ImgDiv className="imgDiv" key={item.id}>
						<img src={item.image_url} alt={item.title} className="imgUrl" />
						<div className="imgTitle">
							Name: <b>{item.title}</b>
						</div>
						<div className="imgDes">Info: {item.description}</div>
						<div className="imgCategory">Category: {item.category}</div>
						<div className="imgPrice">Price: ${item.price}</div>
					</ImgDiv>
				))}
			</ImgList>
			<div>
				<Pagination className="pagination">
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
				</Pagination>
			</div>
		</ImgDetail>
	);
};
