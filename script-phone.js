/* eslint-disable require-jsdoc */
$(function () {
    // Peer object
    const peer = new Peer({
        key: window.__SKYWAY_KEY__,
        debug: 3,
    });

    let localStream;
    let existingCall;

    peer.on('open', () => {
        $('#my-id').text(peer.id);
        step2();
    });

    // Receiving a call
    peer.on('call', call => {
        // Answer the call automatically (instead of prompting user) for demo purposes
        call.answer(localStream, {
            videoCodec: 'H264',
        });
        step3(call);
    });

    peer.on('error', err => {
        alert(err.message);
        // Return to step 2 if error occurs
        step2();
    });

    $('#make-call').on('submit', e => {
        e.preventDefault();
        // Initiate a call!
        console.log($('#callto-id').val());
        const call = peer.call($('#callto-id').val(), localStream);
        step3(call);
    });

    $('#end-call').on('click', () => {
        existingCall.close();
        step2();
    });

    // Retry if getUserMedia fails
    $('#step1-retry').on('click', () => {
        $('#step1-error').hide();
        step2();
    });

    function step2() {
        $('#step1, #step3').hide();
        $('#step2').show();
        $('#callto-id').focus();
    }

    function step3(call) {
        // Hang up on an existing call if present
        if (existingCall) {
            existingCall.close();
        }
        // Wait for stream on the call, then set peer video display
        call.on('stream', stream => {
            $('#their-video').get(0).srcObject = stream;
        });

        // UI stuff
        existingCall = call;
        $('#their-id').text(call.remoteId);
        call.on('close', step2);
        $('#step1, #step2').hide();
        $('#step3').show();
    }
});