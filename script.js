angular.module('app', []).controller('MainCtrl', function($scope) {

  var textFile = null;
  var vCardContacts;

  // Function to create a text file from a string
  var makeTextFile = function( text ) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };

  // Loop through each contact object to create the vCard formatted version and
  // append it to the end of vCardContacts
  _.forEach(contacts, function(contact) {
    vCardContacts = vCardContacts + VCARD.generate(contact);
  });

  // For some reason VCARD.generate outputs 'undefined' at the beginning of the
  // file each time. So we will strip out the first 9 characters
  vCardContacts = vCardContacts.substr(9);

  // Create a file from the vCardContacts string
  textFile = makeTextFile(vCardContacts);

  // Wire up a button to create the file
  $scope.createLink = function() {
    var link = document.getElementById('downloadLink');
    link.href = textFile;
  };

});