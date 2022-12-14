const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2022-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2022-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2020-03-05"
    }
];
//? inverte il formato della data
const changeDateFormat = (data) => data.split('-').reverse().join('-');
const container = document.querySelector('#container');
const postsList = [], likeList = [];

initPosts();

//? stampa nel DOM i post 
function initPosts() {
    posts.forEach(post => {
        const myPost = createPost(post);
        container.appendChild(myPost);
        postsList.push(myPost);
    });
}

//? creazione del post in HTML partendo dai dati dell'oggetto
function createPost(object) {
    let post = document.createElement('div');
    post.classList.add('post');
    post.id = `post${object.id}`
    post.innerHTML = `
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${setProfilePic(object)}                  
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${object.author.name}</div>
                        <div class="post-meta__time">${changeDateFormat(object.created) + " - " + getTimeAgo(object.created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${object.content}</div>
            <div class="post__image">
                <img src="${object.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta ">
                        <a class="like-button js-like-button" data-postid="${object.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label ">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${object.id}" class="js-likes-counter">${object.likes}</b> persone
                    </div>
                </div> 
            </div>            
    `;

    //? Listener button
    post.querySelector('.like-button').addEventListener('click', () => likeCliked(post));

    return post;
}

//? Controlla l'esistenza della foto profilo
function setProfilePic(object) {
    if (object.author.image !== null)
        return `<img class="profile-pic" src="${object.author.image}" alt="${object.author.name}">`;

    else
        return `<div class="profile-pic monogram">
        <span class="mono">${getMonogram(object.author.name)}</span>
        </div>`;
}

//? Restituisce le iniziali dell'autore
function getMonogram(name) {
    let mono = name[0];
    for (let i = 0; i < name.length; i++) {
        if (name[i] === " ")
            mono += name[i + 1];
    }
    return mono;
}

//? funzione lanciata al click del "mi piace"
function likeCliked(post) {
    const btn = post.querySelector('.like-button');
    let postID = parseInt(btn.getAttribute('data-postid'));
    let newLike = null;

    if (!btn.classList.contains('like-button--liked')) {
        btn.classList.add('like-button--liked');
        likeList.push(postID);
        newLike = ++posts[postID - 1].likes;
    }
    else {
        btn.classList.remove('like-button--liked');
        removeItem(likeList, postID);
        newLike = --posts[postID - 1].likes;
    }
    
    post.querySelector('.js-likes-counter').innerHTML = newLike;
    console.log(likeList);
}

//? Rimuove l'elemento dall'array
function removeItem(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) arr.splice(index, 1);
}

//? restituisce la differenza in mesi tra la data e oggi
function monthDiff(date) {
    date = new Date(date);
    const today = new Date();
    let months;
    months = (today.getFullYear() - date.getFullYear()) * 12;
    months -= date.getMonth();
    months += today.getMonth();
    return months <= 0 ? 0 : months;
}

//? restituisce la differenza di tempo in mesi/anni
function getTimeAgo(date){
    const mesi = monthDiff(date);
    if (mesi < 12){
        return mesi + " months ago";
    }else if(parseInt((mesi / 12)) === 1){
        return parseInt((mesi / 12)) + " year ago";
    }else{
        return parseInt((mesi / 12)) + " years ago";
    }
}