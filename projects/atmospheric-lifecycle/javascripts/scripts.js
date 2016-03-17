$(function() {
    $('.atml-description--title').click(function(e) {
        e.preventDefault();
        var $this = $(this);
        var $contentId = $this.data('content');
        var $content = $this.parent().next('div');
        var $descriptions = $('.atml-description--content');
        var $images = $('.atml-image--image');
        var $relatedImage = $('.atml-image--image[data-content="' + $contentId + '"]');
        console.log($relatedImage[0]);
        $descriptions.removeClass('active')
        $images.removeClass('active')
        $content.addClass('active')
        $relatedImage.addClass('active');
    });
});