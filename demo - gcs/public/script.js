var input = document.querySelector('input[type=file]');
var button = document.querySelector('button');

button.onclick = function () {
  for (var i = 0; i < input.files.length; i++){
    sendFiles(input.files.item(i), function (response, file) {
      document.body.append(document.createTextNode(file.name + ' : ' + response));
      document.body.append(document.createElement('br'));
    });
  }
};

function sendFiles(data, callback) {
  var fd = new FormData();
  var uri;
  if (data instanceof FileList) {
    uri = "/upload/images";
    for (var i = 0; i < data.length; i++)
      fd.append('image', data.item(i));
  }
  else if (data instanceof File) {
    uri = "/upload/image";
    fd.append('image', data);
  } else {
    callback('Unsupported File!');
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", uri, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.response, data);
    }
  };
  xhr.send(fd);
}