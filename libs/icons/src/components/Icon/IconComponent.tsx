import React from 'react';

/* @Types */
import { IPropsIcon } from './types';

/* @Utils */
import { getCSSClasses } from './utils';

const IconComponent: React.FC<IPropsIcon> = ({
	className,
	glyph = '',
	size = 'md',
	appearance = 'gray',
	style,
	onClick,
}): JSX.Element => {
	const { wrapper } = getCSSClasses(size, appearance, className);

	return (
		<svg className={wrapper} style={style} onClick={onClick}>
			<use xlinkHref={`#icon-${glyph}`} />
		</svg>
	);
};

IconComponent.displayName = 'Icon';

export default IconComponent;
