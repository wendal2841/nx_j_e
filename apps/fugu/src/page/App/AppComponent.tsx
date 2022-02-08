import React from 'react';
import { Icon } from '@icons/components/Icon';
import { Glyphs } from '@icons/components/Icon/glyphs';
import { IPropsAppComponent } from './types';

import css from './App.module.css';

const AppComponent: React.FC<IPropsAppComponent> = ({ name, onClick }) => (
	<div className={css.wrapper} onClick={onClick}>
		{name}
		<Icon glyph={Glyphs.Add} />
	</div>
);

export default AppComponent;
