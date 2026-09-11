<?php
/**
 * The header for the Maharana Wellness Blog theme.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
	<div class="container">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-branding">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<img
					src="https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/maharana-logo-khaki.png"
					alt="<?php bloginfo( 'name' ); ?>"
					class="custom-logo"
				/>
			<?php endif; ?>
			<span class="site-name-group">
				<span class="site-title">Maharana</span>
				<span class="site-tagline">Wellness Clinic</span>
			</span>
		</a>

		<nav class="main-navigation" aria-label="<?php esc_attr_e( 'Primary menu', 'maharana-blog' ); ?>">
			<?php maharana_blog_primary_nav(); ?>
		</nav>

		<div style="display:flex; align-items:center; gap:12px;">
			<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/appointment' ); ?>" class="header-cta">
				Book Appointment
			</a>
			<button class="menu-toggle" aria-expanded="false" aria-label="<?php esc_attr_e( 'Toggle menu', 'maharana-blog' ); ?>">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="4" y1="6" x2="20" y2="6"></line>
					<line x1="4" y1="12" x2="20" y2="12"></line>
					<line x1="4" y1="18" x2="20" y2="18"></line>
				</svg>
			</button>
		</div>
	</div>

	<nav class="mobile-navigation" aria-label="<?php esc_attr_e( 'Mobile menu', 'maharana-blog' ); ?>">
		<?php maharana_blog_primary_nav(); ?>
		<div style="padding: 0 8px;">
			<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/appointment' ); ?>" class="header-cta">
				Book Appointment
			</a>
		</div>
	</nav>
</header>

<div id="content" class="site-content">
