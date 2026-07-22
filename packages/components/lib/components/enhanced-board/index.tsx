import type { BoardProps } from '@cloudscape-design/board-components/board';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import type { ReactNode } from 'react';
import Board from '@cloudscape-design/board-components/board';
import BoardItem from '@cloudscape-design/board-components/board-item';
import Button from '@cloudscape-design/components/button';
import { useCallback } from 'react';
import type {
	EnhancedBoardDefinition,
	EnhancedBoardDefinitions,
	EnhancedBoardItemData,
} from './i18n';
import {
	boardI18nStrings,
	boardItemI18nStrings,
} from './i18n';

interface ComponentDefinition {
	content: ReactNode;
	header?: ReactNode;
	onRemove?: () => void;
}
export interface EnhancedBoardProps {
	components: Record<string, ComponentDefinition | ((instanceId: EnhancedBoardDefinition['data']['instanceId']) => ComponentDefinition)>;
	definitions: EnhancedBoardDefinitions;
	onDefinitionsChange: (definitions: EnhancedBoardDefinitions) => void;
	empty?: ReactNode;
}

export default function EnhancedBoard(props: EnhancedBoardProps) {
	const {
		components,
		definitions,
		onDefinitionsChange,
		empty,
	} = props;

	const renderItem = useCallback(({ data }: EnhancedBoardDefinition) => {
		const { componentType, instanceId } = data;

		let content: ReactNode;
		let header: ReactNode;
		let onRemove: (() => void) | undefined;

		const component = components[componentType];

		if (typeof component === 'function') {
			const componentDefinition = component(instanceId);
			content = componentDefinition.content;
			header = componentDefinition.header;
			onRemove = componentDefinition.onRemove;
		} else {
			content = component?.content;
			header = component?.header;
			onRemove = component?.onRemove;
		}

		return (
			<BoardItem
				disableContentPaddings
				i18nStrings={boardItemI18nStrings}
				header={header}
				settings={onRemove && <Button variant='icon' iconName='close' onClick={onRemove} />}
			>
				{content}
			</BoardItem>
		);
	}, [components]);

	const onItemsChange = useCallback(({ detail: { items } }: NonCancelableCustomEvent<BoardProps.ItemsChangeDetail<EnhancedBoardItemData>>) => {
		onDefinitionsChange(items);
	}, [onDefinitionsChange]);

	return (
		<Board
			i18nStrings={boardI18nStrings}
			items={definitions}
			renderItem={renderItem}
			onItemsChange={onItemsChange}
			empty={empty}
		/>
	);
}
