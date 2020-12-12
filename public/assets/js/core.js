$(function() {
    $('#review-form').on('submit', function(e) {
        e.preventDefault();
        let title = $('#review-title');
        let review = $('#review-description');

        if (!title.val()) title.addClass('is-invalid');
        if (!review.val()) review.addClass('is-invalid');
        if (!review.val() || !review.val()) return;

        $.ajax({
            url: '/api/review',
            method: 'POST',
            dataType: 'JSON',
            data: $(this).serialize() + '&rating=5'
        }).done((res) => {

        }).fail((err) => {

        });
    });
});