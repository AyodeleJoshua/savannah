import type { AvailableTags } from '../types';

export function transformAvailableTagsToOptions(
	availableTags: AvailableTags | undefined,
): { label: string; count: number; id: string }[] {
	if (!availableTags) {
		return [];
	}

	const tagMappings = [
		{ source: availableTags.providers, prefix: 'provider' },
		{ source: availableTags.frameworks, prefix: 'framework' },
		{ source: availableTags.classes, prefix: 'class' },
		{ source: availableTags.reasons, prefix: 'reason' },
	];

	return tagMappings.flatMap(({ source, prefix }) =>
		source.map((item: string) => ({
			label: item,
			count: 0,
			id: `${prefix}-${item}`,
		})),
	);
} 