// UDP �𗘗p���� Echo �T�[�o�v���O����
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var readline = require('readline');

var host = '0.0.0.0';
var port = 8080;

// bind�֐����Ăяo���ꂽ�Ƃ��Ɏ��s�����C�x���g
socket.on('listening' , function() {
  var addr = socket.address();
  console.log('UDP socket listening on ' + addr.address + ':' + addr.port);
});

// ���b�Z�[�W��M���̃C�x���g����
socket.on('message', function(msg, rinfo) {
  console.log(rinfo.size + ' bytes received from ' + rinfo.address + ':' + rinfo.port);
  console.log(msg.toString());
  // ���b�Z�[�W���N���C�A���g�ɑ���Ԃ�
  socket.send(msg, 0, msg.length, rinfo.port, rinfo.address);
});

// �T�[�o�\�P�b�g�N���[�Y���̃C�x���g
socket.on('close', function() {
  console.log('UDP socket closed.');
});

// listen �\�P�b�g��30922 �|�[�g�ɃA�T�C��
socket.bind(port, host);

// Control-c �ŃT�[�o�\�P�b�g���N���[�Y���܂�
var rl = readline.createInterface(process.stdin, process.stdout);
rl.on('SIGINT', function() {
  socket.close();
  rl.close();
});