let peer;

let localStream;

var call;

/* eslint-disable require-jsdoc */
function initPeer(key) {
    // Peer object
    peer = new Peer({
        key: key,
        debug: 3,
    });

    peer.on('open', () => {
        $('#my-id').text(peer.id);
    });

    // Receiving a call
    peer.on('call', call => {
        // Answer the call automatically (instead of prompting user) for demo purposes
        call.answer(localStream);
    });

    peer.on('error', err => {
        alert(err.message);
    });
};

function callBroadCast(roomId) {
    call = peer.call(roomId);

    // Wait for stream on the call, then set peer video display
    call.on('stream', stream => {
        const el = $('#video').get(0);
        el.srcObject = stream;
        el.play();
    });

    call.on('close', () => {
        console.log('connection closed');
    });
}