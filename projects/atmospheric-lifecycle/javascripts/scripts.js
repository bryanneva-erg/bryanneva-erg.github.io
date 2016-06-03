$(function() {
    $('.atml-description--title').click(function(e) {
        
        e.preventDefault();
        
        var $this = $(this);
        var $contentId = $this.data('content');
        var $content = $this.parent().next('div');
        var $descriptions = $('.atml-description--content');
        
        var $listItems = $('.atml-description--list-item') 
        var $selectedListWrapper = $this.closest('li');

        var $images = $('.atml-image--image');
        var $relatedImage = $('.atml-image--image[data-content="' + $contentId + '"]');
        

        $descriptions.removeClass('active')
        $images.removeClass('active')
        $content.addClass('active')
        $relatedImage.addClass('active');

        $listItems.removeClass('active');
        $selectedListWrapper.addClass('active');

        return false;
    });
});