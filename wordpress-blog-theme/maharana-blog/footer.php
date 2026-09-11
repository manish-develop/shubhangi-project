<?php
/**
 * The footer for the Maharana Wellness Blog theme.
 */
?>
</div><!-- #content -->

<footer class="site-footer">
	<div class="footer-top">
		<div class="footer-brand">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-brand-row">
				<img
					src="https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/maharana-logo-khaki.png"
					alt="<?php bloginfo( 'name' ); ?>"
				/>
				<span>
					<span class="footer-name">Maharana</span><br />
					<span class="footer-tagline">Wellness Clinic</span>
				</span>
			</a>

			<p class="footer-desc">
				Homoeopathic treatment for chronic conditions, women's health, and facial aesthetics by Dr. Shubhangi Maharana.
			</p>

			<div class="footer-contact">
				<a href="<?php echo esc_url( get_theme_mod( 'maharana_phone_link', 'tel:+919625030958' ) ); ?>">
					<?php echo esc_html( get_theme_mod( 'maharana_phone', '+91 96250 30958' ) ); ?>
				</a>
				<a href="mailto:<?php echo esc_attr( get_theme_mod( 'maharana_email', 'drshubhangi.econsultation@gmail.com' ) ); ?>">
					<?php echo esc_html( get_theme_mod( 'maharana_email', 'drshubhangi.econsultation@gmail.com' ) ); ?>
				</a>
				<span><?php echo esc_html( get_theme_mod( 'maharana_hours', 'Mon–Sun: 11:00 AM – 8:00 PM' ) ); ?></span>
			</div>

			<div class="footer-social">
				<a href="<?php echo esc_url( get_theme_mod( 'maharana_instagram_url', 'https://www.instagram.com/dr.shubhangimaharana' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
				</a>
				<a href="<?php echo esc_url( get_theme_mod( 'maharana_facebook_url', 'https://www.facebook.com/share/1BanKaCwyb/' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
				</a>
				<a href="<?php echo esc_url( get_theme_mod( 'maharana_linkedin_url', 'https://www.linkedin.com/in/dr-shubhangi-maharana-a90538213' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
				</a>
				<a href="<?php echo esc_url( get_theme_mod( 'maharana_youtube_url', 'https://youtube.com/@dr.shubhangimaharana' ) ); ?>" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
				</a>
			</div>
		</div>

		<div>
			<span class="footer-col-title">Conditions</span>
			<div class="footer-col">
				<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/diseases' ); ?>">Skin Disorders</a>
				<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/diseases' ); ?>">Women's Health</a>
				<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/diseases' ); ?>">Child Health</a>
				<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/diseases' ); ?>">Thyroid</a>
				<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/diseases' ); ?>">Joint Pain</a>
				<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/diseases' ); ?>">Anxiety</a>
			</div>
		</div>

		<div>
			<span class="footer-col-title">Company</span>
			<?php maharana_blog_footer_nav(); ?>
		</div>
	</div>

	<div class="footer-bottom">
		<p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> Maharana Wellness Clinic. All rights reserved.</p>
		<div class="footer-bottom-links">
			<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/privacy-policy' ); ?>">Privacy Policy</a>
			<a href="<?php echo esc_url( MAHARANA_MAIN_SITE . '/disclaimer' ); ?>">Disclaimer</a>
		</div>
	</div>

	<div class="footer-disclaimer">
		<p>
			All treatments are performed by a qualified Homoeopathic physician Dr. Shubhangi Maharana trained in medical cosmetology. Procedures are selected based on patient suitability and within the practitioner's scope of practice.
		</p>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
