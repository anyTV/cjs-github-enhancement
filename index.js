function cjs_update() {
    Array.from(document.querySelectorAll('.outdated-diff-comment-container')).forEach(function (elem) {
      if(!elem.querySelector('.comment-holder > .comment:last-child .comment-body')
        .textContent
        .trim()
        .match(/\!\bfixed\b|\!\bresolved\b|\!\bcompleted\b/g)) {
        elem.className += ' open';
      }
    });

    Array.from(document.querySelectorAll('.comment:last-child .comment-body.js-comment-body')).forEach(function (elem) {
        if(elem.innerText.match(/\!\bfix\b|\!\bresolve\b/g)) {
            elem.style.background = '#ffcdd2';
        }
    });
    
    
    Array.from(document.querySelectorAll('.timeline-comment-wrapper .comment > .comment-content .edit-comment-hide > .comment-body')).forEach(function(e) {
        e.innerHTML = e.innerHTML.replace(/:AllenApproves:/g, '<img src="https://en.gravatar.com/userimage/101328657/c9adf0e5b944f4e03a13366d0df3140f.png?size=120">')
        .replace(/:AllenNoLikey:/g, '<img width=120 src="https://cloud.githubusercontent.com/assets/3425521/13208640/d8f69c82-d955-11e5-9fc9-6f583603a076.png">');
    });

    Array.from(document.querySelectorAll('.details .message blockquote p')).forEach(function(e) {
        e.innerHTML = e.innerHTML.replace(/:AllenApproves:/g, '<img src="https://en.gravatar.com/userimage/101328657/c9adf0e5b944f4e03a13366d0df3140f.png?size=120">')
        .replace(/:AllenNoLikey:/g, '<img width=120 src="https://cloud.githubusercontent.com/assets/3425521/13208640/d8f69c82-d955-11e5-9fc9-6f583603a076.png">');
    });

    appendAllen();
}

function allenApproves() {
	var cmt = $('#new_comment_field').val();
    $('#new_comment_field').val(cmt + (cmt ? '\n' : '') + ':AllenApproves:');
    $('#partial-new-comment-form-actions').children().get(0).click()
}

function appendAllen() {
    if ($('#allenapproves').length) {
        return;    
    }
    
    var approve = $($('#partial-new-comment-form-actions').children().get(0))
        .clone().prop('tabindex', '5').html('Approve').prop('id', 'allenapproves').click(allenApproves);
        
    $("#partial-new-comment-form-actions").prepend(approve);
}

cjs_update();
$(document).on('ajaxSuccess', function () { setTimeout(cjs_update, 250); });
