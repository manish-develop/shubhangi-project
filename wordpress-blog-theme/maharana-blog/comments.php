<?php
/**
 * Comments template.
 */

if ( post_password_required() ) {
	return;
}
?>

<?php if ( have_comments() ) : ?>
	<h2 class="comments-title">
		<?php
		$comment_count = (int) get_comments_number();
		if ( 1 === $comment_count ) {
			echo '1 Comment';
		} else {
			echo esc_html( $comment_count ) . ' Comments';
		}
		?>
	</h2>

	<ol class="comment-list">
		<?php
		wp_list_comments( array(
			'style'       => 'ol',
			'short_ping'  => true,
			'callback'    => 'maharana_blog_comment',
		) );
		?>
	</ol>

	<?php
	the_comments_pagination( array(
		'prev_text' => '&larr; Older Comments',
		'next_text' => 'Newer Comments &rarr;',
	) );
	?>

<?php endif; ?>

<?php if ( ! comments_open() && get_comments_number() ) : ?>
	<p><em>Comments are closed.</em></p>
<?php endif; ?>

<?php
comment_form( array(
	'title_reply'        => 'Leave a Comment',
	'title_reply_before' => '<h2 id="reply-title" class="comment-reply-title">',
	'title_reply_after'  => '</h2>',
	'class_submit'       => 'submit',
) );
