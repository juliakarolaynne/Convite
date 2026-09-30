// ==============================
// EFEITOS E ELEMENTOS PRINCIPAIS
// ==============================

const particleLayer = document.getElementById("particles");

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwpP1Ws-i83tFxgzmZfCch__BPj4hjJ6h3RneW1qkFmXFTEA2N86D2Mxgn8HkbSVfqSyQ/exec";

function soltarBorboletas(x, y, quantidade = 20) {
    if (!particleLayer) return;

    const borboletas = [
        "assets/borboletas/borboleta_rosa.png",
        "assets/borboletas/borboleta_lilas.png",
        "assets/borboletas/borboleta_azul.png",
        "assets/borboletas/borboleta_dourada.png",
        "assets/borboletas/borboleta_pessego.png"
    ];

    for (let i = 0; i < quantidade; i++) {
        const borboleta = document.createElement("span");
        const imagemBorboleta = document.createElement("img");
        const angulo = (Math.PI * 2 * i) / quantidade + (Math.random() - 0.5) * 0.7;
        const distancia = 180 + Math.random() * 480;
        const imagem = borboletas[Math.floor(Math.random() * borboletas.length)];

        borboleta.className = "fly";
        imagemBorboleta.src = imagem;
        imagemBorboleta.alt = "";
        imagemBorboleta.className = "fly-image";
        borboleta.appendChild(imagemBorboleta);

        const xFinal = Math.cos(angulo) * distancia;
        const yFinal = Math.sin(angulo) * distancia - 110;
        const x1 = xFinal * (.18 + Math.random() * .12) + (Math.random() - .5) * 90;
        const y1 = yFinal * (.12 + Math.random() * .12) + (Math.random() - .5) * 80;
        const x2 = xFinal * (.43 + Math.random() * .16) + (Math.random() - .5) * 150;
        const y2 = yFinal * (.38 + Math.random() * .16) + (Math.random() - .5) * 120;
        const x3 = xFinal * (.70 + Math.random() * .12) + (Math.random() - .5) * 120;
        const y3 = yFinal * (.66 + Math.random() * .12) + (Math.random() - .5) * 100;
        const tamanho = 0.30 + Math.random() * 0.14;

        borboleta.style.left = `${x}px`;
        borboleta.style.top = `${y}px`;
        borboleta.style.setProperty("--x", `${xFinal}px`);
        borboleta.style.setProperty("--y", `${yFinal}px`);
        borboleta.style.setProperty("--x1", `${x1}px`);
        borboleta.style.setProperty("--y1", `${y1}px`);
        borboleta.style.setProperty("--x2", `${x2}px`);
        borboleta.style.setProperty("--y2", `${y2}px`);
        borboleta.style.setProperty("--x3", `${x3}px`);
        borboleta.style.setProperty("--y3", `${y3}px`);
        borboleta.style.setProperty("--tamanho", tamanho);
        borboleta.style.setProperty("--rotacao", `${-15 + Math.random() * 30}deg`);
        borboleta.style.setProperty("--duracao", `${5.2 + Math.random() * 2.2}s`);
        borboleta.style.setProperty("--atraso", `${Math.random() * 0.35}s`);
        borboleta.style.setProperty("--asa", `${.28 + Math.random() * .12}s`);

        particleLayer.appendChild(borboleta);
        setTimeout(() => borboleta.remove(), 8500);
    }

    criarBrilhos(x, y);
}
function criarBrilhos(x, y) {
    if (!particleLayer) return;

    for (let i = 0; i < 18; i++) {
        const brilho = document.createElement("span");
        brilho.className = "spark";
        brilho.textContent = i % 2 ? "✦" : "·";
        brilho.style.left = `${x + (Math.random() - .5) * 80}px`;
        brilho.style.top = `${y + (Math.random() - .5) * 70}px`;
        brilho.style.setProperty("--x", `${(Math.random() - .5) * 150}px`);
        brilho.style.setProperty("--y", `${(Math.random() - .5) * 150}px`);
        particleLayer.appendChild(brilho);
        setTimeout(() => brilho.remove(), 1000);
    }
}

