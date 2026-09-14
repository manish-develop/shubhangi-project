import React, { useState, useEffect } from 'react';
import SEO from '@/components/SEO.jsx';
import BreadcrumbSchema from '@/components/BreadcrumbSchema.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import WpBlogCard from '@/components/WpBlogCard.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';
import { fetchWpPosts } from '@/lib/wordpress.js';

const BlogsPage = () => {
	const [heroRef, heroVisible] = useScrollAnimation(0.2);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchWpPosts().then((data) => {
			setPosts(data);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<SEO
				title="Homoeopathy Health Blog | Articles by Dr. Shubhangi Maharana"
				description="Read expert health articles and insights by Dr. Shubhangi Maharana on homoeopathic treatments, women's health, skin care, hair care, chronic diseases and holistic wellness."
				path="/blogs"
			/>
			<BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Blog' }]} />

			<Header />

			<main>
				<section ref={heroRef} className="page-header">
					<div className="container-custom">
						<div className={`max-w-3xl mx-auto ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
							<h1 className="section-title mb-6">Health &amp; Wellness Blog</h1>
							<p className="section-subtitle text-xl leading-relaxed mx-auto">
								Expert insights on homoeopathy, natural healing, and holistic wellness from{' '}
								<span className="doctor-name font-medium">Dr. Shubhangi Maharana</span>
							</p>
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
								<p className="text-xl text-muted-foreground">No articles published yet — check back soon.</p>
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

export default BlogsPage;
