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
        "created": "2021-06-25"
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
        "created": "2021-05-15"
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
        "created": "2021-03-05"
    }
];
//? inverte il formato della data
const container = document.querySelector('#container');
const changeDateFormat = (data) => data.split('-').reverse().join('-');

const postsList = [];

initPosts();

//? stampa nel DOM i post 
function initPosts(){
    posts.forEach(post => {
        const myPost = createPost(post);
        container.appendChild(myPost);
        postsList.push(myPost);

    /*  container.innerHTML += createPost(post);
        postsList.push(container.lastElementChild); */
    /*    container.lastElementChild.querySelector('.likes__cta').addEventListener('click', ()=>{
            console.log("data");
        }); */
    });
    console.log(postsList);
}

//? creazione del post in HTML partendo dai dati dell'oggetto
function createPost(object){
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
                        <div class="post-meta__time">${changeDateFormat(object.created)}</div>
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
                        Piace a <b id="like-counter-1" class="js-likes-counter">${object.likes}</b> persone
                    </div>
                </div> 
            </div>            
    `;

    //? Listener button
    post.querySelector('.like-button').addEventListener('click', () => likeCliked(post));

    return post;
}

//? Controlla l'esistenza della foto profilo
function setProfilePic(object){
    if(object.author.image !== null)
        return `<img class="profile-pic" src="${object.author.image}" alt="${object.author.name}">`;
    
    else 
        return `<div class="profile-pic monogram">
        <span class="mono">${getMonogram(object.author.name)}</span>
        </div>`;
}

//? Restituisce le iniziali dell'autore
function getMonogram(name){
    let mono = name[0];
    for(let i=0; i<name.length; i++){
        if(name[i] === " ")
            mono += name[i+1];
    }
    return mono;
}

function likeCliked(post){

    const btn = post.querySelector('.like-button');
    
    if(!btn.classList.contains('like-button--liked'))
        btn.classList.add('like-button--liked');
    else
        btn.classList.remove('like-button--liked');

}
