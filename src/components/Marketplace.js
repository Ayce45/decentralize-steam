import React, { Component } from 'react';

class Marketplace extends Component {
	render() {
		return (
			<div id="content">
				<h2>Buy Product</h2>
				<table className="border-collapse table-auto w-full text-sm">
					<thead>
						<tr>
							<th
								scope="col"
								className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
							>
								#
							</th>
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
							<th
								scope="col"
								className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
							>
								Owner
							</th>
							<th
								scope="col"
								className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
							></th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{this.props.products.map((product, key) => {
							return (
								<tr key={key}>
									<th scope="row">{product.id.toString()}</th>
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
									<td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
										{product.owner}
									</td>
									<td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
										{!product.purchased ? (
											<button
												name={product.id}
												value={product.price}
												onClick={(event) => {
													this.props.purchaseProduct(
														event.target.name,
														event.target.value
													);
												}}
											>
												Buy
											</button>
										) : null}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Marketplace;
