function loadNewCSS(href) {
    $('<link>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: href
    }).appendTo('head');
}