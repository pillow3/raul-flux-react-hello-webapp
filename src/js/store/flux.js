import { Redirect } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
			contactList: [],
			addcontact: {
				full_name: "",
				email: "",
				agenda_slug: "agenda-raul",
				address: "",
				phone: "",
			},
			test: "test",
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			// RAUL
			loadContactList: () => {
				fetch(
					"https://playground.4geeks.com/apis/fake/contact/agenda/agenda-raul"
				)
					.then((response) => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then((data) => {
						setStore({
							contactList: data,
						});
					})
					.catch((error) => console.log("Error:", error));
			},
			getContacts: () => {
				fetch(
					"https://playground.4geeks.com/apis/fake/contact/agenda/agenda-raul"
				)
					.then((response) => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then((data) => {
						setStore({
							contactList: data, // Utiliza el resultado de response.json()
						});
					})
					.catch((error) => console.log("Error:", error));
			},
			createContact: (newContact) => {
				getActions().getContacts();
				const store = getStore();

				console.log(store.addcontact);

				fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(newContact),
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(() => {
						setStore({
							contactList: [...store.contactList, newContact],
						});
					})
					.catch((error) => console.log("Error:", error));
			},
			handleSubmit: (e) => {
				const store = getStore();

				e.preventDefault();
				if (!label) return;

				console.log(store.addcontact);
				// setStore({ addcontact: newContact });
			},

			deleteAll: () => {
				const action = getActions();
				fetch(
					"https://playground.4geeks.com/apis/fake/contact/agenda/agenda-raul",
					{
						method: "DELETE",
					}
				)
					.then((response) => {
						if (!response.ok) {
							throw Error(response.statusText);
						} else {
							action.loadContactList();
						}
					})
					.catch((error) => console.log("Error:", error));
				action.loadContactList();
			},
			deleteContact: async (contactId) => {
				const action = getActions();
				try {
					const response = await fetch(
						`https://playground.4geeks.com/apis/fake/contact/${contactId}`,
						{
							method: "DELETE",
						}
					).then(() => action.loadContactList());
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
				action.loadContactList();
			},

			// Input addcontact management
			addContactField: (fieldName, fieldValue) => {
				const action = getActions();
				const store = getStore();
				setStore({
					addcontact: {
						...store.addcontact,
						[fieldName]: fieldValue,
					},
				});
				action.getContacts();
			},
			updateContact: (contactId, updatedContact) => {
				const action = getActions();
				fetch(
					`https://playground.4geeks.com/apis/fake/contact/${contactId}`,
					{
						method: "PUT", // Cambiamos el método a PUT para actualizar
						body: JSON.stringify(updatedContact),
						headers: {
							"Content-Type": "application/json",
						},
					}
				)
					.then((response) => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then((updatedContact) => {
						// Actualizamos el estado con el contacto actualizado
						setStore((prevStore) => {
							const updatedContactList =
								prevStore.contactList.map((contact) =>
									contact.id === contactId
										? updatedContact
										: contact
								);
							return {
								...prevStore,
								contactList: updatedContactList,
							};
						});
						action.getContacts();
					})
					.catch((error) => console.log("Error:", error));
			},
			setSelectedContact: (contact) => {
				setStore({ addcontact: contact });
			},
		},
	};
};

export default getState;

// Campos vacios de addcontact tras rellenarlo x segunda vez
// Redireccionar tras crear contacto
// getContacts tras delete all
