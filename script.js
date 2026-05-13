const imagens = [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80'
];

let index = 0;
const slide = document.getElementById('slide');

function mostrarSlide() {
    slide.src = imagens[index];
}

function proximoSlide() {
    index = (index + 1) % imagens.length;
    mostrarSlide();
}

function anteriorSlide() {
    index = (index - 1 + imagens.length) % imagens.length;
    mostrarSlide();
}

document.getElementById('btnProximo').addEventListener('click', proximoSlide);
document.getElementById('btnAnterior').addEventListener('click', anteriorSlide);

setInterval(proximoSlide, 5000);

const botoesComprar = document.querySelectorAll('.comprar');

botoesComprar.forEach((botao, idx) => {
    botao.addEventListener('click', () => {
        const produtoNome = botao.previousElementSibling.previousElementSibling.textContent;
        alert(`Produto "${produtoNome}" adicionado ao carrinho!`);
        adicionarAoCarrinho(produtoNome);
    });
});

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '<h3>Carrinho</h3>';
    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML += '<p>Carrinho vazio</p>';
    } else {
        carrinho.forEach(item => {
            carrinhoDiv.innerHTML += `<p>${item}</p>`;
        });
    }
}

document.addEventListener('DOMContentLoaded', atualizarCarrinho);

document.getElementById('btnLogin').addEventListener('click', () => {
    const usuario = prompt('Digite seu nome de usuário:');
    const senha = prompt('Digite sua senha:');
    if (usuario && senha) {
        if (validarLogin(usuario, senha)) {
            alert(`Bem-vindo, ${usuario}!`);
            localStorage.setItem('usuarioLogado', usuario);
            mostrarUsuarioLogado();
        } else {
            alert('Usuário ou senha incorretos.');
        }
    }
});

function validarLogin(usuario, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some(u => u.usuario === usuario && u.senha === senha);
}

function mostrarUsuarioLogado() {
    const usuario = localStorage.getItem('usuarioLogado');
    const btnLogin = document.getElementById('btnLogin');
    const usuarioDiv = document.getElementById('usuarioLogado');
    if (usuario) {
        btnLogin.style.display = 'none';
        usuarioDiv.style.display = 'flex';
        usuarioDiv.innerHTML = `<p>Logado como: ${usuario}</p><button id="btnLogout">Logout</button>`;
        document.getElementById('btnLogout').addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            location.reload();
        });
    } else {
        btnLogin.style.display = 'block';
        usuarioDiv.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', mostrarUsuarioLogado);

document.getElementById('formCadastro').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!validarNome(nome)) {
        alert('Nome deve ter pelo menos 2 caracteres.');
        return;
    }
    if (!validarEmail(email)) {
        alert('Email inválido.');
        return;
    }
    if (!validarSenha(senha)) {
        alert('Senha deve ter pelo menos 6 caracteres.');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.some(u => u.email === email)) {
        alert('Email já cadastrado.');
        return;
    }

    usuarios.push({ nome, email, usuario: nome, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso!');
    this.reset();
});

function validarNome(nome) {
    return nome.length >= 2;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarSenha(senha) {
    return senha.length >= 6;
}

// Manipulação dinâmica: Adicionar produto dinamicamente
document.getElementById('btnAdicionarProduto').addEventListener('click', () => {
    const nomeProduto = prompt('Nome do produto:');
    const precoProduto = prompt('Preço do produto:');
    if (nomeProduto && precoProduto) {
        const produtosDiv = document.querySelector('.produtos');
        const novoProduto = document.createElement('div');
        novoProduto.className = 'produto';
        novoProduto.innerHTML = `
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" alt="${nomeProduto}">
            <h2>${nomeProduto}</h2>
            <p>R$ ${precoProduto}</p>
            <button class="comprar">Comprar</button>
        `;
        produtosDiv.appendChild(novoProduto);
        // Re-adicionar evento ao novo botão
        novoProduto.querySelector('.comprar').addEventListener('click', () => {
            alert(`Produto "${nomeProduto}" adicionado ao carrinho!`);
            adicionarAoCarrinho(nomeProduto);
        });
    }
});