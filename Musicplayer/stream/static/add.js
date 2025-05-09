document.getElementById('sm-ip-1').addEventListener('change', function (event) {
    let name = event.target.files[0].name;
    console.log(name);
    if (name.length >= 10)
        name = name.slice(0, 10);
    document.getElementById('file-name1').innerText = name + "...";
});

document.getElementById('sm-ip-2').addEventListener('change', function (event) {
    let name = event.target.files[0].name;
    console.log(name);
    if (name.length >= 10)
        name = name.slice(0, 10);
    document.getElementById('file-name2').innerText = name + "...";
});