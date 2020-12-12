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
            Swal.fire({
                title: 'คุณแน่ใจหรือไม่?',
                text: 'การเขียนรีวิวผู้อื่นจะสามารถเข้ามาอ่านรีวิวที่คุณเขียนได้อย่างสาธารณะ คุณยืนยันที่จะบันทึกรีวิวหรือไม่',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#e94a26',
                cancelButtonColor: '#dae0e5',
                confirmButtonText: 'บันทึก',
                cancelButtonText: 'ยกเลิก'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'บันทึกสำเร็จ!',
                        text: 'ระบบได้บึนทักรีวิวของคุณเรียบร้อย',
                        icon: 'success',
                        showConfirmButton: false
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                }
            });
        }).fail((err) => {

        });
    });
});