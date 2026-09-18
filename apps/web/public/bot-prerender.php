<?php
/**
 * Serves a static, pre-rendered HTML head (title, meta description, OG/
 * Twitter tags, JSON-LD) for social-media link-preview crawlers, which —
 * unlike Googlebot — do not execute JavaScript and so would otherwise only
 * ever see this React SPA's generic index.html shell.
 *
 * Only reached via the .htaccess bot-detection rewrite (known crawler
 * user-agents hitting /blogs/<slug>) — regular visitors always get the
 * real React app. Pulls live from WordPress/Yoast on every request, so any
 * new blog post is covered automatically with zero deploys.
 *
 * Query params: slug (required)
 */

header('Content-Type: text/html; charset=utf-8');

$slug = isset($_GET['slug']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['slug'])) : '';
$siteUrl = 'https://drmaharanas.com';
$fallbackTitle = 'Maharana Wellness Clinic | Dr. Shubhangi Maharana';
$fallbackDescription = 'Expert homoeopathic treatment and facial aesthetics by Dr. Shubhangi Maharana. Personalized treatment for chronic conditions, women\'s health, and holistic wellness.';
$fallbackImage = 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/hero-section-bg.jpg';

function fetch_json($url) {
	$ch = curl_init($url);
	curl_setopt_array($ch, [
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_TIMEOUT => 8,
		CURLOPT_USERAGENT => 'drmaharanas.com bot-prerender',
	]);
	$body = curl_exec($ch);
	$ok = $body !== false && curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
	curl_close($ch);
	return $ok ? json_decode($body, true) : null;
}

$title = $fallbackTitle;
$description = $fallbackDescription;
$image = $fallbackImage;
$canonical = $siteUrl . '/blogs' . ($slug ? "/$slug" : '');
$articleSchema = null;

if ($slug !== '') {
	$posts = fetch_json('https://blog.drmaharanas.com/wp-json/wp/v2/posts?slug=' . urlencode($slug));
	$post = (is_array($posts) && count($posts) > 0) ? $posts[0] : null;

	if ($post) {
		$yoast = $post['yoast_head_json'] ?? null;
		$rawTitle = preg_replace('/<[^>]*>/', '', $post['title']['rendered'] ?? '');
		$title = $rawTitle !== '' ? "$rawTitle | Maharana Wellness Clinic Blog" : $fallbackTitle;
		$description = $yoast['og_description'] ?? $fallbackDescription;
		$image = $yoast['og_image'][0]['url'] ?? $fallbackImage;

		$articleNode = null;
		if (isset($yoast['schema']['@graph'])) {
			foreach ($yoast['schema']['@graph'] as $node) {
				if (($node['@type'] ?? '') === 'Article') { $articleNode = $node; break; }
			}
		}

		$articleSchema = [
			'@context' => 'https://schema.org',
			'@type' => 'BlogPosting',
			'headline' => $articleNode['headline'] ?? $rawTitle,
			'description' => $description,
			'datePublished' => $articleNode['datePublished'] ?? ($post['date'] ?? null),
			'dateModified' => $post['modified'] ?? ($articleNode['datePublished'] ?? null),
			'author' => ['@type' => 'Person', 'name' => 'Dr. Shubhangi Maharana'],
			'publisher' => ['@type' => 'Organization', 'name' => 'Maharana Wellness Clinic'],
			'image' => $image,
			'mainEntityOfPage' => ['@type' => 'WebPage', '@id' => $canonical],
			'url' => $canonical,
			'inLanguage' => 'en-US',
		];
		if (isset($articleNode['wordCount'])) $articleSchema['wordCount'] = $articleNode['wordCount'];
		if (isset($articleNode['articleSection'])) $articleSchema['articleSection'] = $articleNode['articleSection'];
	}
}

$e = fn($s) => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title><?= $e($title) ?></title>
<meta name="description" content="<?= $e($description) ?>" />
<link rel="canonical" href="<?= $e($canonical) ?>" />

<meta property="og:type" content="article" />
<meta property="og:site_name" content="Maharana Wellness Clinic" />
<meta property="og:title" content="<?= $e($title) ?>" />
<meta property="og:description" content="<?= $e($description) ?>" />
<meta property="og:url" content="<?= $e($canonical) ?>" />
<meta property="og:image" content="<?= $e($image) ?>" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="<?= $e($title) ?>" />
<meta name="twitter:description" content="<?= $e($description) ?>" />
<meta name="twitter:image" content="<?= $e($image) ?>" />

<?php if ($articleSchema): ?>
<script type="application/ld+json"><?= json_encode($articleSchema, JSON_UNESCAPED_SLASHES) ?></script>
<?php endif; ?>
</head>
<body>
<h1><?= $e($title) ?></h1>
<p><?= $e($description) ?></p>
</body>
</html>
