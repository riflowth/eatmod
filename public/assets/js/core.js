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
            data: $(this).serialize()
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

    $('#findMenu-form').on('submit', function(e) {
        e.preventDefault();

        let rawData = $(this).serialize();
        if (!rawData) {
            Swal.fire({
                title: 'คำเตือน!',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                icon: 'warning',
                confirmButtonColor: '#e94a26',
            });
            return;
        }

        let formData = JSON.parse('{"' + decodeURI(rawData)
                                    .replace(/"/g, '\\"')
                                    .replace(/&/g, '","')
                                    .replace(/=/g,'":"') + '"}');
                                    console.log(formData);
        
        if (!formData.findfoodtype) {
            Swal.fire({
                title: 'คำเตือน!',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                icon: 'warning',
                confirmButtonColor: '#e94a26',
            });
            return;
        }

        if (formData.findtype == 'อาหาร') {
            if (formData.findhalal == 'ฮาลาล') {
                window.location.href = `/food?tag=${formData.findfoodtype},${formData.findmeattype},ฮาลาล`;
            } else {
                window.location.href = `/food?tag=${formData.findfoodtype},${formData.findmeattype}`;
            }
        } else {
            window.location.href = `/food?tag=${formData.findfoodtype}`;
        }
    });

    $('#findtype-food').on('click', function() {
        if ($(this).is(':checked')) {
            $('#findtype-form').show();
            $('#findtype-beverage-selector').hide();
            $('#findtype-food-selector').show();
        }
    });

    $('#findtype-beverage').on('click', function() {
        if ($(this).is(':checked')) {
            $('#findtype-form').show();
            $('#findtype-food-selector').hide();
            $('#findtype-beverage-selector').show();
        }
    });

    $('#findfoodtype1').on('click', function() {
        $('#findhalal').show();
    });

    $('#findfoodtype2').on('click', function() {
        $('#findhalal').show();
    });

    $('#findhalal1').on('click', function() {
        if ($(this).is(':checked')) {
            $('#findmeattype').show();
            $('#meattype-pork').show();
        }
    });

    $('#findhalal2').on('click', function() {
        if ($(this).is(':checked')) {
            $('#findmeattype').show();
            $('#meattype-pork').hide();
        }
    });

    $('#star-1').on('click', function() {
        $('#star-1').addClass('text-secondary');
        $('#star-2').removeClass('text-secondary');
        $('#star-3').removeClass('text-secondary');
        $('#star-4').removeClass('text-secondary');
        $('#star-5').removeClass('text-secondary');
        $('#rating-input').val(1);
    });
    $('#star-2').on('click', function() {
        $('#star-1').addClass('text-secondary');
        $('#star-2').addClass('text-secondary');
        $('#star-3').removeClass('text-secondary');
        $('#star-4').removeClass('text-secondary');
        $('#star-5').removeClass('text-secondary');
        $('#rating-input').val(2);
    });
    $('#star-3').on('click', function() {
        $('#star-1').addClass('text-secondary');
        $('#star-2').addClass('text-secondary');
        $('#star-3').addClass('text-secondary');
        $('#star-4').removeClass('text-secondary');
        $('#star-5').removeClass('text-secondary');
        $('#rating-input').val(3);
    });
    $('#star-4').on('click', function() {
        $('#star-1').addClass('text-secondary');
        $('#star-2').addClass('text-secondary');
        $('#star-3').addClass('text-secondary');
        $('#star-4').addClass('text-secondary');
        $('#star-5').removeClass('text-secondary');
        $('#rating-input').val(4);
    });
    $('#star-5').on('click', function() {
        $('#star-1').addClass('text-secondary');
        $('#star-2').addClass('text-secondary');
        $('#star-3').addClass('text-secondary');
        $('#star-4').addClass('text-secondary');
        $('#star-5').addClass('text-secondary');
        $('#rating-input').val(5);
    });
});