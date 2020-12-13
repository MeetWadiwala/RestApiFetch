import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/DataTable.css";

function DataTable() {
	const [services, setServices] = useState([]);

	let total = 0;

	useEffect(() => {
		loadServices();
	}, []);

	const addTotal = (subservice) => {
		total = total + parseInt(subservice.service_selected.price, 10);
	};

	const loadServices = async () => {
		const result = await axios.get(`/practical-api.json`);

		setServices(result.data.data.purchased_services);
	};

	return (
		<div className="homemain">
			<h1>Purchased Services</h1>

			<table class="table border shadow">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Main Services</th>
						<th colSpan="3">Sub Services</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service, index) => (
						<tr>
							<td>{service.name}</td>
							{service.purchased_office_template.purchased_office_services.map(
								(subservice, index) => (
									<td>
										{subservice.service_selected !== null || undefined ? (
											<>
												{subservice.name}
												{addTotal(subservice)}
											</>
										) : (
											"--"
										)}
									</td>
								)
							)}
						</tr>
					))}
					<td colSpan="4">
						<b>Total={total}</b>
					</td>
				</tbody>
			</table>

			<h1>Additional Services</h1>
			<table class="table border shadow">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Main Services</th>
						<th colSpan="3">Sub Services</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service, index) => (
						<tr>
							<td>{service.name}</td>
							{service.purchased_office_template.purchased_office_services.map(
								(subservice, index) => (
									<td>
										{subservice.service_selected === null || undefined
											? subservice.name
											: "--"}
									</td>
								)
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default DataTable;
