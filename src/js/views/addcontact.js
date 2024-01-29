import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function AddContact() {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div>
			<form
				className="container-sm mt-5 w-25"
				onSubmit={(e) => e.preventDefault()}>
				<div className="">
					<label className="form-label">Full Name</label>
					<input
						className="form-control"
						onChange={(e) => {
							const name = "full_name";
							const newValue = e.target.value;
							actions.addContactField(name, newValue);
						}}
						value={store.addcontact.full_name}
						type="text"></input>
				</div>
				<div className="mt-2">
					<label className="form-label">Email</label>
					<input
						className="form-control"
						onChange={(e) => {
							const name = "email";
							const newValue = e.target.value;
							actions.addContactField(name, newValue);
						}}
						value={store.addcontact.email}
						type="text"></input>
				</div>
				<div className="mt-2">
					<label className="form-label">Phone</label>
					<input
						className="form-control"
						onChange={(e) => {
							const name = "phone";
							const newValue = e.target.value;
							actions.addContactField(name, newValue);
						}}
						value={store.addcontact.phone}
						type="text"></input>
				</div>
				<div className="mt-2">
					<label className="form-label">Address</label>
					<input
						className="form-control"
						onChange={(e) => {
							const name = "address";
							const newValue = e.target.value;
							actions.addContactField(name, newValue);
						}}
						value={store.addcontact.address}
						type="text"></input>
				</div>

				<div className="d-flex gap-1 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => {
							actions.createContact(store.addcontact);
							navigate("/contact");
							// Limpiar los campos del contacto
						}}>
						Save
					</button>
					<Link to="/contact">
						<button type="button" className="btn btn-primary">
							<i className="fa-solid fa-arrow-left-long"></i>
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
}
