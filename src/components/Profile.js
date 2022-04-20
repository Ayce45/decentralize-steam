import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Profile extends Component {
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
								My buyed products
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
						{this.props.products
							.filter((product) => product.purchased)
							.filter((product) => this.props.account === product.owner)
							.length ? (
							<table className="border-collapse table-auto w-full text-sm">
								<thead>
									<tr>
										<th
											scope="col"
											className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
										>
											Name
										</th>
										<th
											scope="col"
											className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
										>
											Price
										</th>
									</tr>
								</thead>
								<tbody className="bg-white">
									{this.props.products
										.filter((product) => product.purchased)
										.filter((product) => this.props.account === product.owner)
										.map((product, key) => {
											return (
												<tr key={key}>
													<td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
														{product.name}
													</td>
													<td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
														{window.web3.utils.fromWei(
															product.price.toString(),
															'Ether'
														)}{' '}
														Eth
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						) : (
							<p className="text-center text-gray-500">No data found</p>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
