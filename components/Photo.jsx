import React, { forwardRef } from 'react';

export const Photo = forwardRef(function Photo(
	{ url, index, faded, style, ...props },
	ref
) {
	const inlineStyles = {
		opacity: faded ? '0.2' : '1',
		transformOrigin: '0 0',
		height: index === 0 ? 320 : 150,
		width: index === 0 ? 315 : 150,
		gridRowStart: index === 0 ? 'span 2' : null,
		gridColumnStart: index === 0 ? 'span 2' : null,
		backgroundImage: `url("${url}")`,
		...style,
	};
	return (
		<div
			ref={ref}
			style={inlineStyles}
			className={`bg-center bg-cover bg-white border border-[#dcdfe2] rounded-md p-4 hover:brightness-50`}
			{...props}
		>
			<input type='checkbox' className='z-10 w-5 h-5 cursor-pointer'></input>
		</div>
	);
});

Photo.displayName = 'Photo';
