import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import BreadcrumbSchema from '@/components/BreadcrumbSchema.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import WpBlogCard from '@/components/WpBlogCard.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';
import { fetchWpPostsByCategory, fetchWpPostsByTag } from '@/lib/wordpress.js';

// Handles both /blogs/category/:slug and /blogs/tag/:slug — WordPress
// archive URLs that previously 404'd because only single-post and the
// plain listing were routed. `taxonomy` picks which one this instance is.
const BlogCategoryPage = ({ taxonomy }) => {
	const { slug } = useParams();
	const [heroRef, heroVisible] = useScrollAnimation(0.2);
	const [term, setTerm] = useState(null);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const fetcher = taxonomy === 'tag' ? fetchWpPostsByTag : fetchWpPostsByCategory;
		fetcher(slug).then(({ term, posts }) => {
			setTerm(term);
			setPosts(posts);
			setLoading(false);
		});
	}, [taxonomy, slug]);

	const label = term?.name || slug;
	const taxonomyLabel = taxonomy === 'tag' ? 'Tag' : 'Category';

	return (
		<>
			<SEO
				title={`${label} Articles | Maharana Wellness Clinic Blog`}
				description={`Browse health and wellness articles in "${label}" by Dr. Shubhangi Maharana — homoeopathic insights, treatments, and holistic care.`}
				path={`/blogs/${taxonomy === 'tag' ? 'tag' : 'category'}/${slug}`}
			/>
			<BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blogs' }, { name: label }]} />

			<Header />

			<main>
				<section ref={heroRef} className="page-header">
					<div className="container-custom">
						<div className={`max-w-3xl mx-auto ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
							<p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">{taxonomyLabel}</p>
							<h1 className="section-title mb-6">{label}</h1>
						</div>
					</div>
				</section>

				<section className="section-white min-h-[50vh]">
					<div className="container-custom">
						{loading ? (
							<div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
								{Array.from({ length: 6 }).map((_, i) => (
									<div key={i} className="aspect-square w-full animate-pulse rounded-none bg-muted" />
								))}
							</div>
						) : posts.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-xl text-muted-foreground">No articles found in "{label}" yet.</p>
							</div>
						) : (
							<div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
								{posts.map((post) => (
									<WpBlogCard key={post.slug} {...post} />
								))}
							</div>
						)}
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default BlogCategoryPage;
