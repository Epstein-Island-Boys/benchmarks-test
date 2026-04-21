function startChaos() {
    const container = document.body;
    setInterval(() => {
        const div = document.createElement('div');
        div.innerText = "Is this blocked? " + Math.random();
        container.appendChild(div);
        if (container.children.length > 100) container.removeChild(container.firstChild);
    }, 1);
}
