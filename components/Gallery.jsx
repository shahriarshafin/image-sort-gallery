'use client';
import {
	DndContext,
	DragOverlay,
	MouseSensor,
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
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

	return (
		<div>
			<div className='px-7 py-3 bg-white border-b rounded-t-md flex justify-between items-center'>
				<p className='text-lg font-semibold'>Gallery</p>
				<button className='text-[#ea3f34] hover:underline'>Delete files</button>
			</div>
			<div className='p-7 rounded-b-md bg-white'>
				<DndContext
					// sensors={sensors}
					// collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					onDragCancel={handleDragCancel}
				>
					<SortableContext items={items} strategy={rectSortingStrategy}>
						<div
							className={`grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-5`}
						>
							{items.map((item, index) => (
								<SortablePhoto key={item} url={item} index={index} />
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

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}

		setActiveId(null);
	}

	function handleDragCancel() {
		setActiveId(null);
	}
};

export default UploadGallery;
