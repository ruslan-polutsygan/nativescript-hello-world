require('globals');

onmessage = (message:MessageEvent) => {
    let request = message.data;

    let payload = request.payload;
    console.dump(payload);
    console.dump(request);
    console.dump(message);

    postMessage({success:true});

};
