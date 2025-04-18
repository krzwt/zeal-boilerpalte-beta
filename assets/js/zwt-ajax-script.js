(function ($) {
    'use strict';

    /**
     * Handles AJAX-based pagination for blog listing.
     * Fetches filtered posts based on category, search keyword, and page number.
     * @param {number} paged - The page number to fetch (default is 1).
     */
    function zwt_ajaxPagination(paged = 1) {
        const postcategory = $('#postcategory').val();
       
        $.ajax({
            url: zwt_ajax_object.ajax_url,
            type: 'POST',
            data: {
                action: 'zwt_ajaxsearch_filter', // Action hook for WordPress AJAX
                postcategory: postcategory,     // Selected category
                paged: paged,                   // Page number for pagination
                nonce: zwt_ajax_object.nonce,   // Security nonce
            },
            beforeSend: function () {
                $('.loading').show(); // Show loading indicator before request
            },
            success: function (response) {
                $('.blog-listing').html(response); // Update blog listing with response
            },
            complete: function () {
                $('.loading').hide(); // Hide loading indicator after request completes
            }
        });
    }

    /**
     * Triggers AJAX pagination when the category dropdown is changed.
     */
    $(document).on('change', '#postcategory', function (e) {
        zwt_ajaxPagination();
    });

    /**
     * Handles pagination click using event delegation.
     * Prevents default link behavior and fetches the clicked page number.
     */
    $(document).on('click', '.zwt-pagination .page-numbers', function (e) {
        e.preventDefault(); // Prevent default link behavior

        const pageValue = $(this).text().trim(); // Get the text inside the clicked element
        zwt_ajaxPagination(pageValue);
    });

})