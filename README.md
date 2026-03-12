# Aniversário Cósmico (NASA APOD)

Descubra como o universo era no dia em que você nasceu! Este projeto utiliza a API **Astronomy Picture of the Day (APOD)** da NASA para exibir uma imagem ou vídeo astronômico de uma data específica escolhida pelo usuário, acompanhado de uma explicação científica.

O projeto possui uma interface imersiva em 3D usando **Three.js** e um backend rápido em Python com **FastAPI**.

## 📂 Estrutura do Projeto

- `frontend/`: Contém os arquivos da interface de usuário (HTML, CSS e JavaScript Vanilla + Three.js).
- `backend/`: Contém o servidor desenvolvido em Python utilizando FastAPI, responsável pela comunicação com a API da NASA.
- `iniciar_site.bat`: Script prático para iniciar rapidamente tanto o frontend quanto o backend de forma simultânea no Windows.

## ⚙️ Pré-requisitos

- **Python 3.8+** instalado em sua máquina.

## 🚀 Como Executar Automaticamente (Windows)

A forma mais fácil de rodar todo o projeto é utilizando o script que criamos:

1. Dê dois cliques no arquivo `iniciar_site.bat`.
2. O script cuidará de subir o servidor FastAPI (backend) e o servidor de arquivos estáticos (frontend).
3. O seu navegador padrão será aberto automaticamente acessando `http://localhost:8000`.

## 🛠️ Configuração e Execução Manual

Caso prefira rodar os servidores manualmente:

### 1. Backend (API da NASA)

Abra o terminal na pasta `backend`. Caso possua um ambiente virtual `venv`, inicie-o:
```bash
cd backend
.\venv\Scripts\activate
```

*(Se precisar instalar as dependências manualmente, use: `pip install fastapi uvicorn requests python-dotenv`)*

Certifique-se de que o arquivo `.env` existe na pasta `backend` com a sua chave da API da NASA:
```env
NASA_API_KEY=sua_chave_api_aqui
```

Para rodar o backend localmente:
```bash
python main.py
```
O servidor da API estará rodando em `http://localhost:8001`.

### 2. Frontend

Abra outro terminal, navegue até a pasta `frontend` e inicie um servidor local:

```bash
cd frontend
python -m http.server 8000
```
Por fim, abra o seu navegador e acesse: `http://localhost:8000`.

## 💻 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript Vanilla, Three.js
- **Backend:** Python, FastAPI, Uvicorn, Requests
- **Serviços:** NASA API (Astronomy Picture of the Day)
