import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PhotoCard } from './PhotoCard';

export const SortablePhoto = (props) => {
	const {
		attributes,
		listeners,
		isDragging,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: props.url });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<PhotoCard
			ref={setNodeRef}
			style={style}
			isDragging
			{...props}
			{...attributes}
			{...listeners}
		/>
	);
};
