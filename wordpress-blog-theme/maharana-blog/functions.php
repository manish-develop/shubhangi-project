<?php
/**
 * Maharana Wellness Blog theme functions.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MAHARANA_BLOG_VERSION', '1.0.0' );
define( 'MAHARANA_MAIN_SITE', 'https://drmaharanas.com' );

/**
 * Theme setup.
 */
function maharana_blog_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array(
		'height'      => 120,
		'width'       => 120,
		'flex-height' => true,
		'flex-width'  => true,
	) );

	set_post_thumbnail_size( 1200, 675, true );

	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'maharana-blog' ),
		'footer'  => __( 'Footer Menu', 'maharana-blog' ),
	) );
}
add_action( 'after_setup_theme', 'maharana_blog_setup' );

/**
 * Enqueue styles and scripts.
 */
function maharana_blog_scripts() {
	wp_enqueue_style( 'maharana-blog-style', get_stylesheet_uri(), array(), MAHARANA_BLOG_VERSION );

	wp_enqueue_script( 'maharana-blog-nav', get_template_directory_uri() . '/js/navigation.js', array(), MAHARANA_BLOG_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'maharana_blog_scripts' );

/**
 * Sensible excerpt length and "read more" for the blog listing.
 */
function maharana_blog_excerpt_length( $length ) {
	return 30;
}
add_filter( 'excerpt_length', 'maharana_blog_excerpt_length' );

function maharana_blog_excerpt_more( $more ) {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'maharana_blog_excerpt_more' );

/**
 * Fallback primary menu — real drmaharanas.com pages, so the header works
 * out of the box even before a menu is set up in Appearance > Menus.
 */
function maharana_blog_fallback_menu() {
	$main = MAHARANA_MAIN_SITE;
	$items = array(
		array( 'label' => 'Home', 'url' => $main . '/' ),
		array( 'label' => 'About', 'url' => $main . '/about' ),
		array( 'label' => 'Services', 'url' => $main . '/services' ),
		array( 'label' => 'Diseases', 'url' => $main . '/diseases' ),
		array( 'label' => 'Blog', 'url' => home_url( '/' ) ),
		array( 'label' => 'Testimonials', 'url' => $main . '/testimonials' ),
		array( 'label' => 'Contact', 'url' => $main . '/contact' ),
	);

	echo '<ul id="primary-menu-fallback">';
	foreach ( $items as $item ) {
		$current = ( $item['label'] === 'Blog' ) ? ' class="current-menu-item"' : '';
		printf(
			'<li%1$s><a href="%2$s">%3$s</a></li>',
			$current,
			esc_url( $item['url'] ),
			esc_html( $item['label'] )
		);
	}
	echo '</ul>';
}

/**
 * Render the primary nav: uses the WP menu at Appearance > Menus if one is
 * assigned to the "Primary Menu" location, otherwise falls back to the
 * hardcoded links above so the header is never empty.
 */
function maharana_blog_primary_nav() {
	if ( has_nav_menu( 'primary' ) ) {
		wp_nav_menu( array(
			'theme_location' => 'primary',
			'container'      => false,
			'menu_class'     => '',
			'depth'          => 1,
			'fallback_cb'    => 'maharana_blog_fallback_menu',
		) );
	} else {
		maharana_blog_fallback_menu();
	}
}

/**
 * Footer "Company" column: same fallback pattern as the primary nav.
 */
function maharana_blog_footer_fallback_menu() {
	$main = MAHARANA_MAIN_SITE;
	$items = array(
		array( 'label' => 'Home', 'url' => $main . '/' ),
		array( 'label' => 'About', 'url' => $main . '/about' ),
		array( 'label' => 'Services', 'url' => $main . '/services' ),
		array( 'label' => 'Testimonials', 'url' => $main . '/testimonials' ),
		array( 'label' => 'Contact', 'url' => $main . '/contact' ),
	);

	echo '<div class="footer-col">';
	foreach ( $items as $item ) {
		printf( '<a href="%1$s">%2$s</a>', esc_url( $item['url'] ), esc_html( $item['label'] ) );
	}
	echo '</div>';
}

function maharana_blog_footer_nav() {
	if ( has_nav_menu( 'footer' ) ) {
		wp_nav_menu( array(
			'theme_location' => 'footer',
			'container'      => 'div',
			'container_class' => 'footer-col',
			'menu_class'     => '',
			'depth'          => 1,
			'fallback_cb'    => 'maharana_blog_footer_fallback_menu',
		) );
	} else {
		maharana_blog_footer_fallback_menu();
	}
}

/**
 * Customizer: contact details and social links, so the client can edit
 * these from Appearance > Customize without touching code.
 */
function maharana_blog_customize_register( $wp_customize ) {
	$wp_customize->add_section( 'maharana_contact', array(
		'title'    => __( 'Clinic Contact & Social', 'maharana-blog' ),
		'priority' => 30,
	) );

	$fields = array(
		'maharana_phone'         => '+91 96250 30958',
		'maharana_phone_link'    => 'tel:+919625030958',
		'maharana_email'         => 'drshubhangi.econsultation@gmail.com',
		'maharana_hours'         => 'Mon–Sun: 11:00 AM – 8:00 PM',
		'maharana_instagram_url' => 'https://www.instagram.com/dr.shubhangimaharana',
		'maharana_facebook_url'  => 'https://www.facebook.com/share/1BanKaCwyb/',
		'maharana_linkedin_url'  => 'https://www.linkedin.com/in/dr-shubhangi-maharana-a90538213',
		'maharana_youtube_url'   => 'https://youtube.com/@dr.shubhangimaharana',
	);

	foreach ( $fields as $id => $default ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $default,
			'sanitize_callback' => 'sanitize_text_field',
		) );
		$wp_customize->add_control( $id, array(
			'label'   => ucwords( str_replace( array( 'maharana_', '_' ), array( '', ' ' ), $id ) ),
			'section' => 'maharana_contact',
			'type'    => 'text',
		) );
	}
}
add_action( 'customize_register', 'maharana_blog_customize_register' );

