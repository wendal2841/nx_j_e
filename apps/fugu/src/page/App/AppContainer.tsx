import React, { useState } from 'react';
import { IPropsAppContainer } from './types';
import AppComponent from './AppComponent';

const AppContainer: React.FC<IPropsAppContainer> = ({ name = 'App' }) => {
	const [_name, setName] = useState(name);

	const handleClick = () => {
		setName(`App - ${Math.random()}`);
	};

	return <AppComponent name={_name} onClick={handleClick} />;
};

export default AppContainer;
