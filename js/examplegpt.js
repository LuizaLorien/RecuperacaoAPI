document.addEventListener('DOMContentLoaded', () => {
    const username = 'LuizaLorien'; // substitua pelo seu nome de usuário do GitHub
    const URL_BASE = `https://api.github.com/users/${username}`;

    const buscarDadosUsuario = (url, callback) => {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    const exibirPerfil = (dados) => {
        const perfilDiv = document.getElementById('perfil');

        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        const userImg = document.createElement('img');
        userImg.src = dados.avatar_url;
        userImg.alt = dados.login;
        userImg.width = 100;

        const userDetails = document.createElement('div');
        userDetails.innerHTML = `
            <h2>${dados.name}</h2>
            <p>${dados.bio}</p>
            <p>Seguidores: ${dados.followers}</p>
            <p>Seguindo: ${dados.following}</p>
            <p>Repositórios Públicos: ${dados.public_repos}</p>
        `;

        userCard.appendChild(userImg);
        userCard.appendChild(userDetails);
        perfilDiv.appendChild(userCard);
    }

    const exibirAmigos = (amigos) => {
        const amigosDiv = document.getElementById('amigos');
        const listaAmigos = document.createElement('ul');

        amigos.forEach(amigo => {
            const amigoItem = document.createElement('li');
            amigoItem.className = 'friend-card';
            amigoItem.dataset.id = amigo.id;

            const amigoImg = document.createElement('img');
            amigoImg.src = amigo.avatar_url;
            amigoImg.alt = amigo.login;
            amigoImg.width = 50;

            const amigoNome = document.createElement('div');
            amigoNome.innerHTML = `
                <h3>${amigo.login}</h3>
                <a href="friend.html?username=${amigo.login}">Ver Perfil</a>
            `;

            amigoItem.appendChild(amigoImg);
            amigoItem.appendChild(amigoNome);
            listaAmigos.appendChild(amigoItem);
        });

        amigosDiv.appendChild(listaAmigos);
    }

    const exibirSeguindo = (seguindo) => {
        const seguindoDiv = document.getElementById('seguindo');
        const listaSeguindo = document.createElement('ul');

        seguindo.forEach(amigo => {
            const seguindoItem = document.createElement('li');
            seguindoItem.className = 'following-card';
            seguindoItem.dataset.username = amigo.login;

            const seguindoImg = document.createElement('img');
            seguindoImg.src = amigo.avatar_url;
            seguindoImg.alt = amigo.login;
            seguindoImg.width = 50;

            const seguindoNome = document.createElement('div');
            seguindoNome.innerHTML = `
                <h3>${amigo.login}</h3>
            `;

            seguindoItem.appendChild(seguindoImg);
            seguindoItem.appendChild(seguindoNome);
            listaSeguindo.appendChild(seguindoItem);

            // Adiciona o evento de clique para redirecionar
            seguindoItem.addEventListener('click', () => {
                window.location.href = `friend.html?username=${amigo.login}`;
            });
        });

        seguindoDiv.appendChild(listaSeguindo);
    }

    const exibirSeguidoresAmigo = (seguidores) => {
        const seguidoresDiv = document.getElementById('seguidores-amigo');
        const listaSeguidores = document.createElement('ul');

        seguidores.forEach(seguidor => {
            const seguidorItem = document.createElement('li');
            seguidorItem.className = 'friend-card';
            seguidorItem.dataset.id = seguidor.id;

            const seguidorImg = document.createElement('img');
            seguidorImg.src = seguidor.avatar_url;
            seguidorImg.alt = seguidor.login;
            seguidorImg.width = 50;

            const seguidorNome = document.createElement('div');
            seguidorNome.innerHTML = `
                <h3>${seguidor.login}</h3>
                <a href="friend.html?username=${seguidor.login}">Ver Perfil</a>
            `;

            seguidorItem.appendChild(seguidorImg);
            seguidorItem.appendChild(seguidorNome);
            listaSeguidores.appendChild(seguidorItem);
        });

        seguidoresDiv.appendChild(listaSeguidores);
    }

    if (window.location.pathname.endsWith('friend.html')) {
        const params = new URLSearchParams(window.location.search);
        const friendUsername = params.get('username');
        if (friendUsername) {
            buscarDadosUsuario(`https://api.github.com/users/${friendUsername}`, (dados) => {
                const perfilAmigoDiv = document.getElementById('perfil-amigo');

                const friendCard = document.createElement('div');
                friendCard.className = 'user-card';

                const friendImg = document.createElement('img');
                friendImg.src = dados.avatar_url;
                friendImg.alt = dados.login;
                friendImg.width = 100;

                const friendDetails = document.createElement('div');
                friendDetails.innerHTML = `
                    <h2>${dados.name}</h2>
                    <p>${dados.bio}</p>
                    <p>Seguidores: ${dados.followers}</p>
                    <p>Seguindo: ${dados.following}</p>
                    <p>Repositórios Públicos: ${dados.public_repos}</p>
                `;

                friendCard.appendChild(friendImg);
                friendCard.appendChild(friendDetails);
                perfilAmigoDiv.appendChild(friendCard);

                // Buscar e exibir os seguidores do amigo
                buscarDadosUsuario(`https://api.github.com/users/${friendUsername}/followers`, exibirSeguidoresAmigo);
            });
        }
    } else {
        buscarDadosUsuario(URL_BASE, (dados) => {
            exibirPerfil(dados);
            buscarDadosUsuario(`${URL_BASE}/followers`, exibirAmigos);
            buscarDadosUsuario(`${URL_BASE}/following`, exibirSeguindo);
        });
    }
});



////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const username = 'LuizaLorien'; // substitua pelo seu nome de usuário do GitHub
    const URL_BASE = `https://api.github.com/users/${username}`;

    const buscarDadosUsuario = (url, callback) => {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    const exibirPerfil = (dados) => {
        const perfilDiv = document.getElementById('perfil');

        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        const userImg = document.createElement('img');
        userImg.src = dados.avatar_url;
        userImg.alt = dados.login;
        userImg.width = 100;

        const userDetails = document.createElement('div');
        userDetails.innerHTML = `
            <h2>${dados.name}</h2>
            <p>${dados.bio}</p>
            <p>Seguidores: ${dados.followers}</p>
            <p>Seguindo: ${dados.following}</p>
            <p>Repositórios Públicos: ${dados.public_repos}</p>
        `;

        userCard.appendChild(userImg);
        userCard.appendChild(userDetails);
        perfilDiv.appendChild(userCard);
    }

    const exibirAmigos = (amigos) => {
        const amigosDiv = document.getElementById('amigos');
        const listaAmigos = document.createElement('ul');

        amigos.forEach(amigo => {
            const amigoItem = document.createElement('li');
            amigoItem.className = 'friend-card';
            amigoItem.dataset.id = amigo.id;

            const amigoImg = document.createElement('img');
            amigoImg.src = amigo.avatar_url;
            amigoImg.alt = amigo.login;
            amigoImg.width = 50;

            const amigoNome = document.createElement('div');
            amigoNome.innerHTML = `
                <h3>${amigo.login}</h3>
                <a href="friend.html?username=${amigo.login}">Ver Perfil</a>
            `;

            amigoItem.appendChild(amigoImg);
            amigoItem.appendChild(amigoNome);
            listaAmigos.appendChild(amigoItem);
        });

        amigosDiv.appendChild(listaAmigos);
    }

    const exibirSeguindo = (seguindo) => {
        const seguindoDiv = document.getElementById('seguindo');
        const listaSeguindo = document.createElement('ul');

        seguindo.forEach(amigo => {
            const seguindoItem = document.createElement('li');
            seguindoItem.className = 'following-card';
            seguindoItem.dataset.username = amigo.login;

            const seguindoImg = document.createElement('img');
            seguindoImg.src = amigo.avatar_url;
            seguindoImg.alt = amigo.login;
            seguindoImg.width = 50;

            const seguindoNome = document.createElement('div');
            seguindoNome.innerHTML = `
                <h3>${amigo.login}</h3>
            `;

            seguindoItem.appendChild(seguindoImg);
            seguindoItem.appendChild(seguindoNome);
            listaSeguindo.appendChild(seguindoItem);

            // Adiciona o evento de clique para redirecionar
            seguindoItem.addEventListener('click', () => {
                window.location.href = `friend.html?username=${amigo.login}`;
            });
        });

        seguindoDiv.appendChild(listaSeguindo);
    }

    const exibirSeguidoresAmigo = (seguidores) => {
        const seguidoresDiv = document.getElementById('seguidores-amigo');
        const listaSeguidores = document.createElement('ul');

        seguidores.forEach(seguidor => {
            const seguidorItem = document.createElement('li');
            seguidorItem.className = 'friend-card';
            seguidorItem.dataset.id = seguidor.id;

            const seguidorImg = document.createElement('img');
            seguidorImg.src = seguidor.avatar_url;
            seguidorImg.alt = seguidor.login;
            seguidorImg.width = 50;

            const seguidorNome = document.createElement('div');
            seguidorNome.innerHTML = `
                <h3>${seguidor.login}</h3>
                <a href="friend.html?username=${seguidor.login}">Ver Perfil</a>
            `;

            seguidorItem.appendChild(seguidorImg);
            seguidorItem.appendChild(seguidorNome);
            listaSeguidores.appendChild(seguidorItem);
        });

        seguidoresDiv.appendChild(listaSeguidores);
    }

    if (window.location.pathname.endsWith('friend.html')) {
        const params = new URLSearchParams(window.location.search);
        const friendUsername = params.get('username');
        if (friendUsername) {
            buscarDadosUsuario(`https://api.github.com/users/${friendUsername}`, (dados) => {
                const perfilAmigoDiv = document.getElementById('perfil-amigo');

                const friendCard = document.createElement('div');
                friendCard.className = 'user-card';

                const friendImg = document.createElement('img');
                friendImg.src = dados.avatar_url;
                friendImg.alt = dados.login;
                friendImg.width = 100;

                const friendDetails = document.createElement('div');
                friendDetails.innerHTML = `
                    <h2>${dados.name}</h2>
                    <p>${dados.bio}</p>
                    <p>Seguidores: ${dados.followers}</p>
                    <p>Seguindo: ${dados.following}</p>
                    <p>Repositórios Públicos: ${dados.public_repos}</p>
                `;

                friendCard.appendChild(friendImg);
                friendCard.appendChild(friendDetails);
                perfilAmigoDiv.appendChild(friendCard);

                // Buscar e exibir os seguidores do amigo
                buscarDadosUsuario(`https://api.github.com/users/${friendUsername}/followers`, exibirSeguidoresAmigo);
            });
        }
    } else {
        buscarDadosUsuario(URL_BASE, (dados) => {
            exibirPerfil(dados);
            buscarDadosUsuario(`${URL_BASE}/followers`, exibirAmigos);
            buscarDadosUsuario(`${URL_BASE}/following`, exibirSeguindo);
        });
    }
});
