<?php
/**
 * Single post template — optimized for reading: large featured image,
 * comfortable reading width, author box, social sharing, and comments.
 */

get_header();

while ( have_posts() ) :
	the_post();
	$share = maharana_blog_share_links( get_the_ID() );
	?>

	<article <?php post_class(); ?>>

		<header class="single-post-header">
			<div class="container">
				<?php
				$categories = get_the_category();
				if ( ! empty( $categories ) ) :
					?>
					<a href="<?php echo esc_url( get_category_link( $categories[0]->term_id ) ); ?>" class="post-category-badge">
						<?php echo esc_html( $categories[0]->name ); ?>
					</a>
				<?php endif; ?>

				<h1><?php the_title(); ?></h1>

				<div class="single-post-meta">
					<span>By <?php the_author(); ?></span>
					<span><?php echo get_the_date(); ?></span>
					<span><?php echo esc_html( maharana_blog_reading_time() ); ?> min read</span>
				</div>
			</div>
		</header>

		<?php if ( has_post_thumbnail() ) : ?>
			<div class="featured-image-wrap">
				<?php the_post_thumbnail( 'full', array( 'alt' => get_the_title() ) ); ?>
			</div>
		<?php endif; ?>

		<div class="single-post-content">
			<?php the_content(); ?>
		</div>

		<?php
		$tags = get_the_tags();
		if ( $tags ) :
			?>
			<div class="post-tags">
				<?php foreach ( $tags as $tag ) : ?>
					<a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>">#<?php echo esc_html( $tag->name ); ?></a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

		<div class="author-box">
			<?php echo get_avatar( get_the_author_meta( 'ID' ), 64 ); ?>
			<div>
				<div class="author-name"><?php the_author(); ?></div>
				<p class="author-bio">
					<?php
					$bio = get_the_author_meta( 'description' );
					echo $bio ? esc_html( $bio ) : 'BHMS, MD (Hom.). Homoeopathic physician at Maharana Wellness Clinic, specializing in chronic diseases, women\'s health, and facial aesthetics.';
					?>
				</p>
			</div>
		</div>

		<div class="social-share">
			<div class="share-label">Share this article</div>
			<div class="share-buttons">
				<a href="<?php echo esc_url( $share['facebook'] ); ?>" target="_blank" rel="noopener noreferrer" class="share-facebook">Facebook</a>
				<a href="<?php echo esc_url( $share['twitter'] ); ?>" target="_blank" rel="noopener noreferrer" class="share-twitter">Twitter / X</a>
				<a href="<?php echo esc_url( $share['linkedin'] ); ?>" target="_blank" rel="noopener noreferrer" class="share-linkedin">LinkedIn</a>
				<a href="<?php echo esc_url( $share['whatsapp'] ); ?>" target="_blank" rel="noopener noreferrer" class="share-whatsapp">WhatsApp</a>
			</div>
		</div>

		<?php
		$prev_post = get_previous_post();
		$next_post = get_next_post();
		if ( $prev_post || $next_post ) :
			?>
			<div class="post-nav">
				<div class="nav-prev">
					<?php if ( $prev_post ) : ?>
						<a href="<?php echo esc_url( get_permalink( $prev_post ) ); ?>">
							<span class="nav-label">&larr; Previous</span>
							<?php echo esc_html( get_the_title( $prev_post ) ); ?>
						</a>
					<?php endif; ?>
				</div>
				<div class="nav-next">
					<?php if ( $next_post ) : ?>
						<a href="<?php echo esc_url( get_permalink( $next_post ) ); ?>">
							<span class="nav-label">Next &rarr;</span>
							<?php echo esc_html( get_the_title( $next_post ) ); ?>
						</a>
					<?php endif; ?>
				</div>
			</div>
		<?php endif; ?>

	</article>

	<?php if ( comments_open() || get_comments_number() ) : ?>
		<div class="comments-area">
			<?php comments_template(); ?>
		</div>
	<?php endif; ?>

<?php endwhile; ?>

<?php
get_footer();
