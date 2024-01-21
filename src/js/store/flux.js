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
			contactList: [
				// {
				// 	full_name: "Dave Bradley",
				// 	email: "dave@gmail.com",
				// 	agenda_slug: "agenda-raul",
				// 	address: "47568 NW 34ST, 33434 FL, USA",
				// 	phone: "7864445566",
				// },
				// {
				// 	full_name: "Pere Ayats",
				// 	email: "test@gmail.com",
				// 	agenda_slug: "agenda-raul",
				// 	address: "BCN",
				// 	phone: "3535566",
				// },
			],
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
			updateContact: () => {
				fetch(
					"https://playground.4geeks.com/apis/fake/contact/agenda/agenda-raul",
					{
						method: "PUT",
						body: [],
					}
				).then();
			},
			deleteAll: () => {
				fetch(
					"https://playground.4geeks.com/apis/fake/contact/agenda/agenda-raul",
					{
						method: "DELETE",
						body: JSON.stringify([]),
					}
				)
					.then((response) => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(() => {
						actions.loadContactList();
					})
					.catch((error) => console.log("Error:", error));
			},
			// Para actualizar los contactos, contactId es el id del contacto que quiero actualizar
			// Con el método delete elimino el contacto recogiendo el id del contacto
			deleteContact: async (contactId) => {
				try {
					const response = await fetch(
						`https://playground.4geeks.com/apis/fake/contact/${contactId}`,
						{
							method: "DELETE",
						}
					).then(() => actions.loadContactList());
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},

			// Input addcontact management
			addContactField: (fieldName, fieldValue) => {
				const store = getStore();
				setStore({
					addcontact: {
						...store.addcontact,
						[fieldName]: fieldValue,
					},
				});
			},
		},
	};
};

export default getState;
