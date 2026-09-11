import React, { Suspense, useEffect, useRef, useState } from 'react';

/**
 * Defers both the JS chunk (via React.lazy) and the mount itself (via
 * IntersectionObserver) for a below-the-fold section, so its network
 * requests don't compete with the initial page load. `rootMargin` is
 * generous by default so the fetch starts well before the section is
 * actually visible, avoiding a loading flash when the user scrolls to it.
 */
const LazySection = ({ loader, rootMargin = '600px 0px', ...props }) => {
	const containerRef = useRef(null);
	const [shouldMount, setShouldMount] = useState(false);
	const LazyComponent = React.useMemo(() => React.lazy(loader), [loader]);

	useEffect(() => {
		if (shouldMount) return;

		const node = containerRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldMount(true);
					observer.disconnect();
				}
			},
			{ rootMargin }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [shouldMount, rootMargin]);

	return (
		<div ref={containerRef}>
			{shouldMount && (
				<Suspense fallback={null}>
					<LazyComponent {...props} />
				</Suspense>
			)}
		</div>
	);
};

export default LazySection;
