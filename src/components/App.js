import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Marketplace from '../abis/Marketplace.json';
import MarketplaceComponent from './Marketplace';
import Product from './Product';
import Profile from './Profile';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
			await this.loadProducts();
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
		for (var i = 1; i <= productCount; i++) {
			const product = await this.state.marketplace.methods.products(i).call();
			this.setState({
				products: [...this.state.products, product],
			});
		}
		console.log('products loaded');
		console.log(this.state.account);
		console.log(this.state.products);
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
	}

	async createProduct(name, price) {
		this.setState({ loading: true });
		this.state.marketplace.methods
			.createProduct(name, price)
			.send({ from: this.state.account })
			.once('transactionHash', async () => {
				await this.loadProducts();
				this.setState({ loading: false });
			});
	}

	purchaseProduct(id, price) {
		this.setState({ loading: true });
		this.state.marketplace.methods
			.purchaseProduct(id)
			.send({ from: this.state.account, value: price })
			.once('transactionHash', () => {
				this.setState({ loading: false });
			});
	}

	render() {
		return (
			<Router>
				<div>
					<Navbar account={this.state.account} />
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
													products={this.state.products}
													purchaseProduct={this.purchaseProduct}
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
												/>
											}
										/>
										<Route
											path="/product"
											element={<Product createProduct={this.createProduct} />}
										/>
										<Route path="/profile" element={<Profile />} />
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
