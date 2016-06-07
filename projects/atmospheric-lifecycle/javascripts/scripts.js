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
        var $title = $('.atml-header h1');
        

        $descriptions.removeClass('active')
        $images.removeClass('active')
        $content.addClass('active')
        $relatedImage.addClass('active');

        $listItems.removeClass('active');
        $selectedListWrapper.addClass('active');

        console.log('Content ID', $contentId);
        switch ($contentId) {
            case 4:
            case 5:
            case 6:
            case 7:
                $title.text('Loss Pathways');
                break;
            case 1:
            case 8:
            case 2:
            case 3:
            default:
                $title.text('Atmospheric Lifetimes');
                break;           
        }

        return false;
    });
});