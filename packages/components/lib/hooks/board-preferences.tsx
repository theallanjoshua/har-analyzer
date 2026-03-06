import type { EnhancedBoardProps } from '~/components/enhanced-board';
import { useHARAnalyzerPreferences } from '~/har-analyzer-preferences';

export default function useBoardDefinitionsPreference(boardId: string, defaultDefinitionsPreference: EnhancedBoardProps['definitions']) {
	return useHARAnalyzerPreferences(`boardDefinitionsPreference_${boardId}`, defaultDefinitionsPreference);
}
