import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopBuyer extends Component {
	componentDidMount() {
		this.props.loadProducts().then(() => {
			console.log(this.props.products);

			this.setState({
				groupByBuyer: Object.entries(
					this.props.products
						.filter((product) => product.purchased)
						.reduce((rv, x) => {
							(rv[x.owner] = rv[x.owner] || []).push(x);
							return rv;
						}, {})
				).sort((a, b) => b[1].length - a[1].length),
			});
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			groupByBuyer: [],
		};
	}

	render() {
		return (
			<div id="content">
				<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl w-full space-y-8">
						<div>
							<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Top buyer
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
						{this.state.groupByBuyer.length ? (
							<table className="border-collapse table-auto w-full text-sm">
								<thead>
									<tr>
										<th
											scope="col"
											className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
										>
											Buyer
										</th>
										<th
											scope="col"
											className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left"
										>
											Products buyed
										</th>
									</tr>
								</thead>
								<tbody className="bg-white">
									{this.state.groupByBuyer.map(([key, value], i) => {
										return (
											<tr key={i}>
												<td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
													{key}
												</td>
												<th>{value.length}</th>
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

export default TopBuyer;
