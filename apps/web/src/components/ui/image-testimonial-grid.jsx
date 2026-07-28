import React, { useState, useEffect, Children } from 'react';
import { motion } from 'framer-motion';

// Tailwind's default breakpoints (sm/lg/xl) mirrored here since the column
// count is driven by an actual window resize listener rather than CSS media
// queries — CSS column-count can't respond to Tailwind's responsive classes.
function getResponsiveColumnCount() {
	if (typeof window === 'undefined') return 1;
	const w = window.innerWidth;
	if (w >= 1280) return 4; // xl
	if (w >= 1024) return 3; // lg
	if (w >= 640) return 2; // sm
	return 1;
}

/**
 * MasonryGrid — a Pinterest/Instagram-style photo grid built with CSS
 * multi-column layout (not CSS grid), so cards of different heights stack
 * into balanced columns instead of leaving gaps.
 *
 * Props:
 *  - columns: optional fixed column count; when omitted the column count is
 *    responsive (1 on mobile, 2 sm, 3 lg, 4 xl) via a window resize listener.
 *  - gap: column/row gap in pixels (default 16).
 *  - children: the individual card elements to lay out.
 */
export function MasonryGrid({ columns, gap = 16, children }) {
	const [autoColumns, setAutoColumns] = useState(getResponsiveColumnCount());

	useEffect(() => {
		if (columns) return undefined;
		const handleResize = () => setAutoColumns(getResponsiveColumnCount());
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [columns]);

	const columnCount = columns || autoColumns;
	const items = Children.toArray(children);

	return (
		<div style={{ columnCount, columnGap: gap }}>
			{items.map((child, index) => (
				<motion.div
					key={child.key ?? index}
					className="mb-4 break-inside-avoid"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-60px' }}
					transition={{ duration: 0.5, delay: (index % columnCount) * 0.06 }}
				>
					{child}
				</motion.div>
			))}
		</div>
	);
}

export default MasonryGrid;
