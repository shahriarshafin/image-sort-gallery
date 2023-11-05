const Header = ({ selectedCount, deleteSelectedItems }) => {
	const anyItemSelected = selectedCount > 0;
	const fileOrFiles = selectedCount === 1 ? 'File' : 'Files';

	return (
		<div className='px-7 py-3 bg-white border-b rounded-t-md flex justify-between items-center'>
			<p className='text-lg font-semibold'>
				{selectedCount === 0 ? (
					'Gallery'
				) : (
					<div className='flex items-center gap-3'>
						<svg
							className='h-5 w-5'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 448 512'
						>
							<path
								d='M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'
								fill='#0175ff'
							/>
						</svg>
						{selectedCount} {fileOrFiles} Selected
					</div>
				)}
			</p>
			{anyItemSelected && (
				<button
					onClick={deleteSelectedItems}
					className='text-[#ea3f34] hover:underline'
				>
					Delete {fileOrFiles}
				</button>
			)}
		</div>
	);
};

export default Header;
