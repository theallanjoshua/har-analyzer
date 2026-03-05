import type { EnhancedBoardProps } from '~/components/enhanced-board';
import useLocalStorage from './local-storage';

export default function useBoardDefinitionsPreference(boardId: string, defaultDefinitionsPreference: EnhancedBoardProps['definitions']) {
	return useLocalStorage(`boardDefinitionsPreference_${boardId}`, defaultDefinitionsPreference);
}
