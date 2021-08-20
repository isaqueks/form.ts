import jquery from 'jquery';

const Pages = {
    currentPage: 1,
    
    setPage(index) {
        
        if ((index == this.currentPage || index < 1))
            return;

        $(`.page[page-index="${this.currentPage}"]`).removeClass('page-focused');
        $('.page-container').stop().animate({scrollLeft: (index - 1) * window.innerWidth}, 200);
        $(`.page[page-index="${index}"]`).addClass('page-focused');

        this.currentPage = index;

    },

    fixCurrentPage() {
        $('.page-container').scrollLeft((this.currentPage - 1) * window.innerWidth);
    },

    back() {
        if (this.currentPage > 0) this.setPage(this.currentPage - 1);
    },

    next() {
        this.setPage(this.currentPage + 1);
    }
}

$(window).on('resize', () => {

    Pages.fixCurrentPage();

});

export default Pages;