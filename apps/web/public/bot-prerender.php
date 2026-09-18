<?php
/**
 * Serves a static, pre-rendered HTML head (title, meta description, OG/
 * Twitter tags, JSON-LD) for crawlers that don't execute JavaScript —
 * social-media link-preview bots (WhatsApp, Facebook, Twitter/X...) and,
 * for the "static" pages, any other non-JS crawler — which would
 * otherwise only ever see this React SPA's generic index.html shell.
 *
 * Only reached via the .htaccess bot-detection rewrite; regular visitors
 * and Googlebot (which does render JS) always get the real React app,
 * untouched. Pulls live from WordPress/Supabase on every request for the
 * dynamic kinds, so new content is covered automatically with zero
 * deploys — nothing here is hardcoded per post/disease/service.
 *
 * Query params: kind (blog|disease|service|static, required), slug (for
 * blog/disease/service), page (for static: home|diseases|services)
 */

header('Content-Type: text/html; charset=utf-8');

$kind = $_GET['kind'] ?? '';
$slug = isset($_GET['slug']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['slug'])) : '';
$page = isset($_GET['page']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['page'])) : '';

$siteUrl = 'https://drmaharanas.com';
$apiUrl = 'https://shubhangi-project-web-wxdf.vercel.app';
$fallbackTitle = 'Maharana Wellness Clinic | Dr. Shubhangi Maharana';
$fallbackDescription = "Expert homoeopathic treatment and facial aesthetics by Dr. Shubhangi Maharana. Personalized treatment for chronic conditions, women's health, and holistic wellness.";
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

function decode_title($raw) {
	return html_entity_decode(preg_replace('/<[^>]*>/', '', $raw ?? ''), ENT_QUOTES, 'UTF-8');
}

$title = $fallbackTitle;
$description = $fallbackDescription;
$image = $fallbackImage;
$canonical = $siteUrl;
$type = 'website';
$extraSchema = null; // JSON-LD array, or null

if ($kind === 'blog' && $slug !== '') {
	$canonical = "$siteUrl/blogs/$slug";
	$type = 'article';

	$posts = fetch_json('https://blog.drmaharanas.com/wp-json/wp/v2/posts?slug=' . urlencode($slug));
	$post = (is_array($posts) && count($posts) > 0) ? $posts[0] : null;

	if ($post) {
		$yoast = $post['yoast_head_json'] ?? null;
		$rawTitle = decode_title($post['title']['rendered'] ?? '');
		$title = $rawTitle !== '' ? "$rawTitle | Maharana Wellness Clinic Blog" : $fallbackTitle;
		$description = $yoast['og_description'] ?? $fallbackDescription;
		$image = $yoast['og_image'][0]['url'] ?? $fallbackImage;

		$articleNode = null;
		if (isset($yoast['schema']['@graph'])) {
			foreach ($yoast['schema']['@graph'] as $node) {
				if (($node['@type'] ?? '') === 'Article') { $articleNode = $node; break; }
			}
		}

		$extraSchema = [
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
		if (isset($articleNode['wordCount'])) $extraSchema['wordCount'] = $articleNode['wordCount'];
		if (isset($articleNode['articleSection'])) $extraSchema['articleSection'] = $articleNode['articleSection'];
	}
} elseif ($kind === 'disease' && $slug !== '') {
	// Diseases are admin-managed content in Supabase, served through our
	// own API (the same one the React app calls) — never duplicated here.
	$canonical = "$siteUrl/disease/$slug";
	$disease = fetch_json("$apiUrl/diseases/" . urlencode($slug));

	if ($disease && !empty($disease['name'])) {
		$name = $disease['name'];
		$title = "Homoeopathic Treatment for $name | Maharana Wellness Clinic";
		$description = "Learn about the effective, natural homoeopathic treatment for $name by Dr. Shubhangi Maharana. Safe, holistic care without side effects.";
		if (!empty($disease['image'])) $image = $disease['image'];
	}
} elseif ($kind === 'service' && $slug !== '') {
	// Service detail content is small and hand-authored directly in
	// ServiceArticlePage.jsx (not an API) — mirrored here for the same
	// two services. Update this list if a new one is added there.
	$canonical = "$siteUrl/service/$slug";
	$services = [
		'chronic-disease-management' => 'Chronic Disease Management',
		'womens-health' => "Women's Health & Wellness",
	];
	$serviceTitle = $services[$slug] ?? null;
	if ($serviceTitle) {
		$title = "$serviceTitle | Maharana Wellness Clinic";
		$description = "Learn about our $serviceTitle services at Maharana Wellness Clinic.";
	}
} elseif ($kind === 'static') {
	$canonical = $siteUrl;
	switch ($page) {
		case 'diseases':
			$canonical = "$siteUrl/diseases";
			$title = 'Diseases Treated with Homoeopathy A-Z | Maharana Wellness Clinic';
			$description = 'Browse our complete A-Z list of 300+ diseases and conditions treated with homoeopathy by Dr. Shubhangi Maharana. Search your condition and learn about homoeopathic treatment options.';
			break;
		case 'services':
			$canonical = "$siteUrl/services";
			$title = 'Homoeopathy Services & Facial Aesthetics Treatments | Maharana Wellness Clinic';
			$description = "Explore our specialized services — Women's Health, Facial Aesthetics, Chronic Diseases, Skin Disorders, Hair Treatments, Diet & Nutrition. Expert homoeopathic care by Dr. Shubhangi Maharana.";
			break;
		case 'home':
		default:
			$canonical = $siteUrl;
			$title = $fallbackTitle;
			$description = $fallbackDescription;
			break;
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

<meta property="og:type" content="<?= $e($type) ?>" />
<meta property="og:site_name" content="Maharana Wellness Clinic" />
<meta property="og:title" content="<?= $e($title) ?>" />
<meta property="og:description" content="<?= $e($description) ?>" />
<meta property="og:url" content="<?= $e($canonical) ?>" />
<meta property="og:image" content="<?= $e($image) ?>" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="<?= $e($title) ?>" />
<meta name="twitter:description" content="<?= $e($description) ?>" />
<meta name="twitter:image" content="<?= $e($image) ?>" />

<?php if ($extraSchema): ?>
<script type="application/ld+json"><?= json_encode($extraSchema, JSON_UNESCAPED_SLASHES) ?></script>
<?php endif; ?>
</head>
<body>
<h1><?= $e($title) ?></h1>
<p><?= $e($description) ?></p>
</body>
</html>
