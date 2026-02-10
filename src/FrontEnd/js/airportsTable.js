// js/airportsTable.js

const DATA_URL = 'http://127.0.0.1:3000/JSONs/airports.json';

// Columns to display in the table
const HEADER_COLS = [
	'icao_code',
	'is_hub',
	'latitude_deg',
	'longitude_deg',
	'runways',
];

// var mypromise = new Promise((resolve, reject) => {
// 	// networking logic
// 	var data = false;

// 	if (data) {
// 		resolve(data);
// 	} else {
// 		reject('Error 💥💥💥');
// 	}
// });

// mypromise.then(val => {
// 	console.log(val);
// });

// mypromise.catch(error => {
// 	console.log(`ERORR ${error}`);
// });

// fetch(DATA_URL)
// 	.then(HTTPResponse => {
// 		if (!HTTPResponse.ok) throw new Error('Error fetching data');
// 		HTTPResponse.json().then(data => console.log(data));
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

async function fetchData(URL) {
	try {
		const response = await fetch(URL);

		if (!response.ok) {
			throw new Error('Error fetching data');
		}
		const data = await response.json();
		generateTable(data);
		// console.log(data);
	} catch (error) {
		console.log(error);
	} finally {
		document.getElementById('airports--loading').remove();
	}
}

function generateTable(data) {
	var table = document.createElement('table');
	document.body.appendChild(table);

	var headerRow = document.createElement('tr');

	HEADER_COLS.forEach(colName => {
		const th = document.createElement('th');
		th.textContent = colName;
		headerRow.appendChild(th);
	});

	table.appendChild(headerRow);

	Object.values(data).forEach(element => {
		const tr = document.createElement('tr');

		HEADER_COLS.forEach(col => {
			const td = document.createElement('td');

			if (col === 'runways') {
				td.textContent = element[col].length ?? '';
			} else {
				td.textContent = element[col] ?? '';
			}
			tr.appendChild(td);
		});
		table.appendChild(tr);
	});
}
fetchData(DATA_URL);
