import React, { Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from '../abis/Marketplace.json';
import toast, { Toaster } from 'react-hot-toast';
import { CurrencyDollarIcon, PlusIcon, XIcon } from '@heroicons/react/solid';

import './App.css';

// Components
import MarketplaceComponent from './Marketplace';
import Product from './Product';
import Profile from './Profile';
import TopOwner from './topOwner';
import TopBuyer from './topBuyer';
import Navbar from './Navbar';
import Main from './Main';
class App extends Component {
	async componentDidMount() {
		await this.loadWeb3();
		await this.loadBlockchainData();
	}

	async loadWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
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
			{ position: 'bottom-center', duration: 2000 }
		);
	}

	productBuyNotify() {
		toast.custom(
			(t) => (
				<div
					className={[
						'flex flex-row items-center justify-between w-86 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out',
						t.visible ? 'top-0' : '-top-86',
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
			{
				position: 'bottom-center',
				duration: 2000,
			}
		);
	}

	async loadBlockchainData() {
		const web3 = window.web3;
		if (web3) {
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
				this.setState({ loading: false });
				this.setState({ incorrectMarketplace: true });
			}
		} else {
			this.setState({ loading: false });
			this.setState({ incorrectBrowser: true });
		}
	}

	async loadProducts() {
		const productCount = await this.state.marketplace.methods
			.productCount()
			.call();
		this.setState({ productCount });
		// Load products
		let products = [];
		this.setState({ products });
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
			countProductOfOwner: {},
			incorrectMarketplace: false,
			incorrectBrowser: false,
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
			})
			.on('error', () => {
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
			})
			.on('error', () => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<Router>
				<div>
					{!this.state.incorrectBrowser &&
						!this.state.incorrectMarketplace &&
						!this.state.loading && <Navbar account={this.state.account} />}
					<Toaster />
					<div className="container-fluid mt-5">
						<div className="row">
							<main role="main" className="col-lg-12 d-flex">
								{this.state.incorrectBrowser ? (
									<p className="text-center text-gray-500">
										Non-Ethereum browser detected. You should consider trying
										MetaMask!
									</p>
								) : this.state.incorrectMarketplace ? (
									<p className="text-center text-gray-500">
										Marketplace contract not deployed to detected network.
									</p>
								) : this.state.loading ? (
									<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
										<div className="flex items-center justify-center space-x-2">
											<div className="animate-bounce w-8 h-8 bg-indigo-200 rounded-full"></div>
											<div className="animate-bounce w-8 h-8 bg-indigo-400 rounded-full"></div>
											<div className="animate-bounce w-8 h-8 bg-indigo-600 rounded-full"></div>
										</div>
										<span className="sr-only">Loading...</span>
									</div>
								) : (
									<Routes>
										<Route
											path="/"
											element={<Main account={this.state.account} />}
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
										<Route
											path="/top-owner"
											element={
												<TopOwner
													account={this.state.account}
													products={this.state.products}
													loadProducts={this.loadProducts}
												/>
											}
										/>
										<Route
											path="/top-buyer"
											element={
												<TopBuyer
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
