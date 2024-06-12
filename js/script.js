const params = new URLSearchParams(window.location.search);

let nomeUsuario = params.get('user');
if (!nomeUsuario) {
    nomeUsuario = 'LuizaLorien';
}

const verifyname = (nome, param = "Nome não disponível") => {
    return nome === null ? param : nome;
}

const verifybio = (bio, param = "Bio não disponível") => {
    return bio === null ? param : bio;
}

const fetchUserData = (username) => {
    const url = `https://api.github.com/users/${username}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const profilediv = document.getElementById('perfil');
            profilediv.innerHTML = ''; 

            const usercard = document.createElement('div');
            usercard.className = 'card';

            const userdetails = document.createElement('div');
            userdetails.innerHTML = `
                <ul>
                <li>
                <span id="img">
                <img id="avatarimg" src="${data.avatar_url}">
                </span>
                </li>
                <li>
                <span class="content">
                <li>
                <h2 id="nome">${verifyname(data.name)}</h2>  
                <p id="bio">${verifybio(data.bio)}</p>
                </li>
                <li id="buttons">
                <button class="dowload">Dowload Curriculo</button>
                <button class="Contato">Contato</button>
                </li>
                </span>
                </li>
                </ul>`;

            const containerfriend = document.createElement('div');
            containerfriend.className = 'container-friends';

            usercard.appendChild(userdetails);
            profilediv.appendChild(usercard);

            const followingdiv = document.getElementById('seguindo');
            followingdiv.innerHTML = `<h3>Seguindo:</h3>`; // Limpa o conteúdo anterior

            fetch(`https://api.github.com/users/${username}/following`)
                .then(response => response.json())
                .then((followingData) => {
                    const friends = document.createElement('ul');
                    friends.className = 'list-friends';

                    followingData.forEach((friend) => {
                        const friendlist = document.createElement('li');
                        friendlist.className = 'friendlist'
                        friendlist.innerHTML = `
                            <img id="friendavatarimg" src="${friend.avatar_url}">
                            <h2 id="nome">${verifyname(friend.login)}</h2>  
                            <p id="bio"></p>`;

                        friendlist.addEventListener('click', () => {
                            fetchUserData(friend.login); // Chama a função para carregar os dados do amigo
                        });

                        friends.appendChild(friendlist);
                    });

                    followingdiv.appendChild(friends);
                })
                .catch(error => console.error('Erro ao buscar dados de amigos:', error));
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
};

fetchUserData(nomeUsuario);