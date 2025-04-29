'use strict';

/**
 * Handles AJAX-based pagination for blog listing.
 * Fetches filtered posts based on category, search keyword, and page number.
 * @param {number} paged - The page number to fetch (default is 1).
 */
function zwt_ajaxPagination(paged = 1) {
    const postcategoryElement = document.getElementById('postcategory');
    const postcategory = postcategoryElement ? postcategoryElement.value : '';

    const data = new FormData();
    data.append('action', 'zwt_ajaxsearch_filter');
    data.append('postcategory', postcategory);
    data.append('paged', paged);
    data.append('nonce', mytheme_ajax_object.nonce);

    const loadingIndicator = document.querySelector('.loading');
    if (loadingIndicator) {loadingIndicator.style.display = 'block';}

    fetch(mytheme_ajax_object.ajax_url, {
        method: 'POST',
        body: data,
    })
        .then(response => response.text())
        .then(html => {
            const blogListing = document.querySelector('.blog-listing');
            if (blogListing) {blogListing.innerHTML = html;}
        })
        .finally(() => {
            if (loadingIndicator) {loadingIndicator.style.display = 'none';}
        });
}

/**
 * Triggers AJAX pagination when the category dropdown is changed.
 */
document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'postcategory') {
        zwt_ajaxPagination();
    }
});

/**
 * Handles pagination click using event delegation.
 * Prevents default link behavior and fetches the clicked page number.
 */
document.addEventListener('click', function(e) {
    const target = e.target;
    if (target.closest('.zwt-pagination .page-numbers')) {
        e.preventDefault();
        const pageValue = target.textContent.trim();
        zwt_ajaxPagination(pageValue);
    }
});
