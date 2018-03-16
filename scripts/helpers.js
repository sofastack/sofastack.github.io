/* global hexo */

'use strict';

var pathFn = require('path');
var _ = require('lodash');
var cheerio = require('cheerio');
var lunr = require('lunr');

var localizedPath = ['docs', 'api'];

function startsWith(str, start) {
    return str.substring(0, start.length) === start;
}

hexo.extend.helper.register('header_menu', function (className) {
    var menu = this.site.data.menu;
    var result = '';
    var self = this;
    var lang = this.page.lang;
    var isEnglish = lang === 'en';
    _.each(menu, function (path, title) {
        // if (!isEnglish && ~localizedPath.indexOf(title)) path = lang + path;

        result += '<a href="' + self.url_for(path) + '" class="' + className + '-link">' + self.__('menu.' + title) + '</a>';
    });
    return result;
});

hexo.extend.helper.register('doc_sidebar', function (className) {
    var type = this.page.canonical_path.split('/')[0];
    var sidebar = this.site.data.sidebar[type];
    var path = pathFn.basename(this.path);
    var result = '';
    var self = this;
    var prefix = 'sidebar.' + type + '.';
    
    _.each(sidebar, function (menu, title) {
        result += '<li class="nav-item depth1 "><span href="" class="">' + self.__(prefix + title) + '</span></li>'

        _.each(menu, function (link, text) {
            var itemClass = className + '-link';
            if (link === path) itemClass += ' current';
            result += '<li class="nav-item depth2 "><a href="'+ type+'/'+link +'" class="">' + self.__(prefix + text) + '</a></li>'
        });
    });

    return result;
});

hexo.extend.helper.register('page_anchor', function(str) {
    var $ = cheerio.load(str, {decodeEntities: false});
    var headings = $('h1, h2, h3, h4, h5, h6');

    if (!headings.length) return str;

    headings.each(function() {
        var id = $(this).attr('id');

        $(this)
            .addClass('article-heading')
            .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
    });

    return $.html();
});