<?php
/**
 * Template for static Pages (not blog posts).
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<header class="single-post-header">
		<div class="container">
			<h1><?php the_title(); ?></h1>
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

<?php endwhile; ?>

<?php
get_footer();
