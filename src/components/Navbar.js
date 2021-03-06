import React, { Component, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import logo from '../logo.png';
import logoNavbar from '../navbar.png';
import { NavLink } from 'react-router-dom';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

class Navbar extends Component {
	render() {
		return (
			<Disclosure as="nav" className="bg-gray-800">
				{({ open }) => (
					<>
						<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
							<div className="relative flex items-center justify-between h-16">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									{/* Mobile menu button*/}
									<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
									<NavLink to="/" className="not-active">
										<div className="flex-shrink-0 flex items-center">
											<img
												className="block lg:hidden h-8 w-auto"
												src={logo}
												alt="Workflow"
											/>
											<img
												className="hidden lg:block h-8 w-auto"
												src={logoNavbar}
												alt="Workflow"
											/>
										</div>
									</NavLink>
									<div className="hidden sm:block sm:ml-6">
										<div className="flex space-x-4">
											<NavLink
												to="/marketplace"
												className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
											>
												Marketplace
											</NavLink>
											<NavLink
												to="/product"
												className={
													'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
												}
											>
												Add Product
											</NavLink>
											<NavLink
												to="/top-owner"
												className={
													'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
												}
											>
												Top Owner
											</NavLink>
											<NavLink
												to="/top-buyer"
												className={
													'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
												}
											>
												Top Buyer
											</NavLink>
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<button
										type="button"
										className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
									>
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>

									{/* Profile dropdown */}
									<Menu as="div" className="ml-3 relative">
										<div>
											<Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
												<span className="sr-only">Open user menu</span>
												<img
													className="h-8 w-8 rounded-full"
													src={`https://avatars.dicebear.com/api/adventurer-neutral/${this.props.account}.svg`}
													title={this.props.account}
													alt="User"
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<NavLink
															to="/profile"
															className={classNames(
																active ? 'bg-gray-100' : '',
																'block px-4 py-2 text-sm text-gray-700'
															)}
														>
															Your buyed products
														</NavLink>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="sm:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1">
								<Disclosure.Button
									as="a"
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								>
									<NavLink
										to="/marketplace"
										className={
											'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
										}
									>
										Marketplace
									</NavLink>
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								>
									<NavLink
										to="/product"
										className={
											'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
										}
									>
										Add Product
									</NavLink>
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								>
									<NavLink
										to="/top-owner"
										className={
											'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
										}
									>
										Top Owner
									</NavLink>
								</Disclosure.Button>
								<Disclosure.Button
									as="a"
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								>
									<NavLink
										to="/top-buyer"
										className={
											'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
										}
									>
										Top Buyer
									</NavLink>
								</Disclosure.Button>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		);
	}
}

export default Navbar;
