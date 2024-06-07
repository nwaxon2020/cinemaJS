const heroImg = document.querySelector(".hero-img");
const moviesCards = document.querySelector(".movies-cards");
const errorDisplay = document.querySelector(".errorPg");
const info = document.querySelector(".hero-content");


const urlMovies ="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const optionsMovies = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTEyMTRiN2E5NGM3OWU0ZjBmOTQzNDZjOGRiOGI3MCIsInN1YiI6IjY2NWIzZDc0ODZjYTcwMDkyYTU5MjRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Kq5GT-8bg1R9y4UoYwgayoZw9l0OlYsC99Z74iBvGtI'
    }
  };

  async function movieData(){

   try {

        const req = await fetch(urlMovies, optionsMovies);
        if(!req.ok){
           console.log("error connecting");
        }

        const response = await req.json();
        console.log(response);
        imgData(response);


   } catch (error) {
        console.log(error);
        errorDisplay.style.display = "block";
        info.style.display = "none";
   }

  }
  
  movieData();

function imgData(data){

    const imgDt = data.results;

    heroImg.src =  `https://image.tmdb.org/t/p/w500/${imgDt[0].poster_path}`;

    info.innerHTML= ` <h1>${imgDt[0].original_title}</h1>
        <p>${imgDt[0].overview}</p>
        <div class="info">
            <h6>relase date: <span style="color: goldenrod;">${imgDt[0].release_date}</span> </h6>
            <h6>ratings: <span style="color: goldenrod;">${imgDt[0].vote_average}</span> </h6>
            <h6>genre: <span style="color: goldenrod;">${imgDt[0].genre_ids}</span></h6>
        </div>`


    for (let img of imgDt){

        const creatImg = document.createElement("img");
        creatImg.className = "card-img";
        creatImg.src = `https://image.tmdb.org/t/p/w500/${img.poster_path}`;

        moviesCards.appendChild(creatImg);
    }
   
}

// add click event to all image cards to change hero image ======
const cardImage = document.querySelectorAll(".card-img");
cardImage.forEach((img) => {
    
    img.addEventListener("click", ()=>{

        heroImg.src = img.src;
    })
});
