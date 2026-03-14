import Board from '@cloudscape-design/board-components/board';
import BoardItem from '@cloudscape-design/board-components/board-item';
import Button from '@cloudscape-design/components/button';
import type { EnhancedBoardDefinition, EnhancedBoardDefinitions } from './constants/i18n';
import {
	boardI18nStrings,
	boardItemI18nStrings,
} from './constants/i18n';

interface ComponentDefinition {
	content: React.ReactNode;
	onRemove?: () => void;
}
export interface EnhancedBoardProps {
	components: Record<string, ComponentDefinition | ((instanceId: EnhancedBoardDefinition['data']['instanceId']) => ComponentDefinition)>;
	definitions: EnhancedBoardDefinitions;
	onDefinitionsChange: (definitions: EnhancedBoardDefinitions) => void;
	empty?: React.ReactNode;
}

export default function EnhancedBoard(props: EnhancedBoardProps) {
	const {
		components,
		definitions,
		onDefinitionsChange,
		empty,
	} = props;

	return (
		<Board
			i18nStrings={boardI18nStrings}
			items={definitions}
			renderItem={({ data }) => {
				const { componentKey, instanceId } = data;

				let content: React.ReactNode;
				let onRemove: (() => void) | undefined;

				const component = components[componentKey];

				if (typeof component === 'function') {
					const componentDefinition = component(instanceId);
					content = componentDefinition.content;
					onRemove = componentDefinition.onRemove;
				} else {
					content = component?.content;
					onRemove = component?.onRemove;
				}

				return (
					<BoardItem
						disableContentPaddings
						i18nStrings={boardItemI18nStrings}
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
