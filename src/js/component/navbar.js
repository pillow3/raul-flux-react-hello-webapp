import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand navbar-dark bg-primary">
			<div class="nav navbar-nav">
				<a
					class="nav-item nav-link active"
					href="#"
					aria-current="page">
					Contact List <span class="visually-hidden">(current)</span>
				</a>
			</div>

			{/* <Link to="/">
			</Link> */}
		</nav>
	);
};

{
	/* <nav class="navbar navbar-expand navbar-light bg-light">
	<div class="nav navbar-nav">
		<a class="nav-item nav-link active" href="#" aria-current="page">
			Home <span class="visually-hidden">(current)</span>
		</a>
		<a class="nav-item nav-link" href="#">
			Home
		</a>
	</div>
</nav>; */
}
