<?php
/**
 * 404 template.
 */

get_header();
?>

<section class="page-hero">
	<div class="container">
		<h1>Page Not Found</h1>
		<p>The page you're looking for doesn't exist or has been moved.</p>
	</div>
</section>

<main class="blog-main">
	<div class="container" style="text-align:center;">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header-cta" style="display:inline-flex; border-color: hsl(var(--primary)); color: hsl(var(--primary));">
			&larr; Back to Blog
		</a>
	</div>
</main>

<?php
get_footer();
