import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home.page';
import TemplatesPage from './pages/templates.page';
import MainSidebar from './components/MainSidebar';
import MainHeader from './components/MainHeader';
import AppLayout from './components/AppLayout';

function App() {
	return (
		<Router>
			<MainHeader />
			<AppLayout>
				<MainSidebar />
				<Switch>
					<Route path="/template" component={TemplatesPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</AppLayout>
		</Router>
	);
}

export default App;
