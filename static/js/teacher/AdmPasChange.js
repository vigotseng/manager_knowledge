$(function(){
    try{
        cookieContent = get_cookie('WTF');
        if(cookieContent == undefined){
            alert('请先去登录')
            window.location.href='/'
        }
        cookieContent = cookieContent.replace('[','').replace(']','').replace(/"/g,'').split(',');
        teachername = $.trim(cookieContent[1]);
        teacherid = $.trim(cookieContent[0])
        document.getElementsByClassName('WelCome')[0].innerHTML='欢迎'+teachername+'管理员登录';

    }catch{
      window.location.href='/';
    }
})
$("#RepeatNewPassword").bind("input propertychange", function () {
    var no = $('.no');
    var yes = $('.yes');
    var NewPassword = $('#NewPassword').val();
    var RepeatNewPassword = $(this).val();
    if (RepeatNewPassword == NewPassword) {
        no.css('display', 'none');
        yes.css('display', 'inline-block');
    } else {
        no.css('display', 'inline-block');
        yes.css('display', 'none');
    }
});

function SubmitPassword() {
   
    const OldPassword = $('#OldPassword').val();
    const NewPassword = $('#NewPassword').val();
    console.log(teacherid)
    $.ajax({
        url: '/PostAdmPasChange',
        type: 'POST',
        data: {
            teacherid: teacherid,
            OldPassword: OldPassword,
            NewPassword: NewPassword
        },
        success: function (data) {
            console.log(data)
            if (data.toString() == "correct") {
                $('.modifygaiSuccess').css('display', 'block');
                $('#main-wrapper').css('-webkit-filter', 'blur(4px)');
                $('#main-wrapper').css('pointer-events', 'none');

            } else if (data.toString() == "none") {
                $('.modifygaiFail').css('display', 'block');
                $('#main-wrapper').css('-webkit-filter', 'blur(4px)');
                $('#main-wrapper').css('pointer-events', 'none');
            } else if (data.toString() == "error") {
                alert('服务器发生了某些意料之外的错误');
                window.location.href='/';
            };

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function ModifyButton(){
	 window.location.reload();
}