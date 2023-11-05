import Image from 'next/image';
import React, { forwardRef, useState } from 'react';

export const PhotoCard = forwardRef(function PhotoCard(
	{ url, index, faded, style, onSelectionChange, isDragging, ...props },
	ref
) {
	const [checked, setChecked] = useState(false);

	const handleCheckboxChange = () => {
		setChecked(!checked);
		if (onSelectionChange) {
			onSelectionChange(!checked);
		}
	};

	// Generates a shimmer effect for the placeholder image
	const shimmer = (w, h) => `
	<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  		<defs>
    	 <linearGradient id="g">
      		<stop stop-color="#e7e8eb" offset="20%" />
     		 <stop stop-color="#f0f1f4" offset="50%" />
      		<stop stop-color="#e7e8eb" offset="70%" />
    	 </linearGradient>
  		</defs>
	  <rect width="${w}" height="${h}" fill="#e4e7eb" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

	// Converts the provided string to base64 format
	const toBase64 = (str) =>
		typeof window === 'undefined'
			? Buffer.from(str).toString('base64')
			: window.btoa(str);

	return (
		<div
			ref={ref}
			style={style}
			className={`relative bg-center bg-cover bg-white border border-[#dcdfe2] rounded-md group origin-[0_0] ${
				index === 0 && ' row-span-2 col-span-2'
			}`}
			{...props}
		>
			<Image
				src={url}
				alt={url}
				placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
				height={500}
				width={500}
				className={`rounded-md transition ease-in group-hover:brightness-50 w-full h-full
				${checked && ' opacity-50 group-hover:!brightness-100'}
				${!isDragging && ' group-hover:!brightness-100'}`}
			/>
			<div
				className={`absolute opacity-0 transition ease-in group-hover:opacity-100 top-3 left-3
				${checked && ' opacity-100'} ${!isDragging && ' !opacity-0'}`}
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