function soltarPetalas(quantidade = 24) {
    if (!particleLayer) return;

    for (let i = 0; i < quantidade; i++) {
        const petala = document.createElement("span");
        petala.className = "petal-fall";
        petala.textContent = i % 2 ? "✿" : "·";
        petala.style.left = `${Math.random() * 100}vw`;
        petala.style.top = "-30px";
        petala.style.setProperty("--x", `${(Math.random() - .5) * 180}px`);
        petala.style.setProperty("--duracao", `${3 + Math.random() * 3}s`);
        particleLayer.appendChild(petala);
        setTimeout(() => petala.remove(), 7000);
    }
}

// ==============================
// PRIMEIRA TELA
// A borboleta apenas abre o convite.
// A chuva de borboletas acontece somente no botão do jardim.
// ==============================

const magicButterfly = document.getElementById("magicButterfly");
const enterGarden = document.getElementById("enterGarden");

if (magicButterfly && enterGarden) {
    magicButterfly.addEventListener("click", () => {
        const area = magicButterfly.getBoundingClientRect();
        const x = area.left + area.width / 2;
        const y = area.top + area.height / 2;

        // Ao tocar na borboleta, ela libera outras borboletas e brilhos.
        magicButterfly.classList.add("butterfly-open");
        soltarBorboletas(x, y, 16);
        criarBrilhos(x, y);

        setTimeout(() => {
            enterGarden.classList.add("show");
        }, 700);
    });
}

// ==============================
// BOTÃO DO JARDIM
// As borboletas só voam quando a pessoa decide descobrir a história.
// ==============================

const discoverHistory = document.querySelector(".discover-history");

if (discoverHistory) {
    discoverHistory.addEventListener("click", (event) => {
        event.preventDefault();

        const area = discoverHistory.getBoundingClientRect();
        soltarBorboletas(area.left + area.width / 2, area.top + area.height / 2, 24);
        soltarPetalas(12);

        setTimeout(() => {
            window.location.href = discoverHistory.href;
        }, 1050);
    });
}

// ==============================
// FLORES DO JARDIM
// ==============================

const flores = document.querySelectorAll(".garden-flower");
const floresEncontradas = new Set();

flores.forEach((flor, index) => {
    flor.addEventListener("click", () => {
        const mensagem = document.getElementById("flowerMessage");
        floresEncontradas.add(index);

        if (mensagem) {
            mensagem.textContent = flor.dataset.message;
            mensagem.classList.add("message-show");
        }

        flor.classList.add("found");
        setTimeout(() => flor.classList.remove("found"), 700);

        if (floresEncontradas.size === 4 && mensagem) {
            mensagem.textContent = "Você encontrou todos os encantos ✦ Agora descubra a história!";
        }
    });
});

// ==============================
// HISTÓRIA
// ==============================

const storyButton = document.getElementById("storyNext");

if (storyButton) {
    const etapas = [
        {
            imagem: "assets/historia/semente.svg",
            alt: "Uma pequena semente",
            texto: "Tudo começou com uma pequena semente, cheia de possibilidades.",
            dica: "Uma nova vida começava a florescer."
        },
        {
            imagem: "assets/historia/planta.svg",
            alt: "Um broto crescendo",
            texto: "Cercada de carinho, ela foi crescendo e enchendo os dias de descobertas.",
            dica: "Cada sorriso fazia esse pequeno jardim crescer."
        },
        {
            imagem: "assets/historia/flor.svg",
            alt: "Uma flor aberta",
            texto: "E então floresceu: nossa pequena Aysha, trazendo mais amor para todos ao redor.",
            dica: "Hoje celebramos seu primeiro aninho."
        }
    ];

    let etapaAtual = 0;

    storyButton.addEventListener("click", () => {
        etapaAtual++;

        if (etapaAtual < etapas.length) {
            const etapa = etapas[etapaAtual];
            const imagem = document.getElementById("storyImage");
            const texto = document.getElementById("storyText");
            const dica = document.getElementById("storyHint");

            imagem.src = etapa.imagem;
            imagem.alt = etapa.alt;
            texto.textContent = etapa.texto;
            dica.textContent = etapa.dica;

            imagem.classList.remove("story-change");
            void imagem.offsetWidth;
            imagem.classList.add("story-change");

            if (etapaAtual === etapas.length - 1) {
                storyButton.textContent = "Guardar esse momento →";
            }
            return;
        }

        window.location.href = "data.html";
    });
}

// ==============================
// PRESENTES
// ==============================

const giftOptions = document.querySelectorAll(".gift-option");
const giftDetails = document.getElementById("giftDetails");

