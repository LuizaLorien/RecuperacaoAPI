const verifyname = (nome, param) => {
    if (nome === null) {
        return param;

    } else {
        return nome;
    }
}
const verifybio = (bio, param) => {
    if (bio === null) {
        return param;
    }else {
        return bio;
    }
}
//prefiro utilizar inglês
const url = `https://api.github.com/users/LuizaLorien`
fetch(url)
    .then(response => response.json())
    .then(data => {

        const profilediv = document.getElementById('perfil');
        const usercard = document.createElement('div');
        usercard.className = 'card';

        const userdetails = document.createElement('div');
        userdetails.innerHTML = `
                <img id="avatarimg" src="${data.avatar_url}">
                <h2 id="nome">${verifyname(data.name)}</h2>  
                <p id="bio">${data.bio}</p>
                <h3>Seguindo: ${data.following}</h3>`

        const containerfriend = document.createElement('div');
        containerfriend.className = 'container-friends';

        usercard.appendChild(userdetails);
        profilediv.appendChild(usercard);

        const friendslist = document.createElement('ul');
        friendslist.className = 'list-friends';

        const friendlist = document.createElement('li');
        friendlist.innerHTML = ``

        const followersdiv = document.createElement('div')
        followersdiv.className = 'followers-div'

        usercard.addEventListener('click', () => {

            if (window.location.pathname.endsWith('friend.html')) {

            } else { }
        })

        const followingdiv = document.getElementById('seguindo')

        fetch('https://api.github.com/users/LuizaLorien/following')
            .then(response => response.json())
            .then((data) => {
                console.log(data)

                const friends = document.createElement('ul');
                friends.className = '';

                data.forEach((data) => {

                    const friendlist = document.createElement('li')

                    friendlist.innerHTML = `
                        <img id="avatarimg" src="${data.avatar_url}">
                        <h2 id="nome">${verifyname(data.name, data.login)}</h2>  
                        <p id="bio">${verifybio(data.bio, '')}</p>
                        <h3>Seguindo: ${data.following}</h3>`
                    
                    friends.appendChild(friendlist);

                })
                followingdiv.innerHTML =friends
            })

    })
    .catch(error => console.error('Erro ao buscar dados:', error));