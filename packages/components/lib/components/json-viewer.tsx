import type { CSSProperties } from 'react';
import {
	colorBackgroundContainerContent,
	colorBorderDividerDefault,
	colorTextBodyDefault,
	colorTextBodySecondary,
	colorTextCounter,
	colorTextLinkDefault,
	colorTextStatusError,
	colorTextStatusSuccess,
	colorTextStatusWarning,
	fontFamilyBase,
} from '@cloudscape-design/design-tokens';
import RJV from '@uiw/react-json-view';

const CUSTOM_THEME = {
	// Structural
	'--w-rjv-font-family': fontFamilyBase,
	'--w-rjv-color': colorTextBodyDefault,
	'--w-rjv-background-color': colorBackgroundContainerContent,
	'--w-rjv-line-color': colorBorderDividerDefault,
	'--w-rjv-arrow-color': colorTextLinkDefault,

	// Keys and Labels
	'--w-rjv-key-string': colorTextBodyDefault,
	'--w-rjv-key-number': colorTextLinkDefault,

	// Punctuation
	'--w-rjv-curlybraces-color': colorTextBodySecondary,
	'--w-rjv-colon-color': colorTextBodySecondary,
	'--w-rjv-brackets-color': colorTextBodySecondary,
	'--w-rjv-ellipsis-color': colorTextStatusWarning,
	'--w-rjv-quotes-color': colorTextBodySecondary,
	'--w-rjv-quotes-string-color': colorTextStatusSuccess,

	// Types
	'--w-rjv-type-string-color': colorTextStatusSuccess,
	'--w-rjv-type-int-color': colorTextStatusWarning,
	'--w-rjv-type-float-color': colorTextStatusWarning,
	'--w-rjv-type-bigint-color': colorTextStatusWarning,
	'--w-rjv-type-boolean-color': colorTextStatusError,
	'--w-rjv-type-date-color': colorTextStatusWarning,
	'--w-rjv-type-url-color': colorTextLinkDefault,
	'--w-rjv-type-null-color': colorTextBodySecondary,
	'--w-rjv-type-nan-color': colorTextBodySecondary,
	'--w-rjv-type-undefined-color': colorTextBodySecondary,

	// Actions
	'--w-rjv-edit-color': colorTextLinkDefault,
	'--w-rjv-info-color': colorTextCounter,
	'--w-rjv-update-color': colorTextLinkDefault,
	'--w-rjv-copied-color': colorTextLinkDefault,
	'--w-rjv-copied-success-color': colorTextStatusSuccess,
} as CSSProperties;

export default function JSONViewer({ data }: { data: object | undefined }) {
	if (!data) {
		return null;
	}

	return <RJV
		value={data}
		style={CUSTOM_THEME}
	/>;
}