/**
 * Testimonial custom post type — replaces the Supabase-based testimonials
 * admin panel. Exposed to the REST API (rest_base "testimonials") so the
 * main React site can fetch it directly, same as blog posts.
 */
function maharana_blog_register_testimonial_cpt() {
	register_post_type( 'testimonial', array(
		'labels' => array(
			'name'               => __( 'Testimonials', 'maharana-blog' ),
			'singular_name'      => __( 'Testimonial', 'maharana-blog' ),
			'add_new_item'       => __( 'Add New Testimonial', 'maharana-blog' ),
			'edit_item'          => __( 'Edit Testimonial', 'maharana-blog' ),
			'all_items'          => __( 'Testimonials', 'maharana-blog' ),
			'menu_name'          => __( 'Testimonials', 'maharana-blog' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_menu' => true,
		'menu_icon'    => 'dashicons-format-quote',
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'show_in_rest' => true,
		'rest_base'    => 'testimonials',
	) );
}
add_action( 'init', 'maharana_blog_register_testimonial_cpt' );

/**
 * Testimonial meta fields — patient name, rating (1-5), and treatment/
 * condition tag. Registered with show_in_rest so they come back on every
 * REST API testimonial object as meta.patient_name / meta.rating / meta.condition,
 * which the React site reads directly (no separate endpoint needed).
 */
function maharana_blog_register_testimonial_meta() {
	$fields = array(
		'patient_name' => 'string',
		'rating'       => 'integer',
		'condition'    => 'string',
	);

	foreach ( $fields as $key => $type ) {
		register_post_meta( 'testimonial', $key, array(
			'type'          => $type,
			'single'        => true,
			'show_in_rest'  => true,
			'auth_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		) );
	}
}
add_action( 'init', 'maharana_blog_register_testimonial_meta' );

/**
 * Show the testimonial meta fields as plain input boxes on the edit screen,
 * so the doctor's team doesn't need ACF or another plugin just to fill in
 * patient name / rating / condition.
 */
function maharana_blog_testimonial_meta_box() {
	add_meta_box(
		'maharana_testimonial_details',
		__( 'Testimonial Details', 'maharana-blog' ),
		'maharana_blog_render_testimonial_meta_box',
		'testimonial',
		'side',
		'default'
	);
}
add_action( 'add_meta_boxes', 'maharana_blog_testimonial_meta_box' );

function maharana_blog_render_testimonial_meta_box( $post ) {
	wp_nonce_field( 'maharana_testimonial_meta', 'maharana_testimonial_meta_nonce' );
	$patient_name = get_post_meta( $post->ID, 'patient_name', true );
	$rating       = get_post_meta( $post->ID, 'rating', true );
	$condition    = get_post_meta( $post->ID, 'condition', true );
	?>
	<p>
		<label for="maharana_patient_name"><strong><?php esc_html_e( 'Patient name', 'maharana-blog' ); ?></strong></label><br>
		<input type="text" id="maharana_patient_name" name="maharana_patient_name" value="<?php echo esc_attr( $patient_name ); ?>" class="widefat" />
	</p>
	<p>
		<label for="maharana_rating"><strong><?php esc_html_e( 'Rating (1-5)', 'maharana-blog' ); ?></strong></label><br>
		<input type="number" min="1" max="5" id="maharana_rating" name="maharana_rating" value="<?php echo esc_attr( $rating ? $rating : 5 ); ?>" class="widefat" />
	</p>
	<p>
		<label for="maharana_condition"><strong><?php esc_html_e( 'Condition / Treatment', 'maharana-blog' ); ?></strong></label><br>
		<input type="text" id="maharana_condition" name="maharana_condition" value="<?php echo esc_attr( $condition ); ?>" class="widefat" placeholder="e.g. PCOS, Migraine" />
	</p>
	<?php
}

function maharana_blog_save_testimonial_meta( $post_id ) {
	if ( ! isset( $_POST['maharana_testimonial_meta_nonce'] ) || ! wp_verify_nonce( $_POST['maharana_testimonial_meta_nonce'], 'maharana_testimonial_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['maharana_patient_name'] ) ) {
		update_post_meta( $post_id, 'patient_name', sanitize_text_field( $_POST['maharana_patient_name'] ) );
	}
	if ( isset( $_POST['maharana_rating'] ) ) {
		update_post_meta( $post_id, 'rating', (int) $_POST['maharana_rating'] );
	}
	if ( isset( $_POST['maharana_condition'] ) ) {
		update_post_meta( $post_id, 'condition', sanitize_text_field( $_POST['maharana_condition'] ) );
	}
}
add_action( 'save_post_testimonial', 'maharana_blog_save_testimonial_meta' );

/**
 * Estimated reading time for the current post, in whole minutes (minimum 1).
 */
function maharana_blog_reading_time() {
	$content    = get_post_field( 'post_content', get_the_ID() );
	$word_count = str_word_count( wp_strip_all_tags( $content ) );
	return max( 1, (int) ceil( $word_count / 200 ) );
}

/**
 * Social share links for a post (Facebook / Twitter / LinkedIn / WhatsApp).
 */
function maharana_blog_share_links( $post_id ) {
	$url   = rawurlencode( get_permalink( $post_id ) );
	$title = rawurlencode( get_the_title( $post_id ) );

	return array(
		'facebook' => "https://www.facebook.com/sharer/sharer.php?u={$url}",
		'twitter'  => "https://twitter.com/intent/tweet?url={$url}&text={$title}",
		'linkedin' => "https://www.linkedin.com/shareArticle?mini=true&url={$url}&title={$title}",
		'whatsapp' => "https://api.whatsapp.com/send?text={$title}%20{$url}",
	);
}

/**
 * Themed comment markup (used by wp_list_comments() in single.php).
 */
function maharana_blog_comment( $comment, $args, $depth ) {
	?>
	<li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
		<div class="comment-body">
			<?php echo get_avatar( $comment, 56, '', '', array( 'class' => 'avatar' ) ); ?>
			<div>
				<div class="comment-author"><?php comment_author(); ?></div>
				<div class="comment-metadata">
					<a href="<?php echo esc_url( get_comment_link( $comment, $args ) ); ?>">
						<?php echo get_comment_date( '', $comment ); ?>
					</a>
				</div>
				<div class="comment-content">
					<?php if ( '0' === $comment->comment_approved ) : ?>
						<p><em><?php esc_html_e( 'Your comment is awaiting moderation.', 'maharana-blog' ); ?></em></p>
					<?php endif; ?>
					<?php comment_text(); ?>
				</div>
				<?php
				comment_reply_link( array_merge( $args, array(
					'depth'     => $depth,
					'max_depth' => $args['max_depth'],
				) ) );
				?>
			</div>
		</div>
	<?php
}
