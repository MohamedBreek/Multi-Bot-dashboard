function fetchData() {
    fetch('https://api.statcord.com/v3/884467910494535741')
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data[0]) {
                const stats = data.data[0];
                if (document.querySelector('#server-count')) {
                    document.querySelector('#server-count').innerHTML = `<h4>${stats.servers}</h4>`;
                }
                if (document.querySelector('#user-count')) {
                    document.querySelector('#user-count').innerHTML = `<h4>${stats.users}</h4>`;
                }
                if (document.querySelector('#cmd-count')) {
                    document.querySelector('#cmd-count').innerHTML = `<h4>${stats.commands}</h4>`;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

fetchData();