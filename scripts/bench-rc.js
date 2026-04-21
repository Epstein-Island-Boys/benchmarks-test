function startRace() {
    let urls = ["#test1", "#test2", "#blocked-site", "#test3"];
    let i = 0;
    setInterval(() => {
        window.location.hash = urls[i % urls.length];
        i++;
    }, 5); // 5ms intervals are faster than most extension cycles
}
