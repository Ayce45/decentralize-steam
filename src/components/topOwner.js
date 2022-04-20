import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopOwner extends Component {
	componentDidMount() {
		this.props.loadProducts();
	}

	render() {
		return (
			<div id="content">
				<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl w-full space-y-8">
						<div>
							<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Top owner
							</h1>
							<p className="mt-2 text-center text-sm text-gray-600">
								Or{' '}
								<Link
									to="/marketplace"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									check the marketplace
								</Link>
							</p>
						</div>
						<table className="border-collapse table-auto w-full text-sm">
							<thead>
								<tr>
									<th
										scope="col"
										className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
									>
										Owner
									</th>
									<th
										scope="col"
										className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
									>
										Products owned
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{Object.keys(
									this.props.products.reduce((rv, x) => {
										(rv[x.owner] = rv[x.owner] || []).push(x);
										return rv;
									}, {})
								).reduce((acc, curr) => {
									return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
								}, {})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default TopOwner;
