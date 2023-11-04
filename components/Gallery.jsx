'use client';
import {
	DndContext,
	DragOverlay,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useState } from 'react';

import { Photo } from './Photo';
import { SortablePhoto } from './SortablePhoto';
import UploadZone from './UploadZone';
import { photos } from './photos';

const UploadGallery = () => {
	const [items, setItems] = useState(photos);
	const [activeId, setActiveId] = useState(null);
	const [selectedCount, setSelectedCount] = useState(0);
	const [selectedIndexes, setSelectedIndexes] = useState([]);

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				const updatedItems = arrayMove(items, oldIndex, newIndex);

				const updatedSelectedIndexes = selectedIndexes.map((index) => {
					if (index === oldIndex) {
						return newIndex;
					} else if (index === newIndex && newIndex > oldIndex) {
						return index - 1;
					}
					return index;
				});

				setSelectedIndexes(updatedSelectedIndexes);

				return updatedItems;
			});
		}

		setActiveId(null);
	}

	function handleDragCancel() {
		setActiveId(null);
	}

	// Function to handle checkbox change in Photo component
	function handlePhotoSelection(index, isSelected) {
		setSelectedCount((prevCount) =>
			isSelected ? prevCount + 1 : prevCount - 1
		);
		setSelectedIndexes((prevSelectedIndexes) => {
			if (isSelected) {
				return [...prevSelectedIndexes, index];
			} else {
				return prevSelectedIndexes.filter((i) => i !== index);
			}
		});
	}
	function deleteSelectedItems() {
		if (selectedIndexes.length > 0) {
			const newItems = items.filter(
				(item, index) => !selectedIndexes.includes(index)
			);
			setItems(newItems);
			setSelectedIndexes([]);
			setSelectedCount(0);
		}
	}

	return (
		<div className='shadow rounded-md'>
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
							{selectedCount} {selectedCount === 1 ? 'File' : 'Files'} Selected
						</div>
					)}
				</p>
				{selectedCount > 0 && (
					<button
						onClick={deleteSelectedItems}
						className='text-[#ea3f34] hover:underline'
					>
						Delete {selectedCount === 1 ? 'file' : 'files'}
					</button>
				)}
			</div>
			<div className='p-8 rounded-b-md bg-white'>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDragCancel={handleDragCancel}
				>
					<SortableContext items={items} strategy={rectSortingStrategy}>
						<div
							className={`grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-5`}
						>
							{items.map((item, index) => (
								<SortablePhoto
									key={item}
									url={item}
									index={index}
									onSelectionChange={(isSelected) =>
										handlePhotoSelection(index, isSelected)
									}
								/>
							))}
							<UploadZone />
						</div>
					</SortableContext>

					<DragOverlay adjustScale={true}>
						{activeId ? (
							<Photo url={activeId} index={items.indexOf(activeId)} />
						) : null}
					</DragOverlay>
				</DndContext>
			</div>
		</div>
	);
};

export default UploadGallery;
