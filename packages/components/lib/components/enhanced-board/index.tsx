import type { BoardProps } from '@cloudscape-design/board-components/board';
import type { HeaderProps } from '@cloudscape-design/components/header';
import Board from '@cloudscape-design/board-components/board';
import BoardItem from '@cloudscape-design/board-components/board-item';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import type { EnhancedBoardDefinitions } from './constants/i18n';
import {
	boardI18nStrings,
	boardItemI18nStrings,

} from './constants/i18n';

export interface EnhancedBoardProps {
	components: Record<
		string,
		{
			title: string;
			content: React.ReactNode;
			counter?: string;
			actions?: HeaderProps['actions'];
			canRemove?: boolean;
		}
	>;
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
			items={definitions as BoardProps.Item<undefined>[]}
			renderItem={({ id }, { removeItem }) => {
				const {
					title,
					content,
					actions,
					counter,
					canRemove,
				} = components[id] ?? {};
				return (
					<BoardItem
						header={
							<Header counter={counter} actions={actions}>
								{title}
							</Header>
						}
						i18nStrings={boardItemI18nStrings}
						settings={canRemove && <Button variant="icon" iconName="close" onClick={removeItem} />}
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
