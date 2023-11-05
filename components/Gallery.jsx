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
import toast, { Toaster } from 'react-hot-toast';
import { photos } from '../data/photos';
import Header from './Header';
import { PhotoCard } from './PhotoCard';
import { SortablePhoto } from './SortablePhoto';
import UploadZone from './UploadZone';

const Gallery = () => {
	const [photoData, setPhotoData] = useState(photos);
	const [activeId, setActiveId] = useState(null);
	const [selectedCount, setSelectedCount] = useState(0);
	const [selectedIndexes, setSelectedIndexes] = useState([]);

	// Initializing sensors for detect input methods to manage drag operations
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
	);

	const handleDragStart = (event) => setActiveId(event.active.id);

	const handleDragCancel = () => setActiveId(null);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			// Reorders the images after drag
			setPhotoData((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				const updatedItems = arrayMove(items, oldIndex, newIndex);

				// Adjusts selected indexes when images are rearranged
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
	};

	const handlePhotoSelection = (index, isSelected) => {
		setSelectedCount((prevCount) =>
			isSelected ? prevCount + 1 : prevCount - 1
		);
		setSelectedIndexes((prevSelectedIndexes) =>
			isSelected
				? [...prevSelectedIndexes, index]
				: prevSelectedIndexes.filter((i) => i !== index)
		);
	};

	const deleteSelectedItems = () => {
		toast.success('Deleted Successfully!');

		if (selectedIndexes.length > 0) {
			// Filter out selected images
			const newItems = photoData.filter(
				(_, index) => !selectedIndexes.includes(index)
			);
			setPhotoData(newItems);
			setSelectedIndexes([]);
			setSelectedCount(0);
		}
	};

	return (
		<div className='shadow rounded-md'>
			<Header
				selectedCount={selectedCount}
				deleteSelectedItems={deleteSelectedItems}
			/>
			<div className='p-8 rounded-b-md bg-white'>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDragCancel={handleDragCancel}
				>
					<SortableContext items={photoData} strategy={rectSortingStrategy}>
						<div
							className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 auto-rows-fr`}
						>
							{photoData.map((item, index) => (
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
						{activeId && (
							<PhotoCard url={activeId} index={photoData.indexOf(activeId)} />
						)}
					</DragOverlay>
				</DndContext>
			</div>
			<Toaster position='top-right' />
		</div>
	);
};

export default Gallery;
