<?php
/**
 * The main template file — blog listing, category/tag archives, and search
 * results all fall back to this when there is no more specific template.
 */

get_header();
?>

<section class="page-hero">
	<div class="container">
		<?php if ( is_home() && ! is_front_page() ) : ?>
			<h1><?php single_post_title(); ?></h1>
			<p>Homoeopathy insights and wellness guidance from Dr. Shubhangi Maharana</p>
		<?php elseif ( is_category() ) : ?>
			<h1><?php single_cat_title(); ?></h1>
			<p><?php echo category_description(); ?></p>
		<?php elseif ( is_tag() ) : ?>
			<h1><?php single_tag_title(); ?></h1>
		<?php elseif ( is_search() ) : ?>
			<h1>Search results for &ldquo;<?php echo esc_html( get_search_query() ); ?>&rdquo;</h1>
		<?php elseif ( is_author() ) : ?>
			<h1><?php the_author(); ?></h1>
		<?php else : ?>
			<h1>Homoeopathy Health Blog</h1>
			<p>Articles by Dr. Shubhangi Maharana on natural, holistic wellness</p>
		<?php endif; ?>
	</div>
</section>

<main class="blog-main">
	<div class="container">
		<?php if ( have_posts() ) : ?>
			<div class="post-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					$categories = get_the_category();
					?>
					<article <?php post_class( 'post-card' ); ?>>
						<a href="<?php the_permalink(); ?>" class="post-thumb">
							<?php if ( has_post_thumbnail() ) : ?>
								<?php the_post_thumbnail( 'large' ); ?>
							<?php else : ?>
								<div class="post-thumb-placeholder" aria-hidden="true"></div>
							<?php endif; ?>
							<?php if ( ! empty( $categories ) ) : ?>
								<span class="post-category-tag">#<?php echo esc_html( $categories[0]->name ); ?></span>
							<?php endif; ?>
						</a>

						<div class="post-card-body">
							<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

							<div class="post-excerpt"><?php the_excerpt(); ?></div>

							<div class="post-card-footer">
								<a href="<?php the_permalink(); ?>" class="read-more">
									<span class="read-more-icon" aria-hidden="true">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
									</span>
									Read more
								</a>
								<span class="post-date">
									<?php echo get_the_date(); ?>
									<span class="post-date-rule" aria-hidden="true"></span>
								</span>
							</div>
						</div>
					</article>
				<?php endwhile; ?>
			</div>

			<div class="pagination">
				<?php
				echo paginate_links( array(
					'prev_text' => '&larr; Prev',
					'next_text' => 'Next &rarr;',
				) );
				?>
			</div>
		<?php else : ?>
			<div class="no-results">
				<h2>Nothing found</h2>
				<p>No posts to show yet — check back soon.</p>
			</div>
		<?php endif; ?>
	</div>
</main>

<?php
get_footer();
