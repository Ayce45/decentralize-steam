import React, { Component } from 'react';

class Profile extends Component {
	render() {
		return (
			<div id="content">
				<h2 className="pl-4">My products</h2>
				<div className="min-h-full flex items-start justify-start py-12 px-4 sm:px-6 lg:px-16">
					<div className="max-w-md w-full space-y-8">
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
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
