import Image from 'next/image';
import React, { forwardRef, useState } from 'react';

export const Photo = forwardRef(function Photo(
	{ url, index, faded, style, onSelectionChange, ...props },
	ref
) {
	const [checked, setChecked] = useState(false);

	const handleCheckboxChange = () => {
		const newChecked = !checked;
		setChecked(newChecked);
		if (onSelectionChange) {
			onSelectionChange(newChecked);
		}
	};

	const inlineStyles = {
		opacity: faded ? '0.2' : '1',
		transformOrigin: '0 0',
		height: index === 0 ? 320 : 150,
		width: index === 0 ? 315 : 150,
		gridRowStart: index === 0 ? 'span 2' : null,
		gridColumnStart: index === 0 ? 'span 2' : null,
		// backgroundImage: `url("${url}")`,
		...style,
	};
	return (
		<div
			ref={ref}
			style={inlineStyles}
			className={`relative bg-center bg-cover bg-white border border-[#dcdfe2] rounded-md group`}
			{...props}
		>
			<Image
				src={`/${url}`}
				alt={`/${url}`}
				priority
				fill
				className={`rounded-md transition ease-in group-hover:brightness-50 w-full h-full ${
					checked && 'opacity-50 group-hover:!brightness-100'
				}`}
			/>
			<div
				className={`absolute opacity-0 transition ease-in group-hover:opacity-100 top-3 left-3 ${
					checked && 'opacity-100'
				}`}
			>
				<input
					type='checkbox'
					className='z-10 w-4 h-4 cursor-pointer'
					checked={checked}
					onChange={handleCheckboxChange}
				></input>
			</div>
		</div>
	);
});

Photo.displayName = 'Photo';
