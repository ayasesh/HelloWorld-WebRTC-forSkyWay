/* eslint-disable require-jsdoc */
$(function() {
    // Peer object
    const peer = new Peer({
        key:   window.__SKYWAY_KEY__,
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
        call.answer(localStream);
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

    navigator.mediaDevices.enumerateDevices()
        .then(deviceInfos => {
        const values = selectors.map(select => select.val() || '');
    selectors.forEach(select => {
        const children = select.children(':first');
    while (children.length) {
        select.remove(children);
    }
});

    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = $('<option>').val(deviceInfo.deviceId);

        if (deviceInfo.kind === 'audioinput') {
            option.text(deviceInfo.label ||
                'Microphone ' + (audioSelect.children().length + 1));
            audioSelect.append(option);
        } else if (deviceInfo.kind === 'videoinput') {
            option.text(deviceInfo.label ||
                'Camera ' + (videoSelect.children().length + 1));
            videoSelect.append(option);
        }
    }

    selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.children()).some(n => {
        return n.value === values[selectorIndex];
})) {
        select.val(values[selectorIndex]);
    }
});

    videoSelect.on('change', step1);
    audioSelect.on('change', step1);
});

    function step2() {
        $('#step3').hide();
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
        $('#step2').hide();
        $('#step3').show();
    }
});