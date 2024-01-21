import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export function Contact() {
	const { store, actions } = useContext(Context);
	const contacts = store.contactList;

	const handleDeleteContact = (contactId) => {
		actions.deleteContact(contactId);
	};

	return (
		<div className="container mt-5 w-50">
			<div className="list-group bor">
				{contacts.map((contact, id) => (
					<div
						key={contact.phone}
						href="#"
						className="list-group-item list-group-item-action"
						aria-current="true">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">{contact.full_name}</h5>

							<div className="d-flex gap-1">
								<button className=" p-0 btn fs-3">
									<i class="fa-solid fa-square-pen"></i>
								</button>
								<button
									onClick={() =>
										handleDeleteContact(contact.id)
									}
									className="p-0 btn fs-3">
									<i class="fa-solid fa-square-minus"></i>
								</button>
							</div>
						</div>
						<p className="mb-1">
							<i class="fa-solid fa-envelope"></i> {contact.email}
						</p>
						<p>
							<i class="fa-solid fa-phone"></i> {contact.phone}
						</p>
						<small>
							<i class="fa-solid fa-location-dot"></i>{" "}
							{contact.address}
						</small>
					</div>
				))}
			</div>

			<div className="mt-3 d-flex gap-1">
				<Link to="/addcontact">
					<button type="button" class="btn btn-primary">
						Add new contact
					</button>
				</Link>
				{contacts.length > 0 ? (
					<button
						type="button"
						className="btn btn-danger"
						onClick={actions.deleteAll}>
						Delete all
					</button>
				) : (
					""
				)}
			</div>
		</div>
	);
}
