import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function Contact() {
	const { store, actions } = useContext(Context);
	const contacts = store.contactList;

	const [show, setShow] = useState(false);
	const [editingContactId, setEditingContactId] = useState(null);

	useEffect(() => {
		actions.loadContactList();
	}, []);

	const handleDeleteContact = (contactId) => {
		actions.deleteContact(contactId);
	};

	const handleClose = () => {
		setShow(false);
		setEditingContactId(null);
	};

	const handleShow = (contactId) => {
		const selectedContact = contacts.find(
			(contact) => contact.id === contactId
		);
		actions.setSelectedContact(selectedContact); // Establece los detalles del contacto seleccionado
		setEditingContactId(contactId);
		setShow(true);
	};

	return (
		<div className="container mt-5 w-50">
			<p>Faltaron detalles pero me da pereza :p</p>
			<div className="list-group bor">
				{contacts.map((contact, id) => (
					<div
						key={contact.id}
						href="#"
						className="list-group-item list-group-item-action"
						aria-current="true">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">{contact.full_name}</h5>

							<div className="d-flex gap-1">
								<button
									onClick={() => handleShow(contact.id)}
									className=" p-0 btn fs-3">
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
						onClick={() => {
							actions.deleteAll();
						}}>
						Delete all
					</button>
				) : (
					""
				)}
			</div>

			{/* MODAL POPUP */}
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>
						Update the contact:{" "}
						{store.addcontact ? store.addcontact.full_name : ""}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<form
							className="container-sm w-100"
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
						</form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						onClick={() => {
							actions.updateContact(
								editingContactId,
								store.addcontact
							);
							handleClose();
						}}
						variant="primary">
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
