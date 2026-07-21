import type { ReactNode } from 'react';
import Board from '@cloudscape-design/board-components/board';
import BoardItem from '@cloudscape-design/board-components/board-item';
import Button from '@cloudscape-design/components/button';
import type { EnhancedBoardDefinition, EnhancedBoardDefinitions } from './i18n';
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

	const definitionsWithIds = definitions.map((definition, index) => ({
		...definition,
		id: String(index),
	}));

	return (
		<Board
			i18nStrings={boardI18nStrings}
			items={definitionsWithIds}
			renderItem={({ data }) => {
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
						settings={onRemove && <Button variant="icon" iconName="close" onClick={onRemove} />}
					>
						{content}
					</BoardItem>
				);
			}}
			onItemsChange={({ detail: { items } }) => { onDefinitionsChange(items); }}
			empty={empty}
		/>
	);
}
