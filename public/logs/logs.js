getData();

async function getData() {
    const response = await fetch('/api/get');
    const data = await response.json();
    
    for(item of data) {
        const root = document.createElement('div');
        const names = document.createElement('div');
        const date = document.createElement('div');
    
        names.textContent = item.names;
        // data.textContent = dateString;

        root.append(names);
        // document.body.append(root);
        document.getElementById("wrapper").append(root);
    
        root.classList.add('word');
        names.classList.add('names');
    }
    console.log(data);
}

