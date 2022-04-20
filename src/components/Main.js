import React, { Component } from 'react';

class Main extends Component {
	render() {
		return (
			<div id="content">
				<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl w-full space-y-8">
						<div>
							<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
								Welcome
							</h1>
							<p className="mt-2 text-center text-sm text-gray-600">
								<p className="font-medium text-indigo-600 hover:text-indigo-500">
									{this.props.account}
								</p>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;
