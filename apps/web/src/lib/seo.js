// Direct DOM head management, replacing react-helmet-async — that package
// was silently not committing any tags to the DOM in this app (verified:
// zero <meta name="description">, zero JSON-LD <script> tags landing
// anywhere in the document, on both localhost and production, despite
// looking correctly wired). Rather than chase a third-party bug, this file
// does the same job with plain DOM APIs, which are simple enough to trust.

export function setDocumentTitle(title) {
	if (title) document.title = title;
}

export function setMetaTag(attr, key, content) {
	if (content == null) return;
	let el = document.head.querySelector(`meta[${attr}="${key}"]`);
	if (!el) {
		el = document.createElement('meta');
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.setAttribute('content', content);
}

export function setLinkTag(rel, href) {
	if (!href) return;
	let el = document.head.querySelector(`link[rel="${rel}"]`);
	if (!el) {
		el = document.createElement('link');
		el.setAttribute('rel', rel);
		document.head.appendChild(el);
	}
	el.setAttribute('href', href);
}

// Upserts a <script type="application/ld+json"> tag identified by a stable
// id, so calling this again with the same id replaces rather than duplicates it.
export function setJsonLd(id, data) {
	let el = document.getElementById(id);
	if (!el) {
		el = document.createElement('script');
		el.type = 'application/ld+json';
		el.id = id;
		document.head.appendChild(el);
	}
	el.textContent = JSON.stringify(data);
}

export function removeJsonLd(id) {
	document.getElementById(id)?.remove();
}
