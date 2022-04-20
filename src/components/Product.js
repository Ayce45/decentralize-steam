import React, { Component } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

class Product extends Component {
	render() {
		return (
			<div id="content">
				<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-md w-full space-y-8">
						<div>
							<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Add Product
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
						<form
							onSubmit={(event) => {
								event.preventDefault();
								const name = this.productName.value;
								const price = window.web3.utils.toWei(
									this.productPrice.value.toString(),
									'Ether'
								);
								this.props.createProduct(name, price);
							}}
						>
							<label className="block">
								<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
									Product Name
								</span>
								<input
									id="productName"
									type="text"
									ref={(input) => {
										this.productName = input;
									}}
									required
									className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
									placeholder="Product Name"
								/>
							</label>
							<label className="block mt-3">
								<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
									Product Price
								</span>
								<input
									id="productPrice"
									type="text"
									ref={(input) => {
										this.productPrice = input;
									}}
									required
									className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
									placeholder="Product Price"
								/>
							</label>

							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5"
							>
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<PlusIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Add
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;
