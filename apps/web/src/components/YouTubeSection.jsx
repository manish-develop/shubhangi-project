import React, { useEffect, useState } from 'react';
import { Youtube, ArrowUpRight, Play } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const CHANNEL_URL = 'https://www.youtube.com/@dr.shubhangimaharana';

const YouTubeSection = () => {
	const [videos, setVideos] = useState([]);
	const [active, setActive] = useState(null);

	useEffect(() => {
		fetch(`${API_URL}/youtube-videos`)
			.then((res) => (res.ok ? res.json() : []))
			.then((data) => {
				const list = Array.isArray(data) ? data : [];
				setVideos(list);
				setActive(list[0] || null);
			})
			.catch(() => setVideos([]));
	}, []);

	if (!active) return null;

	return (
		<section className="section-medium bg-muted/40">
			<div className="container-custom">
				<h2 className="section-title heading-serif">From Our YouTube Channel</h2>
				<p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
					Dr. Shubhangi Maharana shares homoeopathy insights and patient guidance on video
				</p>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center max-w-6xl mx-auto">
					<div className="lg:col-span-3">
						<div className="relative rounded-2xl overflow-hidden card-shadow-xl aspect-video border border-border">
							<iframe
								key={active.video_id}
								src={`https://www.youtube.com/embed/${active.video_id}`}
								title={active.title || 'Dr. Shubhangi Maharana'}
								className="absolute inset-0 w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</div>

					<div className="lg:col-span-2">
						<h3 className="text-xl md:text-2xl font-semibold text-foreground heading-sans mb-3">
							{active.title || 'Homoeopathy Insights'}
						</h3>
						{active.description && (
							<p className="text-muted-foreground body-text mb-6 leading-relaxed">{active.description}</p>
						)}

						{videos.length > 1 && (
							<div className="space-y-2 mb-6">
								{videos.map((v) => (
									<button
										key={v.id}
										onClick={() => setActive(v)}
										className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg border transition-colors ${
											active.id === v.id
												? 'border-primary bg-primary/5 text-primary'
												: 'border-transparent hover:bg-accent text-foreground'
										}`}
									>
										<Play className="w-4 h-4 shrink-0" />
										<span className="min-w-0 flex-1 truncate text-sm font-medium">{v.title || 'Watch video'}</span>
									</button>
								))}
							</div>
						)}

						<a
							href={CHANNEL_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-outline inline-flex items-center gap-2"
						>
							<Youtube className="w-4 h-4" />
							Explore Our Channel
							<ArrowUpRight className="w-4 h-4" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default YouTubeSection;
