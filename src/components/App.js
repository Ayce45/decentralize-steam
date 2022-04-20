import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Marketplace from '../abis/Marketplace.json';
import MarketplaceComponent from './Marketplace';
import Product from './Product';
import Profile from './Profile';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import { CurrencyDollarIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
class App extends Component {
	async componentWillMount() {
		await this.loadWeb3();
		await this.loadBlockchainData();
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert(
				'Non-Ethereum browser detected. You should consider trying MetaMask!'
			);
		}
	}

	productAddNotify() {
		toast.custom(
			(t) => (
				<div
					className={[
						'flex flex-row items-center justify-between w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out',
						t.visible ? 'top-0' : '-top-96',
					]}
				>
					<div>
						<PlusIcon
							className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							aria-hidden="true"
						/>
					</div>
					<div className="flex flex-col items-start justify-center ml-4 cursor-default">
						<h1 className="text-base text-gray-200 font-semibold leading-none tracking-wider">
							Product Added Successful
						</h1>
						<p className="text-sm text-gray-400 mt-2 leading-relaxed tracking-wider">
							You can see your product in macketplace now
						</p>
					</div>
					<div
						className="absolute top-2 right-2 cursor-pointer text-lg"
						onClick={() => toast.dismiss(t.id)}
					>
						<XIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />
					</div>
				</div>
			),
			{ id: 'unique-notification', position: 'top-center' }
		);
	}

	productBuyNotify() {
		toast.custom(
			(t) => (
				<div
					className={[
						'flex flex-row items-center justify-between w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out',
						t.visible ? 'top-0' : '-top-96',
					]}
				>
					<div>
						<CurrencyDollarIcon
							className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							aria-hidden="true"
						/>
					</div>
					<div className="flex flex-col items-start justify-center ml-4 cursor-default">
						<h1 className="text-base text-gray-200 font-semibold leading-none tracking-wider">
							Product Buyed Successful
						</h1>
						<p className="text-sm text-gray-400 mt-2 leading-relaxed tracking-wider">
							You can see your key in your profile
						</p>
					</div>
					<div
						className="absolute top-2 right-2 cursor-pointer text-lg"
						onClick={() => toast.dismiss(t.id)}
					>
						<XIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />
					</div>
				</div>
			),
			{ id: 'unique-notification', position: 'top-center' }
		);
	}

	async loadBlockchainData() {
		const web3 = window.web3;
		// Load account
		const accounts = await web3.eth.getAccounts();
		this.setState({ account: accounts[0] });
		const networkId = await web3.eth.net.getId();
		const networkData = Marketplace.networks[networkId];
		if (networkData) {
			const marketplace = web3.eth.Contract(
				Marketplace.abi,
				networkData.address
			);
			this.setState({ marketplace });
			this.setState({ loading: false });
		} else {
			window.alert('Marketplace contract not deployed to detected network.');
		}
	}

	async loadProducts() {
		const productCount = await this.state.marketplace.methods
			.productCount()
			.call();
		this.setState({ productCount });
		// Load products
		let products = [];
		for (var i = 1; i <= productCount; i++) {
			products.push(await this.state.marketplace.methods.products(i).call());
		}
		this.setState({ products });
	}

	constructor(props) {
		super(props);
		this.state = {
			account: '',
			products: [],
			productCount: 0,
			loading: true,
			marketplace: {},
		};

		this.createProduct = this.createProduct.bind(this);
		this.purchaseProduct = this.purchaseProduct.bind(this);
		this.loadProducts = this.loadProducts.bind(this);
	}

	async createProduct(name, price) {
		this.setState({ loading: true });
		this.state.marketplace.methods
			.createProduct(name, price)
			.send({ from: this.state.account })
			.once('transactionHash', async () => {
				this.productAddNotify();
				this.setState({ loading: false });
			});
	}

	purchaseProduct(id, price) {
		this.setState({ loading: true });
		this.state.marketplace.methods
			.purchaseProduct(id)
			.send({ from: this.state.account, value: price })
			.once('transactionHash', () => {
				this.loadProducts().then(() => {
					this.productBuyNotify();
					this.setState({ loading: false });
				});
			});
	}

	render() {
		return (
			<Router>
				<div>
					<Navbar account={this.state.account} />
					<Toaster />
					<div className="container-fluid mt-5">
						<div className="row">
							<main role="main" className="col-lg-12 d-flex">
								{this.state.loading ? (
									<div id="loader" className="text-center">
										<p className="text-center">Loading...</p>
									</div>
								) : (
									<Routes>
										<Route
											path="/"
											element={
												<MarketplaceComponent
													account={this.state.account}
													products={this.state.products}
													purchaseProduct={this.purchaseProduct}
													loadProducts={this.loadProducts}
												/>
											}
										/>
										<Route
											path="/marketplace"
											element={
												<MarketplaceComponent
													account={this.state.account}
													products={this.state.products}
													purchaseProduct={this.purchaseProduct}
													loadProducts={this.loadProducts}
												/>
											}
										/>
										<Route
											path="/product"
											element={<Product createProduct={this.createProduct} />}
										/>
										<Route
											path="/profile"
											element={
												<Profile
													account={this.state.account}
													products={this.state.products}
													loadProducts={this.loadProducts}
												/>
											}
										/>
									</Routes>
								)}
							</main>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