const detalhesPresentes = {
    roupinhas: `<strong>Roupinhas</strong><p>Para acompanhar a Aysha em cada nova fase.</p><p><b>Tamanho:</b> a definir</p>`,
    calcados: `<strong>Calçados</strong><p>Uma opção para os primeiros passinhos e novas aventuras.</p><p><b>Tamanho:</b> a definir</p>`,
    brinquedos: `<strong>Brinquedos</strong><p>Brinquedos diversos para brincar, descobrir e imaginar.</p>`,
    pix: `<strong>PIX</strong><p>Se preferir, essa também é uma sugestão de presente.</p><div class="pix-key">CHAVE PIX AQUI</div><button class="secondary-btn" id="copyPix">Copiar chave</button><small>Troque a chave acima antes de enviar o convite.</small>`
};

giftOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const tipo = option.dataset.gift;
        giftDetails.hidden = false;
        giftDetails.innerHTML = detalhesPresentes[tipo];

        const copyPix = document.getElementById("copyPix");
        if (copyPix) {
            copyPix.addEventListener("click", async () => {
                const chave = "CHAVE PIX AQUI";
                try {
                    await navigator.clipboard.writeText(chave);
                    copyPix.textContent = "Chave copiada ✓";
                } catch {
                    copyPix.textContent = "Copie a chave acima";
                }
            });
        }
    });
});

// ==============================
// CALENDÁRIO
// ==============================

const calendarButton = document.getElementById("calendarBtn");

if (calendarButton) {
    calendarButton.addEventListener("click", () => {
        const evento = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20261101T120000\nDTEND:20261101T170000\nSUMMARY:1 aninho da Aysha\nDESCRIPTION:Aniversário da Aysha - Jardim Encantado\nLOCATION:Rua das Flores, 123 - Formosa - GO\nEND:VEVENT\nEND:VCALENDAR`;
        const arquivo = new Blob([evento], { type: "text/calendar" });
        const url = URL.createObjectURL(arquivo);
        const link = document.createElement("a");
        link.href = url;
        link.download = "aniversario-aysha.ics";
        link.click();
        URL.revokeObjectURL(url);
    });
}

// ==============================
// MAPA
// ==============================

const mapsButton = document.getElementById("mapsBtn");

if (mapsButton) {
    mapsButton.addEventListener("click", (event) => {
        event.preventDefault();
        const endereco = encodeURIComponent("Rua das Flores, 123, Formosa - GO");
        window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, "_blank");
    });
}

// ==============================
// CONFIRMAÇÃO DE PRESENÇA
// ==============================

// ==============================
// CONFIRMAÇÃO DE PRESENÇA
// ==============================

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

    rsvpForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome = document.getElementById("name").value.trim();
        const convidados = document.getElementById("guests").value;
        const mensagem = document.getElementById("message").value.trim();

        const confirmation = document.getElementById("confirmationScreen");
        const confirmationText = document.getElementById("confirmationText");
        const botao = rsvpForm.querySelector("button[type='submit']");

        // Evita clicar várias vezes
        botao.disabled = true;
        botao.textContent = "Enviando...";

        const dados = {
            nome: nome,
            convidados: convidados,
            mensagem: mensagem
        };

        try {

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(dados)
            });

            // Esconde o formulário
            rsvpForm.hidden = true;

            // Mostra confirmação
            if (confirmation) {
                confirmation.hidden = false;

                confirmationText.textContent =
                    `Obrigada, ${nome}! Sua presença (${convidados}) foi confirmada. Esperamos você para celebrar esse dia especial com a Aysha. 💗`;
            }

            // Animação das borboletas
            soltarBorboletas(
                window.innerWidth / 2,
                window.innerHeight / 2,
                12
            );

        } catch (erro) {

            console.error("Erro ao enviar:", erro);

            botao.disabled = false;
            botao.textContent = "Confirmar ♡";

            alert(
                "Não foi possível enviar a confirmação. Tente novamente."
            );
        }

    });

}

// ==============================
// MÚSICA
// ==============================

const musicButton = document.getElementById("musicBtn");
let musica;

if (musicButton) {
    musicButton.addEventListener("click", () => {
        if (!musica) {
            musica = new Audio("audio/musica.mp3");
            musica.loop = true;
        }

        if (musica.paused) {
            musica.play().then(() => musicButton.textContent = "❚❚").catch(() => {});
        } else {
            musica.pause();
            musicButton.textContent = "♪";
        }
    });
}
