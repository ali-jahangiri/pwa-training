if(navigator.serviceWorker) {
    console.log('registering');
    navigator.serviceWorker.register("./sw.js")
        .then(registration => {
        })
}


function createPostItems() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            const containerElement = document.createElement("div");
            containerElement.classList.add("container");

            data.forEach(el => {
                const { title , body , id } = el;

                const postItemTemplate = `
                    <div class="" style="margin : 1rem; border : 2px solid lightblue;">
                        <h2>${title} - ${id}</h2>
                        <p>${body}</p>
                    </div>
                `;
                containerElement.innerHTML += postItemTemplate;
                document.body.appendChild(containerElement);
            })
        })
    
}


createPostItems();