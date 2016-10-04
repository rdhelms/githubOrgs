
function getOrgs(username) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/' + username + '/orgs?access_token=cf7fc9652c44b05ddb069f2f145682bc4c1c0a4d',
    error: function(errorObj, errorText, errDesc) {
       var errString = errorText.toUpperCase() + "! User is " + errDesc.toLowerCase() + "!";
       $('.displayError').text(errString);
     },
    success: function(response) {
      console.log(response);
      if (response.length === 0) {
        $('.displayError').text("User has no organizations.");
      }
      addOrg(response);
    }
  });
}

function addOrg(listOfOrgs) {
  listOfOrgs.forEach(function(obj) {
    $currentOrg = $('<li>').attr('class', 'org').text(obj.login).appendTo('.resultsContainer');
    $avatarPic = $('<img>').attr('src', obj.avatar_url).prependTo($currentOrg);
  });
}

$('.getOrgsBtn').click(function() {
  var username = $('#username').val();
  getOrgs(username);
  $(this).css('display', 'none');
  $('.resetBtn').css('display', 'block');
  $('form').css('display', 'none');
});

$('.resetBtn').click(function() {
  location.reload();
});

$('input').keypress(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $('.getOrgsBtn').click();
  }
});
